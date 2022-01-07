<template>
  <div class="entitiesFavorites">
    <span class="entitiesFavorites__title d-flex align-items-center justify-content-between">
      <b-icon-heart-fill size="sm" class="mr-1" />
      Watched {{ labels[entity] }}
	
      <b-button variant="transparent" size="sm" id="tooltip-target-2">
        <b-icon-info-circle variant="light"/>
      </b-button>
    </span>

    <b-tooltip target="tooltip-target-2" triggers="hover">
      Click the heart at the top of the {{ entityName }} page to save it to this list for quick access. 
    </b-tooltip>	

    <div v-if="Object.keys(items).length">
      <div v-for="(item, key) in items" :key="key" class="entitiesFavorites__item">
        <div v-if="item[entity]">{{ item[entity].name }}</div>
        <b-icon-trash @click="openDeleteModal(item[entity].id)"/>
      </div>
    </div>

    <div v-else>
      Not watching any names yet.
    </div>

    <b-modal
      ref="deleteModal"
      title="Delete from favorite"
      ok-title="Delete"
      ok-variant="danger"
      @ok="deleteItem()">
      Are you sure that you want to delete this {{ entity }} from your favorites ?
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    entity: String,
    entities: String
  },

  data() {
    return {
      items: [],
      labels: {
        avi: 'players',
        party: 'parties'
      },
      deletableId: null,
      loading: false,
    }
  },

  watch: {
    entity() {
      this.fetchFavorites();
    }
  },

  mounted() {
    this.fetchFavorites();
  },

  methods: {
    openDeleteModal(id) {
      this.deletableId = id;
      this.$refs["deleteModal"].show();
    },

    deleteItem() {
      this.$api[this.entities].removeFavorite(this.deletableId).then(() => {
        this.deletableId = null;
        this.fetchFavorites();
      })
    },

    fetchFavorites() {
      this.loading = true;
      this.$api[this.entities].favorites().then(response => {
        this.items = response.data;
        this.loading = false;
      })
    },
  }
}
</script>
<style lang="scss">
.entitiesFavorites {
  background: #157272;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  margin-bottom: 10px;
  overflow-y: auto;
  max-height: 245px;

  @media screen and (min-width: 1024px) {
    margin-bottom: 20px;
    min-height: calc(100% - 21px);
  }

  &__title {
    margin-bottom: 13px;
    display: block;
  }

  &__item {
    background: #133347;
    padding: 4px 10px;
    border-radius: 7px;
    margin-bottom: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>