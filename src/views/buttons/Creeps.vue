<template>
  <transition name="fade">
    <div class="creeps">
      <div class="blackContainer">
        <div class="timer">
          <template>
            <div class="creeplist">
              <div class="text-center">
                <h4>VW Creeps</h4>
                <p>These are the players that are voted as most disliked by their peers.</p>

                <b-row class="d-flex justify-content-center">
                  <b-col cols="6">
                    <router-link class="d-block" v-for="(item, i) in this.items" :key="i"
                      :to="redirectToItem(item.avi_id)" v-html="item.avi_name" />
                  </b-col>
                </b-row>
                <div v-if="items.length === 0">
                  <p class="text-center">There aren't any creeps yet.</p>
                </div>
                <div v-if="loading" class="d-flex justify-content-center mt-3 align-items-center"
                  style="min-height: inherit;">
                  <b-spinner />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      error: null,
      loading: true,
      items: [],
      currentPage: 1,
      params: {
        per_page: 20
      }
    };
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      this.$api.creeps.fetch(this.currentPage, this.params).then(response => {
        this.items = response.data.data;
        this.loading = false;
      })
    },

    redirectToItem(id) {
      const routeName = 'ratings.avis.view';
      return { name: routeName, params: { id: id } }
    },
  }
};
</script>
<style lang="scss">
.creeps {

  .col-6 {
    max-width: fit-content;
  }

    .d-block {
      font-size: 24px;
      color: #ff0707;
    }

  .blackContainer {
    padding-top: 0;
  }
}
</style>