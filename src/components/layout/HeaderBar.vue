<template>
  <b-navbar toggleable="lg" class="header-bar" variant="">
    <b-container class="">
      <b-navbar-brand :to="{ name: 'ratings.home' }">
        <img src="../../assets/images/logo.png" alt/>
      </b-navbar-brand>
      <b-navbar-toggle
        class="bg-transparent p-0"
        target="nav-mobile"
        @click="toggleMobileMenu"
      />
      <transition name="fade">
        <div id="nav-mobile" class="nav-mobile" :class="{'d-none': !isMobileMenu}">
          <div class="d-flex justify-content-between mt-2">
            <b-navbar-brand class="ml-3" :to="{ name: 'ratings.home' }">
              VW Ratings
            </b-navbar-brand>
            <b-icon-x
              @click="toggleMobileMenu"
              variant="light"
              class="mr-2"
              height="3rem"
              width="3rem"
            />
          </div>

          <div>
            <header-profile v-if="loggedIn" @closed="toggleMobileMenu()" />
          </div>

          <b-navbar-nav class="ml-auto" v-if="!loading">
            <b-nav-item @click="toggleMobileMenu()" :to="{name: 'ratings.avis.list'}">Players</b-nav-item>
            <b-nav-item @click="toggleMobileMenu()" :to="{name: 'ratings.parties.list'}">Parties</b-nav-item>
            <b-nav-item @click="toggleMobileMenu()" :to="{name: 'ratings.buttons'}">Buttons</b-nav-item>
            <b-nav-item @click="toggleMobileMenu()" v-if="!loggedIn" :to="{name: 'auth.signin'}">Login/Join</b-nav-item>
          </b-navbar-nav>
        </div>
      </transition>
      <b-collapse id="nav-collapse" is-nav>
        <div v-if="loading" class="d-flex justify-content-end w-100">
          <b-skeleton
            class="mt-3 mr-3"
            v-for="i in 3"
            :key="i"
            animation="wave"
            height="30px"
            width="140px"
          />
        </div>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item :to="{name: 'ratings.avis.list'}">Players</b-nav-item>
          <b-nav-item :to="{name: 'ratings.parties.list'}">Parties</b-nav-item>
          <b-nav-item :to="{name: 'ratings.buttons'}">Buttons</b-nav-item>
          <b-nav-item v-if="!loggedIn" :to="{name: 'auth.signin'}">Login/Join</b-nav-item>
        </b-navbar-nav>
        <header-profile v-if="loggedIn" />
        <notifications v-if="loggedIn" />
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
import HeaderProfile from "./HeaderProfile";
import Notifications from "./Notifications";

export default {
  components: {Notifications, HeaderProfile},
  data() {
    return {
      isMobileMenu: false,
      loading: false,
    }
  },

  methods: {
    toggleMobileMenu() {
      this.isMobileMenu = !this.isMobileMenu
    }
  },

  computed: {
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
  },
}
</script>
<style lang="scss">
.header-bar {

  @media screen and (min-width: 1024px) {
    .container {
      padding: 0 150px;
    }
  }

  .navbar-brand {
    font-family: 'Futura PT', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 25px;
    color: white;

    &:focus {
      outline: 2px solid #18786f;
    }

    img {
      width: 120px;
    }

    @media screen and (min-width: 1024px) {
      img {
        width: 150px;
      }
    }

    &:focus,
    &:hover {
      color: white;
    }
  }

  @media screen and (max-width: 994px) {
    height: 54px;

    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 255' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")
    }
  }

  .nav-mobile {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    overflow: hidden;
    touch-action: none;
    height: 100%;
    background: rgb(31 31 31 / 98%);
    color: white;
    padding: 20px;

    .headerProfile {
      padding: 10px 0;
    }

    .nav-item a {
      color: white;
    }
  }

  .navbar-nav .nav-link {
    color: white;
    font-size: 24px;
    text-transform: lowercase;
    font-weight: 400;
    font-family: 'Futura PT', sans-serif;

    &:focus {
      outline: 0;
      color: #5fe134;
    }

    &.router-link-exact-active,
    &.router-link-active {
      color: #5fe134;
    }

    &:hover {
      color: white;
    }
  }

  .navbar-nav .nav-item a:not(.dropdown-toggle):not(.dropdown-item) {
    margin: 0 10px;
  }

  .nav-mobile button {
    background-color: #676767;
  }
}
</style>
