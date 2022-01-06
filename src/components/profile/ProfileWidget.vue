<template>
  <div class="profileWidget">
    <span>Hi, {{ username }}</span>
    <p>There will be more added to this page.</p>
    <p>Browse around and let us know if you find any bugs.</p>
  </div>
</template>
<script>
  export default {
    props: {
      username: String
    }
  }
</script>
<style lang="scss">
  .profileWidget {
    background: #3a6581;
    border-radius: 7px;
    padding: 15px;
    height: calc(100% - 18px);
    @media screen and (min-width: 1024px) {
      height: 170px;
      margin-bottom: 20px;
    }
  }
</style>