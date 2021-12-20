<template>
  <div class="avisList">
    <Adsense
      class="adsense-block"
      data-ad-client="ca-pub-3655622089482340"
      data-ad-slot="3406436587"
      data-ad-format="auto"
      data-full-width-responsive="true">
    </Adsense>
    <EntitiesList entity="avi" method="avis"/>
  </div>
</template>
<script>
import EntitiesList from "@/components/entities/EntitiesList";

export default {

  components: {
    EntitiesList
  },

  data() {
    return {}
  }
}
</script>
<style lang="scss">
  .avisList {
    .adsense-block {
      display: block;
      background: #29495ebf;
      margin-right: 150px;
      margin-left: 150px;
      margin-bottom: 20px;
    }
  }
</style>
