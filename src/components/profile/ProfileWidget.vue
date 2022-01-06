<template>
  <div class="profileWidget">

    <div class="profileWidget__mainBlock">
      <h3>Hi, {{ profile.username }}</h3>
      <p>There will be more added to this page.</p>
      <p>Browse around and let us know if you find any bugs.</p>
    </div>

    <div class="profileWidget__navigation">
      <b-button class="btn-profile" :to="{ name: 'ratings.profile.view'}">Overview</b-button>
      <b-button class="btn-profile" :to="{ name: 'ratings.profile.edit' }">Change Profile</b-button>
      <b-button class="btn-profile" :to="{ name: 'ratings.profile.password' }">Change Password</b-button>
      <b-button class="btn-profile" @click="emitLogout">Logout</b-button>
    </div>

  </div>
</template>
<script>
  export default {


    computed: {
      profile() {
        return this.$store.getters['auth/profile']
      }
    },

    methods: {
      emitLogout() {

      }
    }
  }
</script>
<style lang="scss">
  .profileWidget {

    &__mainBlock {
      background: #1f5476;
      border-radius: 15px;
      padding: 18px 20px 3px;
      margin-bottom: 10px;

      @media screen and (min-width: 1024px) {
        margin-bottom: 15px;
      }
    }

    .btn-profile {
      border: 0;
      outline: 0;
      color: white;
      width: 100%;
      height: 40px;
      border-radius: 7px;
      margin-bottom: 10px;
      background: #1f5476;

      &:active,
      &:focus {
        box-shadow: unset;
        background: #1b4a68;
        outline: 0;
      }
    }

  }
</style>