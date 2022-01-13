<template>
  <transition name="fade">
    <div class="notificationsPage" v-if="loaded">
      <h2>Notifications</h2>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      loaded: false
    }
  },

  mounted() {
    this.loaded = true;
  }
}
</script>
<style lang="scss">
  .notificationsPage {
    background: #157272;
    border-radius: 15px;
    padding: 20px 19px;
  }
</style>