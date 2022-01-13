<template>
  <div class="statisticsPage">
    <div>
      <p>Total Players 13123</p>
      <p>Negative comments 1201</p>
      <p>Positive comments 1230</p>
      <p>number of views 1020</p>
      <p>number of watchers 10231</p>
      <p></p>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {
      data: {}
    }
  },

  mounted() {
    this.fetchStatistics()
  },

  methods: {
    fetchStatistics() {
      this.$api.profile.statistics().then(response => {
        this.data = response.data.data;
      })
    }
  }
}
</script>
<style lang="scss">
.statisticsPage {
  background: #29495ebf;
  border: 1px solid #18786f;
  padding: 40px 30px;
  margin: 20px 20px 40px;

  @media screen and (min-width: 1024px) {
    margin: 0 150px 40px;
  }
}
</style>