<template>
  <div class="entitiesGallery">

    <b-button
      class="mb-4 btn-back"
      @click="$router.go(-1)"
      v-html="`Back`"
    />

    <b-pagination
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
      :per-page="perPage"
    />

    <div class="entitiesGallery__wrapper">
      <div v-viewer class="entitiesGallery__viewer" v-if="!loading">
        <div
          :key="key"
          class="entitiesGallery__attachment"
          v-for="(item, key) in attachments">
          <div>
            <img
              v-lazy="item.path"
              :alt="item.comment && item.comment[entity] ? item.comment[entity].name : ''"
            />
            <b-skeleton-img />
          </div>
          <router-link
            v-if="item.comment && item.comment[entity]"
            class="text-white pt-2 d-block"
            :to="{ name: `ratings.${method}.view`, params: { id: item.comment[entity].id } }"
            v-html="item.comment[entity].name"
          />
        </div>
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
      :per-page="perPage"
      class="m-0"
    />

  </div>
</template>
<script>
export default {
  props: {
    method: String,
    entity: String
  },

  data() {
    return {
      attachments: [],
      perPage: 1,
      total: 1,
      currentPage: 1,
      loading: false,
      params: {
        per_page: 48
      }
    }
  },

  watch: {
    currentPage() {
     // this.$router.push({ query: { page: value  }})
    }
  },

  mounted() {
    if (this.$route.query.page) {
      this.currentPage = this.$route.query.page;
    }

    this.fetchAttachments();
  },

  methods: {
    fetchAttachments() {
      this.loading = true;
      this.$api[this.method].attachments(this.currentPage, this.params).then(response => {
        this.attachments = response.data.data;
        this.currentPage = response.data['current_page'];
        this.total = response.data.total;
        this.perPage = response.data.per_page;
        this.loading = false;
      })
    },

    handlePageChange(value) {
      this.currentPage = value;
      this.fetchAttachments()
    }
  }
}
</script>
<style lang="scss">
.entitiesGallery {
  background: #29495ebf;
  border: 1px solid #18786f;
  padding: 40px 30px;
  margin: 20px 20px 40px;

  @media screen and (min-width: 1024px) {
    margin: 0 150px 40px;
  }

  &__wrapper {
    min-height: 500px;
  }

  .btn-back {
    background: #3c786b;
    border: 1px solid #082b30;
    font-size: 12px;
  }

  &__viewer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .b-pagination {
    .page-item .page-link {
      background-color: #215476bf;
      border: 1px solid #18786f;
      color: white;
    }

    .page-item.active .page-link {
      background-color: #4f94c3bf;
    }
  }

  &__attachment {
    width: 120px;
    height: auto;
    object-fit: cover;
    overflow: hidden;
    display: block;
    padding-bottom: 20px;
    cursor: pointer;
    position: relative;

    @media screen and (min-width: 1024px) {
      width: 160px;
      height: 220px;
      padding-bottom: 60px;
    }

    .b-aspect {
      width: 100%;
      height: 100px;
      top: 0;
      z-index: 0;
      position: absolute;

      @media screen and (min-width: 1024px) {
        height: 160px;
      }
    }

    img {
      width: 100%;
      position: relative;
      z-index: 1;
      height: 120px;
      object-fit: cover;
      @media screen and (min-width: 1024px) {
        height: 160px;
      }
    }
  }
}
</style>