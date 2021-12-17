<template>
  <div class="app" :style="dynamicBackground()">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <router-view />

    <b-modal ref="announcement" title="Announcement" ok-only ok-title="Close" ok-variant="secondary">
      <div v-html="html"></div>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from "vuex";
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      isLoading: false,
      html: null,
      fullPage: true
    }
  },

  watch: {
    '$route'() {
      axios.post('/api/v1/tracker', {
        last_page: this.$route.path,
        route: this.$route.name
      }).then(response => {
        if (response.data['start_promo']) {
          window.location.href = '/promo';
        }

        if (response.data['show_announcement']) {
          this.html = response.data['modal_content'];
          this.$refs['announcement'].show();
        }
      }).catch(error => {
        if (error) {
          window.location.href = '/promo'
        }
      });
    }
  },

  computed: {
    ...mapState('auth', {
      loggedIn: state => state.loggedIn,
    }),
  },

  methods: {

    dynamicBackground() {
      if (this.$route.name === 'ratings.parties.view' || this.$route.name === 'ratings.parties.list') {
        return { backgroundImage: 'url(/images/party.jpg)' }
      } else {
        return { backgroundImage: 'url(/images/background.jpg)' }
      }
    },

    preloader() {
      this.preloader();
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app {
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
