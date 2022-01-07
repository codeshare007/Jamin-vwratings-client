<template>
  <div class="profileWidget">

    <div class="profileWidget__mainBlock">
      <h5>Hi {{ profile.username }}</h5>
      <p>Thanks for helping expose the good and the bad. Keep up the good work.</p>
    </div>

    <div class="profileWidget__navigation">
      <b-button class="btn-profile" :to="{ name: 'ratings.profile.view'}">Overview</b-button>
      <b-button class="btn-profile" :to="{ name: 'ratings.profile.edit' }">Change/Add Email</b-button>
      <b-button class="btn-profile" :to="{ name: 'ratings.profile.password' }">Change Password</b-button>
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
    }
  }
</script>
<style lang="scss">
  .profileWidget {

    &__mainBlock {
      background: #157272;
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
      background: #157272;

      &:active {
        box-shadow: unset;
        outline: 0;
      }
    }

  }
</style>