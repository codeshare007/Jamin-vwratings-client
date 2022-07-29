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
            <h1 v-else>This is section 1.</h1>
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