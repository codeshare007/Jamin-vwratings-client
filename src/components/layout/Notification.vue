<template>
  <div class="notification">
    <div class="notification__content d-flex justify-content-center">
      <div class="contentItem">{{ data.content }}</div>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  }
}
</script>
<style lang="scss">
.notification {

  &__content {
    margin-top: 20px;
    flex-wrap: wrap;
  }

  // .contentItem {
  //   background: #3c786b;
  //   margin-left: 10px;
  //   font-size: 16px;
  //   padding: 10px;
  //   border-radius: 5px;
  //   margin-bottom: 10px;
	// color: white;
  // }
}
</style>