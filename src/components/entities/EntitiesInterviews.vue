<template>
  <div class="entitiesInterviews">
    <div class="profileContainer">

      <b-button
        class="mb-4 mr-4 btn-back"
        @click="$router.go(-1)">Back</b-button> <span style="color: red;">Interviews will be cleaned up to reflect our new name. Pics aren't working yet</span>

      <div class="d-flex flex-wrap">
        <b-button
          variant="outline-light"
          :to="{ name: `ratings.${entities}.interview.view`,
           params: {id: item[entity].id }}"
          class="entityItem mr-3 mb-3"
          v-for="(item, key) in interviews" :key="key">
          {{ item[entity].name }}
        </b-button>
      </div>
    </div>
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
      interviews: []
    }
  },

  mounted() {
    this.fetchInterviews()
  },

  methods: {
    fetchInterviews() {
      this.$api[this.entities].fetchInterviews().then(response => {
        this.interviews = response.data;
      })
    }
  }
}
</script>
<style lang="scss">
.entitiesInterviews {

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

  .entityItem {
    font-size: 20px;
  }
}
</style>