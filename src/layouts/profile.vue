<template>
  <div class="profilePage">
    <b-row>
      <b-col cols="12" lg="4" class="p-0">
        <ProfileWidget />
      </b-col>
      <b-col cols="12" lg="8" class="p-0 pl-lg-3">
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import ProfileWidget from "../components/profile/ProfileWidget";
export default {
  components: {
    ProfileWidget
  }
}
</script>
<style lang="scss">
  .profilePage {
    padding: 0 25px;

    @media screen and (min-width: 1200px) {
      margin: 0 150px;
    }
  }
</style>