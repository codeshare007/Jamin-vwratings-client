<template>
  <div class="statisticsWidget">
    <span class="d-block mb-2">
      <font-awesome-icon icon="chart-line" size="sm" class="mr-1"/>
      Your Stats
    </span>

    <b-row class="justify-content-between m-0">
      <div class="statisticsWidget__item">
        Made {{ stats.rated }} rates
      </div>
      <div class="statisticsWidget__item">
        Made {{ stats.comments }} posts
      </div>
      <div class="statisticsWidget__item">
        Added {{ stats.added }} names
      </div>
    </b-row>
  </div>
</template>
<script>
export default {

  props: {
    entities: String,
    entity: String
  },

  data() {
    return {
      stats: {
        rated: 0,
        comments: 0,
        added: 0
      },
      loading: true
    }
  },

  watch: {
    entity() {
      this.fetchStatistics()
    }
  },

  mounted() {
    this.fetchStatistics()
  },

  methods: {
    fetchStatistics() {
      this.loading = true;
      this.$api[this.entities].stats().then(response => {
        this.stats = response.data;
        this.loading = false;
      })
    }
  }
}
</script>
<style lang="scss">
.statisticsWidget {
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 6px 16px 13px;
  background: #157272;

  @media screen and (min-width: 1024px) {
    margin-bottom: 20px;
  }

  &__item {
    max-width: 32%;
    background: #133347;
    padding: 6px 12px;
    font-size: 15px;
    border-radius: 7px;
    flex: 0 0 32%;
  }
}
</style>