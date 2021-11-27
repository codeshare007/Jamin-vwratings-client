<template>
  <transition name="fade">
    <div class="claimPage" v-if="loading">
      <div class="blackContainer">
        <h3 class="mb-4">
          Claim a Name
        </h3>
        <p class="mb-4">
          Claiming your avatar gives you a clean slate. Or keeps your slate clean.<br>Picture proof is required with
          negative comments on claimed avis which stops people from making things up.<br>Negative comments without
          pictures will be removed when you claim.
        </p>
        <p class="mb-4">
          Claiming is simple... In your dashboard, you will see a Claim Avi area. Submit the name you want to claim. A
          timer will start counting down. You can restart the timer at any time but if you
          don't, your avi will unclaim and any negative comments will show again
        </p>
        <p class="mb-4">
          Log in... Head over to your profile... Claim your avi or your party !!
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