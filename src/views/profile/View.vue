<template>
  <transition name="fade">
  <div v-if="adBlock">
    <div class="profileView" v-if="loaded">
      <EntitySwitcher @changed="setEntity"/>
      <b-row class="m-0">
        <b-col cols="12" lg="6" class="p-0 pr-lg-3">
          <EntitiesFavorites :entity="entity" :entities="entities"/>
        </b-col>	
        <b-col cols="12" lg="6" class="p-0">
          <EntitiesClaimed :entity="entity"/>
        </b-col>
      </b-row>
      <StatisticsWidget :entities="entities" :entity="entity"/>	  
      <EntitiesComments :entity="entity" :entities="entities"/>
    </div>
	</div>
		<div v-else>
    <AdBlocker></AdBlocker>
		</div>		
  </transition>
</template>
<script>
import {detectAnyAdblocker} from "vue-adblock-detector";
import AdBlocker from '../../components/AdBlocker.vue';
import EntitySwitcher from '../../components/profile/EntitySwitcher';
import EntitiesClaimed from "../../components/profile/EntitiesClaimed";
import StatisticsWidget from "../../components/profile/StatisticsWidget";
import EntitiesComments from "../../components/profile/EntitiesComments";
import EntitiesFavorites from "../../components/profile/EntitiesFavorites";

export default {
  components: {
	AdBlocker,
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
		adBlock: true,
      loaded: false
    }
  },
    beforeMount() {
    detectAnyAdblocker().then((detected) => {
      console.log(detected);
      if(detected){
        this.adBlock = false;
      }
    });
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