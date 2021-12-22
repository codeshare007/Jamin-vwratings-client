<template>
  <div class="entitiesGallery">

    <b-button
      class="mb-4 btn-back"
      @click="$router.go(-1)">Back</b-button>

    <b-pagination
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
      :per-page="perPage"
    />

    <div v-viewer class="entitiesGallery__viewer">
      <div
        :key="key"
        class="entitiesGallery__attachment"
        v-for="(item, key) in attachments">
        <img
          v-lazy="item.path"
          :alt="item.name"
        />
        <router-link
          v-if="item.comment && item.comment[entity]"
          class="text-white pt-2 d-block"
          :to="{ name: `ratings.${method}.view`, params: { id: item.comment[entity].id } }"
        >{{ item.comment[entity].name }}
        </router-link>
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
      params: {
        per_page: 50
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
      this.$api[this.method].attachments(this.currentPage, this.params).then(response => {
        this.attachments = response.data.data;
        this.currentPage = response.data['current_page'];
        this.total = response.data.total;
        this.perPage = response.data.per_page;
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
  margin-right: 150px;
  margin-left: 150px;
  background: #29495ebf;
  border: 1px solid #18786f;
  padding: 40px 30px;
  margin-bottom: 40px;

  .btn-back {
    background: #3c786b;
    border: 1px solid #082b30;
    font-size: 12px;
  }

  &__viewer {
    display: flex;
    justify-content: start;
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
    max-width: 100px;
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 27px;
    padding-bottom: 40px;
    overflow: hidden;

    display: block;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>