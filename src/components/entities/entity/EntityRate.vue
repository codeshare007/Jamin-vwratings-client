<template>
  <div class="entityRate">
    <p>
      <slot/>
    </p>
    <div class="entityRate__starBlock">
      <star-rating
        :max-rating="12"
        :increment="0.5"
        @rating-selected="rate"
        :rating="user_rating"
      />
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  props: {
    user_rating: {},
    placeholder: String
  },

  methods: {
    rate(value) {
      this.$emit('rated', value)
    }
  }
}
</script>
<style lang="scss">
.entityRate {
  margin-bottom: 30px;

  p {
    text-align: center;
    font-size: 18px;
    font-family: 'Futura PT', sans-serif;
    color: #848f80;
    white-space: pre-wrap;
    margin-bottom: 0;
  }

  &__starBlock {
    display: flex;
    width: 100%;
    justify-content: center;
    justify-items: center;

    .vue-star-rating-star {
      width: 20px;

      @media screen and (min-width: 1024px) {
        width: 30px;
      }
    }
  }
}
</style>
