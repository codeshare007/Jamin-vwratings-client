<template>
  <div class="profilePage">
    <b-row>
      <b-col cols="12" lg="8">
        <div class="profileContainer">
          <h3>Claim Avi Name</h3>

          <p>Simply add a player and/or party name and don't let the timer run out.</p>

          <div v-if="!loading">
		Player
            <Claim :items="claimed_avis" entity="avi" entities="avis"/>
			<hr>
		Party
            <Claim :items="claimed_parties" entity="party" entities="parties"/>
          </div>

        </div>
      </b-col>
      <b-col cols="12" lg="4">
        <div class="profileContainer">
          <div class="d-flex justify-content-between align-items-center">

          </div>
        </div>
      </b-col>
      <b-col cols="12">
        <transition name="fade">
          <div class="profileContainer" v-if="!loading">
            <h4 class="ml-4 mb-4 mt-3">Your last 5 comments</h4>
            <CommentItem v-for="(comment, key) in comments" :key="key" :comment="comment"/>
          </div>
        </transition>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import CommentItem from "../components/entities/entity/comments/CommentItem";
import {mapActions, mapGetters} from "vuex";
import Claim from "../components/Claim";

const {required} = require('vuelidate/lib/validators');

export default {
  components: {Claim, CommentItem},
  data() {
    return {
      timerCount: [],
      comments: [],
      loading: true,
      claimed_avis: [],
      claimed_parties: [],
      errors: [],
      aviName: null,
      partyName: null,
      profile: {
        username: null
      },
      countdown: 10
    }
  },


  filters: {
    role(data) {
      const roles = {1: 'Admin', 2: 'User'};
      return roles[data]
    },
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
    this.profile = this.getProfile();
    this.fetchClaimed();
    this.fetchComments();
  },

  methods: {
    ...mapActions({
      logout: 'auth/LOGOUT'
    }),
    ...mapGetters({
      getProfile: 'auth/profile'
    }),
    emitLogout() {
      this.logout().then(() => {
        this.$router.push({name: 'auth.signin'})
      })
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

.table thead th {
    display: none;
}

.btn:not(:disabled):not(.disabled) {
    float: right;
}

.table td, .table th {
    width: 33%;
}

.badge {
    display: none;
}
.commentItem__content {
	min-height: 1px;
    background: #2083281a;
    font-size: 14px;
	padding: 3px;
}
hr {
    border-top: 1px solid #26cd5b;
}
</style>