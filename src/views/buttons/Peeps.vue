<template>
  <transition name="fade">
    <div class="peeps">
      <div class="blackContainer">
		<b-button
		class="btn-back"
		@click="$router.go(-1)"
		v-html="`Back`"
		/>
        <div class="timer">
          <template>            
            <div class="peeplist">
              <div class="text-center">
                <h4>VW Peeps</h4>
				
				<b-row class="d-flex justify-content-center">
                  <b-col cols="6">
                    Recently voted <router-link class="d-block recent" v-for="(item, i) in this.recentItems.slice(0, 3)" :key="i"
                      :to="redirectToItem(item.avi_id)" v-html="item.avi_name" />
                  </b-col>
                </b-row>
                <div v-if="items.length === 0">
                  <p style="color: red;" class="text-center">There aren't any newly voted peeps yet.</p>
                </div>
                <div v-if="loading" class="d-flex justify-content-center mt-3 align-items-center"
                  style="min-height: inherit;">
                  <b-spinner />
                </div>				
                <p>These are the players that are voted as most liked by their peers.<br /> vwRatings is giving each new peep a little gift as a thanks for being cool beans.<br /> Maybe you should send them a gift also :)</p>

                <b-row class="d-flex justify-content-center">
                  <b-col cols="6">
                    <router-link class="d-block" v-for="(item, i) in this.items" :key="i"
                      :to="redirectToItem(item.avi_id)" v-html="item.avi_name" />
                  </b-col>
                </b-row>
                <div v-if="items.length === 0">
                  <p style="color: red;" class="text-center">There aren't any peeps yet.</p>
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
      recentItems: [],
      currentPage: 1,
      params: {
        per_page: 99999
      }
    };
  },
  watch: {
    items: {
      handler(items) {
        console.log(items);
        this.recentItems = [...items].sort((a, b) => (a.id > b.id ? -1 : (a.id < b.id ? 1 : 0)));
      },
      deep: true      
    }
  
  },
  mounted() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      this.$api.peeps.fetch(this.currentPage, this.params).then(response => {
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
.peeps {

.col-6 {
  max-width: fit-content;
}

    .d-block {
      font-size: 24px;
      color: #07ff5f;
    }

.blackContainer {
  padding-top: 0;
}
  .btn-back {
    background: #3c786b;
    border: 1px solid #082b30;
    font-size: 12px;
  }  
}

</style>