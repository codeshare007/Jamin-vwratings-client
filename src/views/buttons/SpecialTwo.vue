<template>
  <transition name="fade">
    <div class="specialTwo" v-if="loading">
      <div class="blackContainer">
        <div class="text-center">
          <p class="m-0">Nothing</p>
          <p class="m-0">Here</p>
          <p class="m-0">Yet</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    }
  },

  mounted() {
    this.loading = true;
  }
}
</script>