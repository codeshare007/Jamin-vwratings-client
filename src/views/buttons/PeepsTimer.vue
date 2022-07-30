<template>
  <transition name="fade">
    <div class="peepsTimer" v-if="loading">
      <div class="blackContainer">
        <div class="timer">
          <template>
            <div class="hour-counter">
              <span class="hours">{{ hours }}</span><span class="normal">H</span>
              <span class="minutes">{{ minutes }}</span><span class="normal">M</span>
              <span class="seconds">{{ seconds }}</span><span class="normal">S</span>
            </div>
            <h1 v-if="section_number">This is the next section.</h1>
            <h3 v-else>Creep Nomination</h3>
			<h4>Enter the exact name of the creep you would like to nominate this round, then come back to vote when the timer runs out.  Please note: Nominees must come from the bad list {link to bad list} </h4>
			
        <b-form>
          <b-form-input
              class="mb-1"
              placeholder="Creep's Name"/>
          <div class="d-flex justify-content-end">
            <b-button @click="sendMessage" variant="primary">Submit</b-button>
          </div>
        </b-form>

			<h3>Current Nominees</h3>
			<h4>creep name</h4>
			<h4>creep name</h4>
			<h4>creep name</h4>
			<h4>creep name</h4>			
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      diff_seconds: null,
      distance: 0,
      timePeriodMinutes: 0,
      section_number: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },

  mounted() {
    this.loading = true;
    this.fetchTimer();
  },
  methods: {
    fetchTimer() {
      this.$api.profile.fetch_timer().then((response) => {
        const data = response.data.data;
        const startDateTime = new Date(data[0]);
        const now = new Date(data[1]);
        this.timePeriodMinutes = data[2] * 60 * 1000;
        this.diff_seconds = (now - startDateTime);
        this.distance = this.timePeriodMinutes - this.diff_seconds % this.timePeriodMinutes;
        this.section_number = (Math.floor(this.diff_seconds / this.timePeriodMinutes) % 2 === 0)? false : true ;

        setInterval(() => {
          if (this.distance < 0) {
            this.distance = this.timePeriodMinutes;
            //this.section_number = !(this.section_number);
          } else {
            this.hours = Math.floor(
              (this.distance / (1000 * 60 * 60))
            );
            this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
            this.distance -= 1000;
            if (this.distance < 0) {
              this.distance = this.timePeriodMinutes;
              this.section_number = !(this.section_number);
            }
          }
        }, 1000);
      });
    },
  },
};
</script>