<template>
  <div class="buttonsPage">
    <div class="blackContainer">

      <div class="buttonsPage__btnBlock">
       <b-button class="btn-special members" :to="{name: 'ratings.avis.gallery'}">Pics</b-button>
       <b-button class="btn-special members" :to="{name: 'ratings.avis.interviews'}">Interviews</b-button>
      </div>

     <div class="buttonsPage__btnBlock">
		<b-button class="btn-special" :to="{name: 'ratings.peepscreeps'}">Peeps & Creeps</b-button>
	</div>
	<div class="buttonsPage__btnBlock">	
        <b-button class="btn-special" :to="{name: 'ratings.claim'}">Claim Name</b-button>
     </div>

      <div class="buttonsPage__btnBlock">
        <b-button class="btn-special" :to="{name: 'ratings.contact'}">Message Us</b-button>
        <b-button class="btn-special" :to="{name: 'ratings.info'}">Info</b-button>
      </div>

      <div class="buttonsPage__btnBlock">
        <b-button class="btn-special" :to="{name: 'ratings.home'}">Home</b-button>
        <b-button class="btn-special" @click="emitForum">Forum</b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },

  computed: {
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    }
  },

  methods: {
    emitForum() {
      window.location.href = '/avi-forum/'
    }
  }
}
</script>
<style lang="scss">
.buttonsPage {

  &__container {
    background-color: #29495ebf;
    border: 1px solid #18786f;
  }

.blackContainer {
	min-height: 85vh;
}

  &__btnBlock {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #0000001a;
    justify-content: center;
  }

  .btn-special {
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
  
  .members {
	border-color: #56fafb;
	}
  
}
</style>