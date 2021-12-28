<template>
  <div class="entitiesFavorites">
    <h2>{{ entities }} favorites</h2>

    <div class="entitiesFavorites__inner" v-if="profile['favorites']">
      <div v-for="(item, key) in profile['favorites'][entities]" :key="key" class="mb-2 d-flex align-items-center">
        <div v-if="item[entity]">
          <router-link
            class="text-white cursor-pointer"
            v-html="item[entity].name"
            :to="{name: `ratings.${entities}.view`, params: {id: item[entity].id}}"
          />
          <b-icon-trash class="cursor-pointer ml-2" @click="destroy(item[entity].id)"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    entities: String,
    entity: String,
    profile: Object
  },

  data() {
    return {
      items: []
    }
  },

  methods: {
    destroy(id) {
      this.$api[this.entities].removeFavorite(id).then(response => {
        if (response.data.status === 'success') {
          this.$emit('deleted');
        }
      })
    }
  }
}
</script>
<style lang="scss">
.entitiesFavorites {
  background: rgba(41, 73, 94, 0.75);
  width: 100%;
  padding: 20px 25px;
  height: 300px;
  margin-bottom: 20px;
  border: 1px solid #18786f;
  overflow: hidden;

  .cursor-pointer {
    cursor: pointer;
  }

  &__inner {
    height: auto;
    max-height: calc(100% - 40px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>