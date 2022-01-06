<template>
  <div class="profilePage">
    <div class="profilePage__container" v-if="loaded">
      <b-col cols="12" lg="4" class="p-0">
        <b-row>
          <b-col cols="12">
            <ProfileWidget :username="profile.username" />
          </b-col>
          <b-col cols="12">
            <div class="d-flex flex-column">
              <b-button class="mb-2">Edit Profile</b-button>
              <b-button class="mb-2">Change password</b-button>
              <b-button class="mb-2">Logout</b-button>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" lg="8">
        <b-row class="d-flex justify-content-end">
          <b-col cols="12" class="p-0 pr-lg-3 pl-lg-3">
            <EntitySwitcher @changed="setEntity" />
          </b-col>
          <b-col cols="12" lg="12" class="p-0 pr-lg-3 pl-lg-3">
            <EntitiesClaimed :entity="entity" />
          </b-col>
          <b-col cols="12" lg="12" class="p-0 pr-lg-3 pl-lg-3">
            <EntitiesFavorites />
          </b-col>
          <b-col cols="12" class="p-0 pr-lg-3 pl-lg-3">
            <EntitiesComments />
          </b-col>
        </b-row>
      </b-col>
    </div>
  </div>
</template>
<script>
import ProfileWidget from '@/components/profile/ProfileWidget'
import EntitySwitcher from '@/components/profile/EntitySwitcher';
import EntitiesFavorites from "../components/profile/EntitiesFavorites";
import EntitiesClaimed from "../components/profile/EntitiesClaimed";
import EntitiesComments from '../components/profile/EntitiesComments'

export default {
  components: {
    EntitiesClaimed,
    EntitiesFavorites,
    ProfileWidget,
    EntitiesComments,
    EntitySwitcher
  },

  data() {
    return {
      profile: {},
      entity: 1,
      loaded: false
    }
  },

  mounted() {
    this.fetchProfile()
  },

  methods: {

    setEntity(e) {
      this.entity = e;
    },

    fetchProfile() {
      this.loaded = false;
      this.$api.profile.fetch().then(response => {
        this.profile = response.data;
        this.loaded = true;
      })
    }
  }
}
</script>
<style lang="scss">
.profilePage {
  padding: 0 20px;

  @media screen and (min-width: 1024px) {
    padding: 0 150px;
  }

  .profilePage__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    //padding: 20px;
    width: 100%;
    height: 80vh;
  }
}
</style>