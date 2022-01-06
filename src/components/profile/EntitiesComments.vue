<template>
  <div class="entitiesComments">
    <span>Your last comments to players pages</span>
    <div v-for="(item, key) in comments" :key="key" class="entitiesComments__item">
      <div v-html="item.content"></div>
    </div>
  </div>
</template>
<script>
export default {

  props: {
    entity: Number,
  },

  data() {
    return {
      comments: []
    }
  },

  mounted() {
    this.fetchComments()
  },

  methods: {
    fetchComments() {
      this.loading = true;
      this.$api.profile.comments().then(response => {
        this.comments = response.data;
        this.loading = false;
      })
    },
  }
}
</script>
<style lang="scss">
.entitiesComments {
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
    min-height: 45px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>