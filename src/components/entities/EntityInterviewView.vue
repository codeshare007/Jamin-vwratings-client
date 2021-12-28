<template>
  <div class="entityInterviewView">
    <div class="profileContainer">

      <b-button
        class="mb-4 btn-back"
        @click="$router.go(-1)"
      >Back</b-button>

      <div v-html="interview.content"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
    entities: String
  },

  data() {
    return {
      interview: {}
    }
  },

  mounted() {
    this.fetchInterview()
  },

  methods: {
    fetchInterview() {
      this.$api[this.entities].getInterview(this.id).then(response => {
        this.interview = response.data;
      })
    }
  }
}
</script>
<style lang="scss">
.entityInterviewView {

  @media screen and (min-width: 1024px) {
    padding: 0 150px;
  }

  .profileContainer {
    background: rgb(41 73 94 / 75%);
    width: 100%;
    height: calc(100% - 20px);
    padding: 20px 25px;
    min-height: 250px;
    margin-bottom: 20px;
    border: 1px solid #18786f;
  }

  .btn-back {
    background: #3c786b;
    border: 1px solid #082b30;
    font-size: 12px;
  }
}
</style>