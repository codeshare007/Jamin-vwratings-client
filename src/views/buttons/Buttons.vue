<template>
  <div class="buttonsPage">
    <div class="blackContainer">
      <div class="text-center">
        <b-button :to="{name: 'ratings.specialone'}">Special</b-button>
        <b-button :to="{name: 'ratings.specialtwo'}">Special</b-button>
      </div>
      <hr>
      <div class="text-center">
        <b-button :to="{name: 'ratings.peepscreeps'}">Peeps&Creeps</b-button>
      </div>
      <hr>
      <div class="text-center">
        <b-button :to="{name: 'ratings.claim'}">Claim Name</b-button>
      </div>
      <hr>
      <div class="text-center">
        <b-button :to="{name: 'ratings.contact'}">Message Us</b-button>
        <b-button :to="{name: 'ratings.info'}">Info</b-button>
      </div>
      <hr>
      <div class="text-center">
        <b-button :to="{name: 'ratings.home'}">Home</b-button>
        <b-button @click="emitForum">Forum</b-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      emitForum() {
        window.location.href = '/avi-forum/';
      }
    }
  }
</script>
<style lang="scss">
  .buttonsPage {
  
	.blackContainer {
		background-color: rgb(41 73 94 / 75%);
	}
	
    .btn-secondary {
      color: #fff;
      background-color: transparent;
      border-color: #99ff66;
      font-size: 1.5rem;
      margin: 0 5px;

      &:hover {
        color: #57bd25;
        background-color: #ffffff;
        border-color: #57bd25;
      }
    }
  }
</style>
