<template>
  <div class="entityStatistics">
    <div class="entityStatistics__content d-flex justify-content-center">
      <div class="statItem">Rated {{ data.rated }} times</div>
      <div class="statItem">{{ data.comments }} Comments</div>
      <div class="statItem">{{ data.positive }} Positive Comments</div>
      <div class="statItem">{{ data.negative }} Negative Comments</div>
<!--      <div class="statItem">0 Views of page</div>-->
      <div class="statItem">{{ data.watchers }} Watchers</div>
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
.entityStatistics {

  &__content {
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .statItem {
    background: #3c786b;
    margin-left: 10px;
    font-size: 12px;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
</style>