<template>
  <div class="entityInfo">
	<b-row> 
		<div><b-button class="back" @click="$router.go(-1)">Back</b-button></div>
	</b-row>
    <b-row>	
      <b-col>
        <p class="entityInfo__name">{{ item.name }}</p>
        <p class="entityInfo__claim" style="background: rgb(23 151 145);" v-if="item.claim && item.claim.user_id">
          <vue-countdown :time="currentTime()" :interval="100" v-slot="{ totalHours, minutes, seconds }">
            Claimed for：{{ totalHours + ':' +  minutes + ':' + seconds }}
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

  methods: {
    currentTime() {
      let until = moment(this.item.claim.claimed_until.until);
      let duration = moment.duration(until.diff(this.item.claim.claimed_until.now));
      return duration['_milliseconds'];
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

  @media screen and (min-width: 1024px) {
    padding: 0 40px;
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
  
  .back {
  float: left;
  }
  
	@media screen and (max-width: 600px) {
		.back {
		float: none;
		}
	}

}
</style>
