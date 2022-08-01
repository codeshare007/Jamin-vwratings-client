<template>
  <transition name="fade">
    <div class="creepTimer">
      <div class="blackContainer">
        <div class="timer">
          <template>
            <div class="hour-counter">
              <span class="hours">{{ hours }}</span><span class="normal">hrs</span>
              <span class="minutes">{{ minutes }}</span><span class="normal">mins</span>
              <span class="seconds">{{ seconds }}</span><span class="normal">secs</span>
            </div>
			
			
            <div class="vote text-center" v-if="section_number">
              <h4>Creep Vote</h4>
              <p>Here are this weeks nominations for creeps. Click the one that you think is the worst.</p>
              <h5>Current Nominees</h5>
              <b-row class="d-flex justify-content-center">            
                <b-col cols="6">
                  <p v-for="(item, i) in this.items" :key="i">{{item.avi_name}}</p>
                </b-col>
              </b-row>			
            </div>
   
   
            <div class="nominate" v-else>
              <div class="nom text-center">	
                <h4>Creep Nomination</h4>
                <p>Enter the exact name of the creep you would like to nominate this round, then come back to vote when the timer runs out.  Please note: Nominees must come from the bad list {link to bad list} </p>					

                <b-form v-if="this.form_possible">
					<b-form-input
                    class="mb-1 text-center"
                    placeholder="Creep's Name"
                    v-model="$v.form.creep_name.$model"
                    :state="validateState('creep_name')"
                    type="text"/>
                  <span class="error-message text-center text-danger d-block text-center">{{ this.error }}<a href="/avis?type=bad_list">bad list</a></span>
                  <div class="d-flex justify-content-end">
                    <b-button @click="submitNomination" variant="primary">Submit</b-button>
                  </div>
                </b-form>

                <h4>Current Nominees</h4>
                <b-row class="d-flex justify-content-center">            
                  <b-col cols="6">
                    <p v-for="(item, i) in this.items" :key="i">{{item.avi_name}}</p>
                  </b-col>
                </b-row>
                <div v-if="items.length === 0">
                  <p class="text-center">There isn't any nominee.</p>
                </div>
                <div v-if="loading" class="d-flex justify-content-center mt-3 align-items-center" style="min-height: inherit;">
                  <b-spinner/>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

const {required, maxLength} = require('vuelidate/lib/validators')
export default {
  data() {
    return {
      items: [],
      loading: false,
      form_possible: true,
      diff_seconds: null,
      distance: 0,
      timePeriodMinutes: 0,
      section_number: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      form: {
        creep_name: null,
      },
      error: null
    };
  },

  validations: {
    form: {
      creep_name: {
        required: required,
        maxLength: maxLength(16)
      },
    }
  },
  mounted() {
    this.loading = true;
    this.fetchTimer();
    this.fetchItems();
    this.getPossible();
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
              this.form_possible = true;
              this.distance = this.timePeriodMinutes;
              this.section_number = !(this.section_number);
            }
          }
        }, 1000);
      });
    },

    fetchItems() {
      this.loading = true;
      this.$api.nominations.fetch(this.currentPage, this.params).then(response => {
        this.items = response.data.data;
        this.loading = false;
      })
    },

    getPossible() {
      this.$api.nominations.getPossible().then((response) => {
        this.form_possible = response.data.possible;
      });
    },
    submitNomination(e) {
      e.preventDefault();

      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.errorRefreshed = false;
        return;
      }
      
      const payload = this.form;
      this.$api.nominations.create(payload).then(response => {
        if (response.data.status === 'success') {
          this.form_possible = false;
          window.location.href = '/promo?type=2';
        }
      }).catch(error => {
        this.error = error.response.data.message;
      })
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
  },
};
</script>
<style lang="scss">
.creepTimer {

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