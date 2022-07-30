<template>
  <transition name="fade">
    <div class="peepTimer" v-if="loading">
      <div class="blackContainer">
        <div class="timer">
          <template>
            <div class="hour-counter">
              <span class="hours">{{ hours }}</span><span class="normal">hrs</span>
              <span class="minutes">{{ minutes }}</span><span class="normal">mins</span>
              <span class="seconds">{{ seconds }}</span><span class="normal">secs</span>
            </div>
			
			
            <div class="vote text-center" v-if="section_number">
				<h4>Peep Vote</h4>
				<p>Here are this weeks nominations for your favorite peeps. Click the one that you think is the best.</p>
				<h5>Current Nominees</h5>
				<p>peep name</p>
				<p>peep name</p>
				<p>peep name</p>
				<p>peep name</p>				
			</div>
			
			
            <div class="nominate" v-else>
				<div class="nom text-center">	
					<h4>Peep Nomination</h4>
					<p>Enter the exact name of the peep you would like to nominate this round, then come back to vote when the timer runs out.  Please note: Nominees must come from the good list {link to good list} </p>
					
					<b-form>
						<b-form-input
							class="mb-1 text-center"
							placeholder="Peep's Name"/>
						<div class="d-flex justify-content-end">
							<b-button @click="sendMessage" variant="primary">Submit</b-button>
						</div>
					</b-form>

					<h4>Current Nominees</h4>
					<p>peep name</p>
					<p>peep name</p>
					<p>peep name</p>
					<p>peep name</p>
				</div>
			</div>
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
<style lang="scss">
.peepTimer {

    .timer {
        h1{
            margin: 20px;
            text-align: center;
        }
        .hour-counter {
            color: #fff;
            font-size: 24px;
            font-weight: 300;
            position: relative;
            text-align: center;
            width: 50%;
			margin-right: auto;
			margin-left: auto;
			margin-bottom: 25px;
            letter-spacing: 2px;
            word-spacing: 8px;
            border: 1px solid #5b8750;

            .normal {
                font-size: 15px;
                margin-right: 20px;
            }
        }
    }
	.blackContainer {
		padding-top: 0;
	}
	form {
		width: 40%;
		margin: auto;
	}
	.btn {
		margin: auto;
		margin-bottom: 25px;
		padding: 4px;
	}
}

</style>