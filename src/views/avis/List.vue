<template>
  <div class="avisList">
    <!-- <div class="avisList__adsBlock">
      <Adsense
        data-ad-client="ca-pub-3655622089482340"
        data-ad-slot="3406436587"
        data-ad-format="fluid"
        data-full-width-responsive="true">
      </Adsense>
    </div>
    -->
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
  &__adsBlock {
    display: block;
    overflow: hidden;
    background: #29495ebf;
    margin-right: 150px;
    margin-left: 150px;
    height: 240px;
    margin-bottom: 20px;
    border: 1px solid #18786f;
  }
}
</style>