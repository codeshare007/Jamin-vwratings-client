<template>
  <div class="entitiesGallery">

    <div class="ml-5">
      <b-pagination />
    </div>

    <viewer :images="attachments" class="entitiesGallery__viewer">
      <img
        :src="item.path"
        :alt="item.name"
        v-for="(item, key) in attachments"
        class="entitiesGallery__attachment"
        :key="key"
      />
    </viewer>
  </div>
</template>
<script>
export default {

  data() {
    return {
      attachments: []
    }
  },

  mounted() {
    this.fetchAttachments()
  },

  methods: {
    fetchAttachments() {
      this.$api.avis.attachments().then(response => {
        this.attachments = response.data.data;
      })
    },
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

  &__attachment {
    max-width: 110px;
    flex: 0 0 110px;
    width: 110px;
    height: 110px;
    object-fit: cover;
    margin: 10px;
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