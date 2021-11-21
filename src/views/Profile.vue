<template>
  <div class="profilePage">
    <b-row>
      <b-col cols="12" lg="8">
        <div class="profileContainer">
          <h2>Claim Avi</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>

          <div v-if="!loading" class="mb-3">
            <b-form v-if="Object.keys(claimed_avis).length === 0">
              <b-row class="justify-content-start mt-4">
                <b-col cols="6">
                  <b-form-input
                    placeholder="name of avi"
                    class="bg-dark text-white border-dark"
                    :state="validateState('aviName')"
                    v-model="$v.aviName.$model"
                  />
                </b-col>

                <b-col cols="3" class="d-flex">
                  <b-button variant="success" type="submit" @click="e => claim(e,'avi')">Submit</b-button>
                </b-col>

                <span
                  class="ml-3 mt-3 d-block text-danger"
                  v-for="(item, key) in errors"
                  :key="key"
                >{{ item }}</span>
              </b-row>
            </b-form>

            <b-table v-if="Object.keys(claimed_avis).length !== 0" table-variant="dark" :items="claimed_avis"
                     :fields="[{key: 'avi.name', label: 'name'}, {key: 'claimed_until', label: 'claimed until'}, 'actions']">
              <template #cell(claimed_until)="row">
                {{ row.item.claimed_until | countdown }}
              </template>
              <template #cell(actions)="row">
                <b-button variant="primary" @click="stayClaimed(row.item.id)">Stay Claimed</b-button>
              </template>
            </b-table>
          </div>

          <b-form v-if="Object.keys(claimed_parties).length === 0" class="mb-3">
            <b-row class="justify-content-start mt-4">
              <b-col cols="6">
                <b-form-input
                  placeholder="name of party"
                  class="bg-dark text-white border-dark"
                  :state="validateState('partyName')"
                  v-model="$v.partyName.$model"
                />
              </b-col>

              <b-col cols="3" class="d-flex">
                <b-button variant="success" type="submit" @click="e => claim(e, 'party')">Submit</b-button>
              </b-col>

              <span
                class="ml-3 mt-3 d-block text-danger"
                v-for="(item, key) in errors"
                :key="key"
              >{{ item }}</span>
            </b-row>
          </b-form>

          <b-table v-if="Object.keys(claimed_parties).length !== 0" table-variant="dark" :items="claimed_parties"
                   :fields="[{key: 'party.name', label: 'name'}, {key: 'claimed_until', label: 'claimed until'}, 'actions']">
            <template #cell(claimed_until)="row">
              {{ row.item.claimed_until | countdown }}
            </template>
            <template #cell(actions)="row">
              <b-button variant="primary" @click="stayClaimed(row.item.id)">Stay Claimed</b-button>
            </template>
          </b-table>

        </div>
      </b-col>
      <b-col cols="12" lg="4">
        <div class="profileContainer">
          <div class="d-flex justify-content-between align-items-center">
            <h2>{{ profile.username }}</h2>
            <b-button variant="secondary" size="sm" @click="emitLogout">Logout</b-button>
          </div>
        </div>
      </b-col>
      <b-col cols="12">
        <transition name="fade">
          <div class="profileContainer" v-if="!loading">
            <h2 class="ml-4 mb-4 mt-3">Your Comments</h2>
            <CommentItem v-for="(comment, key) in comments" :key="key" :comment="comment"/>
          </div>
        </transition>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import CommentItem from "../components/entities/entity/comments/CommentItem";
import {mapActions} from "vuex";

const {required} = require('vuelidate/lib/validators');

export default {
  components: {CommentItem},
  data() {
    return {
      comments: [],
      loading: true,
      claimed_avis: [],
      claimed_parties: [],
      errors: [],
      aviName: null,
      partyName: null,
      profile: {
        username: null
      }
    }
  },

  filters: {

    role(data) {
      const roles = {1: 'Admin', 2: 'User'};
      return roles[data]
    },

    countdown(date) {
      let t = Date.parse(new Date(date)) - Date.parse(new Date());
      if (t >= 0) {
        let left;
        left = Math.floor(t / (1000 * 60 * 60 * 24)) + ' d ';
        left += Math.floor(t / (1000 * 60 * 60) % 24) + ' h ';
        left += Math.floor(t / 1000 / 60 % 60) + ' m ';
        left += Math.floor(t / 1000 % 60) + ' s ';
        return left;
      } else {
        return 0;
      }
    }
  },

  validations: {
    partyName: {
      required(v) {
        return this.aviName.length || required(v)
      }
    },
    aviName: {
      required(v) {
        return this.partyName.length || required(v)
      }
    }
  },

  computed: {
    fetchProfile() {
      return this.$store.getters['auth/profile']
    }
  },

  mounted() {
    this.profile = this.fetchProfile;
    this.fetchClaimed();
    this.fetchComments();
  },

  methods: {

    ...mapActions({
      logout: 'auth/LOGOUT'
    }),

    emitLogout() {
      this.logout().then(() => {
        this.$router.push({name: 'auth.signin'})
      })
    },

    validateState(name) {
      const {$dirty, $error} = this.$v[name];
      return $dirty ? !$error : null;
    },

    fetchClaimed() {
      this.loading = true;
      this.$api.profile.claimed().then(response => {
        this.claimed_avis = response.data.data.avis;
        this.claimed_parties = response.data.data.parties;
        this.loading = false;
      })
    },

    fetchComments() {
      this.loading = true;
      this.$api.profile.comments().then(response => {
        this.comments = response.data;
        this.loading = false;
      })
    },

    stayClaimed() {
      this.$api.profile.stayClaimed().then(response => {
        if (response.data.status === 'success') {
          window.location = '/promo'
        }
      })
    },

    claim(e, type) {
      e.preventDefault();

      if (type === 'avi') {
        this.$v.aviName.$touch();
        if (this.$v.aviName.$error) return;
      }

      if (type === 'party') {
        this.$v.partyName.$touch();
        if (this.$v.partyName.$error) return;
      }

      let payload;

      if (type === 'avi') payload = {name: this.aviName, type: type};
      if (type === 'party') payload = {name: this.partyName, type: type};

      this.$api.profile.claim(payload).then(response => {
        if (response.data.status === 'success') {
          window.location.href = '/promo';
        }
      }).catch(error => {
        this.errors = [];
        const errors = error.response.data.errors;
        for (let i in errors) {
          let error = errors[i][0]
          this.errors.push(error)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.profilePage {

  @media screen and (min-width: 1024px) {
    padding: 0 150px;
  }

  .profileContainer {
    background: #000000b3;
    width: 100%;
    height: calc(100% - 20px);
    padding: 20px 25px;
    min-height: 250px;
    margin-bottom: 20px;
  }
}


.section1 {
  padding: 180px 30px;
  margin-bottom: 30px;
  margin-top: 30px;
}

.section2 {
  padding: 101px 30px;
}

.section3 {
  padding: 296px 30px;
  margin-bottom: 30px;
  margin-top: 30px;
}
</style>