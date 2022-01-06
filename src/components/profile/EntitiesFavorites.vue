<template>
  <div class="entitiesFavorites">
    <span>List of your favorite avis</span>
    <div v-for="(item, key) in items" :key="key" class="entitiesFavorites__item">
      <div>{{ item.avi.name }}</div>
      <b-button variant="outline-light" size="sm"><b-icon-trash /></b-button>
    </div>
  </div>
</template>
<script>
  export default {

    props: {
      entity: Number
    },

    watch: {
      entity(value) {
        if (value === 1) {
          this.fetchFavoriteAvis()
        } else if (value === 2) {
          this.fetchFavoritesParties()
        }
      }
    },

    data() {
      return {
        items: []
      }
    },

    mounted() {
      this.fetchFavoriteAvis();
    },

    methods: {
      fetchFavoritesParties() {
        this.$api.profile.favoriteParties().then(response => {
          this.items = response.data;
          this.loading = false;
        })
      },
      fetchFavoriteAvis() {
        this.$api.profile.favoriteAvis().then(response => {
          this.items = response.data;
          this.loading = false;
        })
      },
    }
  }
</script>
<style lang="scss">
  .entitiesFavorites {
    background: #3a6581;
    min-height: 100px;
    border-radius: 7px;
    padding: 15px;
    width: 100%;
    margin-bottom: 20px;

    &__item {
      margin-top: 10px;
      background: #4f83a5;
      padding: 10px;
      border-radius: 7px;
      margin-bottom: 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>