<template>
  <div class="notificationsWidget">
    <span class="h2">Notifications</span>
    <!-- There is no notifications yet. -->

    <div class="notificationItem">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    </div>
    <div class="notificationItem">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.notificationsWidget {
  background: #1f5476;
  min-height: 100px;
  border-radius: 15px;
  padding: 20px 18px;
  width: 100%;
  margin-bottom: 20px;

  .h2 {
    margin-bottom: 20px;
    display: block;
  }

  .notificationItem {
    background: #133347;
    padding: 15px 15px;
    min-height: 60px;
    margin-bottom: 10px;
    border-radius: 15px;
  }
}
</style>