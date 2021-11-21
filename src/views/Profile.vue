<template>
  <div class="profilePage">
    <b-row>
      <b-col cols="12" lg="8">
        <div class="profileContainer">
          <h2>Claim Avi</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>

          <b-form>
            <b-row class="justify-content-start mt-4">

              <b-col cols="3">
                <b-form-radio-group
                  id="btn-radios-1"
                  v-model="$v.form.type.$model"
                  :options="{avi: 'Avi', party: 'Party'}"
                  :state="validateState('type')"
                  name="radios-btn-default"
                  buttons
                />
              </b-col>

              <b-col cols="6">
                <b-form-input
                  placeholder="Name of avi or party"
                  class="bg-dark text-white border-dark"
                  :state="validateState('name')"
                  v-model="$v.form.name.$model"
                />
              </b-col>

              <b-col cols="3" class="d-flex">
                <b-button variant="success" type="submit" @click="claim">Submit</b-button>
              </b-col>

              <span
                class="ml-3 mt-3 d-block text-danger"
                v-for="(item, key) in errors"
                :key="key"
              >{{ item }}</span>
            </b-row>


            <div class="mt-3">
              <b-table v-if="claimed_avis" table-variant="dark" :items="claimed_avis" :fields="claimFields">
                <template #cell(claimed_until)="row">
                  {{ row.item.claimed_until | countdown }}
                </template>
                <template #cell(actions)="row">
                  <b-button variant="primary" @click="stayClaimed(row.item.id)">Stay Claimed</b-button>
                </template>
              </b-table>
              <b-table v-if="claimed_parties" table-variant="dark" :items="claimed_parties" :fields="claimFields">
                <template #cell(claimed_until)="row">
                  {{ row.item.claimed_until | countdown }}
                </template>
                <template #cell(actions)="row">
                  <b-button variant="primary" @click="stayClaimed(row.item.id)">Stay Claimed</b-button>
                </template>
              </b-table>
            </div>

          </b-form>
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

const {required} = require('vuelidate/lib/validators');

export default {
  components: {CommentItem},
  data() {
    return {
      comments: [],
      loading: true,
      claimed_avis: [],
      claimed_parties: [],
      claimFields: [
        {key: 'avi.name', label: 'name'},
        {key: 'claimed_until', label: 'claimed until'},
        {key: 'actions', label: 'actions'}
      ],
      errors: [],
      form: {
        name: null,
        type: 1
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
    form: {
      name: {required},
      type: {required}
    }
  },

  computed: {
    profile() {
      return this.$store.getters['auth/profile']
    }
  },

  mounted() {
    this.fetchComments();
    this.fetchClaimed();
  },

  methods: {

    emitLogout() {
      this.logout().then(() => {
        this.$router.push({name: 'auth.signin'})
      })
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    fetchClaimed() {
      this.$api.profile.claimed().then(response => {
        this.claimed_avis = response.data.data.avis;
        this.claimed_parties = response.data.data.parties;
      })
    },

    fetchComments() {
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

    claim(e) {
      e.preventDefault();

      this.$v.form.$touch();
      if (this.$v.form.$error) return;

      const payload = this.form;
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