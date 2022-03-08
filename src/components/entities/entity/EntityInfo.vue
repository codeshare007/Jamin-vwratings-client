<template>
  <div class="entityInfo">
<b-modal
        ref="statsModal"
        ok-title="Add"
        size="lg"
        ok-variant="dark"
        hide-footer
        modal-class="entitiesList__modal"
        title="Statistics">
		<EntityStatistics v-if="loggedIn" :data="item.statistics" />
      </b-modal>

      <b-modal
        ref="notRegistered"
        ok-only
        ok-title="Close"
        modal-class="entitiesList__modal"
        ok-variant="secondary"
        title="No no no !!!">
        <div>You must log in first.</div>
      </b-modal>

      <b-modal
        ref="limitedModal"
        ok-only
        ok-title="Close"
        modal-class="entitiesList__modal"
        ok-variant="secondary"
        title="No no no !!!">
        <div>You are temporarily banned</div>
      </b-modal>  
    <b-row class="justify-content-between">
      <div>
        <b-button class="back" @click="$router.go(-1)">Back</b-button>
      </div>
      <div>
<button class="entitiesList__button mr-2" @click="showCreateDialog" style="font-size: 17px; background: #3c786b; color: white;">Stats</button>	  
        <b-button v-if="loggedIn" @click="$emit('toggle-favorite')">
          <b-icon-heart-fill v-if="item['is_favorite'] === true" />
          <b-icon-heart v-if="!item['is_favorite']" />
        </b-button>
      </div>
    </b-row>

    <b-row>
      <b-col>
        <p class="entityInfo__name">{{ item.name }}</p>
        <p class="entityInfo__claim pr-2 pl-2" style="background: rgb(23 151 145);"
           v-if="item.claim && item.claim.user_id">
          <vue-countdown :time="currentTime()" :interval="100" v-slot="{ totalHours, minutes, seconds }">
            Claimed for：{{ totalHours + ':' + minutes + ':' + seconds }}
          </vue-countdown>
        </p>
      </b-col>
    </b-row>
    <div class="entityInfo__rating">
      <star-rating
        :max-rating="12"
        :increment="0.5"
        :read-only="true"
        :rating="item.average_rating"
      />
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import EntityStatistics from "./EntityStatistics";

export default {

  props: {
    screen: String,
    item: {}
  },

  data() {
    return {
      timeleft: '00:00:00'
    }
  },

  components: {
    EntityStatistics,
  },
  
  computed: {
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    }
  },

  methods: {
    currentTime() {
      let until = moment(this.item.claim.claimed_until.until);
      let duration = moment.duration(until.diff(this.item.claim.claimed_until.now));
      return duration['_milliseconds'];
    },
		closeCreateForm() {
      this.createError = null;
      this.form.name = null;
      this.$refs['statsModal'].hide();
    },
    showCreateDialog() {
      let modalName = !this.loggedIn ?
        'notRegistered' :
        (this.isLimited ? 'limitedModal' : 'statsModal');

      if (modalName) this.$refs[modalName].show();
    }	
  }
}
</script>
<style lang="scss">
.entityInfo {
  text-align: center;
  font-family: 'Futura PT', sans-serif;
  font-size: 24px;

  p {
    margin-bottom: 0;
  }

  &__rating {
    display: flex;
    width: 100%;
    justify-content: center;
    justify-items: center;
  }

  .vue-star-rating-star {
    width: 20px;

    @media screen and (min-width: 1024px) {
      width: 30px;
    }
  }

  &__claim {
    font-size: 18px;
    width: fit-content;
    margin: auto;
  }

  &__name {
    font-size: 30px;
    color: #97d39b;
  }
  
  &__buttons {
    padding-bottom: 30px;
  }  

  .back {
    float: left;
  }
  
  @media screen and (min-width: 1024px) {
    &__buttons {
      padding: 20px;
    }
  }
  @media screen and (max-width: 600px) {
    .back {
      float: none;
    }
  }

}
</style>
