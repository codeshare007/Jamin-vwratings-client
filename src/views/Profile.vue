<template>
  <div class="profilePage">
    <b-row>
      <b-col cols="12" lg="8">
        <div class="profileContainer">
          <h3>Claim Player and/or Party</h3>

          <p>Simply add a player and/or party name and don't let the timer run out.</p>

          <div v-if="!loading">
            <Claim :items="claimed_avis" entity="avi" entities="avis" placeholder="Player" class="claimDelimiter"/>
            <Claim :items="claimed_parties" entity="party" entities="parties" placeholder="Party"/>
          </div>
        </div>
      </b-col>
      <b-col cols="12" lg="4">
        <div class="profileContainer">
          <div class="d-flex flex-column">
            <h4>Hi, {{ profile.username }}</h4>
            <p class="m-0">There will be more added to this page.</p>
            <p class="m-0">Browse around and let us know if you find any bugs.</p>
          </div>
        </div>
      </b-col>
      <b-col cols="12">
        <b-row>
          <b-col cols="6">
            <EntitiesFavorites placeholder="Players" @deleted="dispatchProfile()" :profile="profile" entities="avis" entity="avi"/>
          </b-col>
          <b-col cols="6">
            <EntitiesFavorites placeholder="Parties" @deleted="dispatchProfile()" :profile="profile" entities="parties" entity="party"/>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12">
        <transition name="fade">
          <div class="profileContainer" v-if="!loading">
            <h4 class="ml-4 mb-4 mt-3">Your last 5 comments</h4>
            <div v-for="(comment, key) in comments" :key="key">
              <router-link
                class="ml-4 commentItem__commentName"
                v-html="comment.avi.name"
                :to="{ name: 'ratings.avis.view', params: {id: comment.avi.id }}"
              >
              </router-link>
              <CommentItem :comment="comment" />
            </div>
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
import EntitiesFavorites from "../components/EntitiesFavorites";

const {required} = require('vuelidate/lib/validators');

export default {
  components: {EntitiesFavorites, Claim, CommentItem},
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

  mounted() {
    this.loading = true;
    this.fetchProfile().then(() => {
      this.profile = this.getProfile();
      this.fetchClaimed();
      this.fetchComments();
      this.loading = false;
    })
  },

  methods: {
    ...mapActions({
      logout: 'auth/LOGOUT',
      fetchProfile: 'profile/FETCH_PROFILE'
    }),

    ...mapGetters({
      getProfile: 'profile/profile'
    }),

    dispatchProfile() {
      this.loading = true;
      this.fetchProfile().then(() => {
        this.profile = this.getProfile();
        this.loading = false;
      });
    },

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
    background: rgb(41 73 94 / 75%);
    width: 100%;
    height: calc(100% - 20px);
    padding: 20px 25px;
    min-height: 250px;
    margin-bottom: 20px;
    border: 1px solid #18786f;
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

  .table td, .table th {
    width: 33%;
  }

  .badge {
    display: none;
  }

  .commentItem__content {
    min-height: 1px;
    background: #2083281a;
    font-size: 20px;
    padding: 3px;
    border-bottom: 1px solid #274a30;
  }

  .commentItem__commentName {
    color: #2fcf7e;
  }

  .claimDelimiter {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #26cd5b;
  }
}
</style>