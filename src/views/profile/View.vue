<template>
  <transition name="fade">
    <div class="profileView" v-if="loaded">
      <EntitySwitcher @changed="setEntity"/>
      <StatisticsWidget :entities="entities" :entity="entity"/>
      <b-row class="m-0">
        <b-col cols="12" lg="6" class="p-0 pr-lg-3">
          <EntitiesFavorites :entity="entity" :entities="entities"/>
        </b-col>
        <b-col cols="12" lg="6" class="p-0">
          <EntitiesClaimed :entity="entity"/>
        </b-col>
      </b-row>
      <EntitiesComments :entity="entity" :entities="entities"/>
    </div>
  </transition>
</template>
<script>
import EntitySwitcher from '../../components/profile/EntitySwitcher';
import EntitiesClaimed from "../../components/profile/EntitiesClaimed";
import StatisticsWidget from "../../components/profile/StatisticsWidget";
import EntitiesComments from "../../components/profile/EntitiesComments";
import EntitiesFavorites from "../../components/profile/EntitiesFavorites";

export default {
  components: {
    EntitiesFavorites,
    EntitiesComments,
    StatisticsWidget,
    EntitySwitcher,
    EntitiesClaimed
  },

  data() {
    return {
      profile: {},
      entity: 'avi',
      entities: 'avis',
      loaded: false
    }
  },

  mounted() {
    this.fetchProfile();
  },

  methods: {

    setEntity(entity) {
      if (entity === 1) {
        this.entity = 'avi';
        this.entities = 'avis'
      }
      if (entity === 2) {
        this.entity = 'party'
        this.entities = 'parties'
      }
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