<template>
  <div class="entitiesGallery">

    <b-pagination
      class="ml-5"
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
    />

    <div v-viewer class="entitiesGallery__viewer">
      <div
        :key="key"
        class="entitiesGallery__attachment"
        v-for="(item, key) in attachments">
        <img
          v-lazy="item.path"
          :alt="item.name"
          class=""
        />
        <router-link
          class="text-white pt-2 d-block"
          :to="{ name: 'ratings.avis.view', params: { id: item.comment.avi.id } }"
        >{{ item.comment.avi.name }}</router-link>
      </div>
    </div>

    <b-pagination
      class="ml-5"
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
    />

  </div>
</template>
<script>
export default {

  data() {
    return {
      attachments: [],
      currentPage: 1,
      total: 1,
      params: {
        page: 1
      }
    }
  },

  mounted() {
    this.fetchAttachments()
  },

  methods: {
    fetchAttachments() {
      this.$api.avis.attachments(this.currentPage, this.params).then(response => {
        this.attachments = response.data.data;
        this.currentPage = response.data['current_page'];
        this.total = response.data.total;
      })
    },

    handlePageChange(value) {
      this.params.page = value;
      this.fetchAttachments()
    }
  }
}
</script>
<style lang="scss">
.entitiesGallery {
  padding-top: 40px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  margin-right: 150px;
  margin-left: 150px;
  background: #29495ebf;
  border: 1px solid #18786f;

  &__viewer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .b-pagination {
    .page-item .page-link {
      background-color: #215476bf;
      border: 1px solid #18786f;
      color: white;
    }
  }

  &__attachment {
    max-width: 110px;
    flex: 0 0 110px;
    width: 110px;
    height: 110px;
    object-fit: cover;
    margin: 10px;
    padding-bottom: 40px;

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