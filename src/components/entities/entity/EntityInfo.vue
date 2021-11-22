<template>
  <div class="entityInfo">
    <b-row class="justify-content-between">
      <b-col cols="4">
        <b-button class="back float-left mt-2" :to="{ name: screen }">Back</b-button>
      </b-col>
      <b-col cols="4">
        <p class="entityInfo__name">{{ item.name }}</p>
        <p class="entityInfo__claim" v-if="item.claim && item.claim.user_id">
          Claimed Until: {{ item.claim.claimed_until | countdown }}
        </p>
      </b-col>
      <b-col cols="4">

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
    <hr>
  </div>
</template>
<script>
export default {
  props: {
    screen: String,
    item: {}
  },

  filters: {
    countdown(date) {
      let t = Date.parse(new Date(date)) - Date.parse(new Date());
      if (t >= 0) {
        let left;
        left = Math.floor(t / (1000 * 60 * 60 * 24)) + ' d ';
        left += Math.floor(t / (1000 * 60 * 60) % 24) + ' h ';
        left += Math.floor(t / 1000 / 60 % 60) + ' m ';
        left += Math.floor(t / 1000 % 60) + ' s ';
        return left;
      } else {
        return 0;
      }
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
    margin-top: 13px;
    font-size: 18px;
  }

  &__name {
    font-size: 30px;
    color: #23e116;
  }

}
</style>
