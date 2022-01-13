<template>
  <div class="entitiesComments">
    <span>
      <font-awesome-icon icon="comment" size="sm" class="mr-1"/>
      Your last 5 comments to players pages
    </span>
    <div v-if="Object.keys(comments).length">
      <div v-for="(item, key) in comments" :key="key">
        <router-link
          class="entitiesComments__link ml-1 mt-1 d-block"
          :to="{name: `ratings.${entities}.view`, params: {id: item[entity].id }}"
          v-if="item[entity]"
          v-html="item[entity].name"
        />
        <div class="entitiesComments__item mb-3">
          <div v-html="item.content"></div>
        </div>
      </div>
    </div>

    <div class="mt-2" v-else>You have not made any posts yet</div>
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
      comments: []
    }
  },

  watch: {
    entity() {
      this.fetchComments()
    }
  },

  mounted() {
    this.fetchComments()
  },

  methods: {
    fetchComments() {
      this.loading = true;
      this.$api[this.entities].comments().then(response => {
        this.comments = response.data;
        this.loading = false;
      })
    },
  }
}
</script>
<style lang="scss">
.entitiesComments {
  background: #157272;
  min-height: 100px;
  border-radius: 7px;
  padding: 15px;
  width: 100%;
  margin-bottom: 20px;

  &__item {
    background: #133347;
    padding: 10px;
    border-radius: 7px;
    min-height: 45px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: pre-line;
  }

  &__link {
    color: #24efa4;
  }
}
</style>