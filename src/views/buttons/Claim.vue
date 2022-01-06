<template>
  <transition name="fade">
    <div class="claimPage" v-if="loading">
      <div class="blackContainer">
        <h3 class="mb-4">
          Claim a Name
        </h3>
        <p class="claimer mb-4">
			You will see a timer counting down on some player pages. This means that player is claimed.
          Claiming your avatar gives you a clean slate. Or keeps your slate clean.<br>Picture proof is required with
          negative comments on claimed players which stops people from making things up.<br>Negative comments without
          pictures will be removed when you claim. After you claim and want the pics reviewed then just ask. We have deleted a few pics that really didn't show anything proof wise.<br><br>The plan is to give some good perks to claimed names but let's finish the site first.
        </p>
        <p class="claimer mb-4">
          Claiming is simple... In your dashboard, you will see a Claim Player area. Submit the name you want to claim. A
          timer will start counting down. You can restart the timer at any time but if you
          don't, the player will unclaim and any negative comments will show again. If you don't see the timer then it is not claimed.<br><br>You can claim any name. It doesn't have to be yours. Nobody really knows who is claiming who.
        </p>
        <p class="claimer mb-4">
          Log in... Head over to your profile... Claim a player or a party !!
        </p>
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
<style lang="scss">
.claimPage {

.claimer {
	font-size: 20px
	}

}
</style>