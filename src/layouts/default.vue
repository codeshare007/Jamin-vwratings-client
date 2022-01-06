<template>
  <div class="default-theme">
    <HeaderBar class="mb-3" />
    <b-container class="default-theme__main p-0">
      <router-view />
    </b-container>
    <ScrollToTop>
      <b-button variant="primary"><b-icon-arrow-up /></b-button>
    </ScrollToTop>
  </div>
</template>
<script>
import ScrollToTop from "../components/ScrollToTop";
import HeaderBar from '@/components/layout/HeaderBar';

export default {
  components: {
    HeaderBar,
    ScrollToTop
  }
}
</script>
<style lang="scss">
.default-theme {
	color: white;

  &__main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
