<template>
  <div class="entityStatistics d-flex justify-content-center flex-column">
    <div class="statItem">Rated 62 times</div>
    <div class="statItem">491 Comments</div>
    <div class="statItem">303 Positive Comments</div>
    <div class="statItem">213 Negative Comments</div>
    <div class="statItem">201 Views of page</div>
    <div class="statItem">32 Watchers</div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.entityStatistics {
  margin-top: 20px;
  margin-bottom: 40px;
  padding: 0 100px;
  flex-wrap: wrap;
  .statItem {
    background: #3c786b;
    margin-left: 10px;
    font-size: 12px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
}

</style>