<template>
  <div class="entitySwitcher">
    <button class="entitySwitcher__button" :class="{'active': active === 1}" @click="setEntity(1)">Players</button>
    <button class="entitySwitcher__button" :class="{'active': active === 2}" @click="setEntity(2)">Parties</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 1
      }
    },

    methods: {
      setEntity(number) {
        this.active = number;
        this.$emit('changed', number)
      }
    }
  }
</script>
<style lang="scss">
  .entitySwitcher {
    display: flex;
    margin-bottom: 10px;

    @media screen and (min-width: 1024px) {
      margin-bottom: 20px;
    }

    &__button {
      border: 0;
      outline: 0;
      color: white;
      width: 100%;
      height: 40px;
      background: #1f5476;

      &:focus {
        outline: 0;
      }

      &.active {
        border: 1px solid #f6b135;
        background: rgb(238,131,1);
        background: linear-gradient(90deg, rgba(238,131,1,1) 0%, rgba(241,146,3,1) 35%, rgba(238,131,1,1) 100%);
      }
    }
  }
</style>