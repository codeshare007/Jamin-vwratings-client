<template>
  <transition name="fade">
    <div class="peepTimer">
      <div class="blackContainer">
        <div class="timer">
          <template>
            <div class="hour-counter">
              <span class="hours">{{ hours }}</span><span class="normal">hrs</span>
              <span class="minutes">{{ minutes }}</span><span class="normal">mins</span>
              <span class="seconds">{{ seconds }}</span><span class="normal">secs</span>
            </div>
            <b-modal ref="confirmModal" ok-title="Add" size="sg" ok-variant="dark" hide-footer
              modal-class="confirm__modal" title="Are you sure?">

              <b-form @reset="closeConfirmForm">
                <div class="d-flex justify-content-end mt-5">
                  <b-button variant="success" @click="vote">YES</b-button>
                  <b-button variant="danger" type="reset" class="mr-2">Cancel</b-button>				  
                </div>
              </b-form>
            </b-modal>

            <div class="process text-center" v-if="section_number == 2">
              <p>Processing the next round...</p>
              <div class="d-flex justify-content-center mt-3 align-items-center"
                style="min-height: inherit;">
                <b-spinner />
              </div>
            </div>
            <div class="vote text-center" v-if="section_number  == 1">
				<h4>Peep Vote</h4>
				<p>Here are this weeks nominations for your favorite peeps. Click the one that you think is the best.</p>
              <b-row class="d-flex justify-content-center" v-if="is_voted">
                <b-col cols="6">
                  <a href="javascript:void(0);" class="d-block" v-for="(item, i) in this.randomItems" :key="i"
                    @click="showConfirmForm(item)">{{ item.avi_name }}</a>
                </b-col>
              </b-row>			
              <p v-if="!is_voted" style="color: red">You have already voted this round</p>
            </div>
			
			
            <div class="nominate" v-if="section_number == 0">
				<div class="nom text-center">	
					<h4>Peep Nomination</h4>
					<p>Enter the exact name of the peep you would like to nominate this round, then come back to vote when the timer runs out.  Please note: Nominees must come from the <a href='/avis?type=good_list'>Good List</a> </p>
                <b-form v-if="this.form_possible">

                  <b-form-input v-mask="mask" class="mb-1 text-center" placeholder="Peep's Name"
											


                    v-model="$v.form.peep_name.$model" :state="validateState('peep_name')" type="text"
                    v-on:keydown.enter.prevent/>
                  <span class="error-message text-center text-danger d-block text-center">{{ this.error }}</span>
                  <div class="d-flex justify-content-end">
                    <b-button @click="submitNomination" variant="primary">Submit</b-button>
                  </div>
                </b-form>

                <h5>Nominated this round...</h5>
                <b-row class="d-flex justify-content-center">            
                  <b-col cols="6">
                    <!-- <a href="/avis/" v-for="(item, i) in this.items" :key="i">{{item.avi_name}}</a> -->

                    <router-link class="d-block" v-for="(item, i) in this.items" :key="i"
                      :to="redirectToItem(item.avi_id)" v-html="item.avi_name" />
                  </b-col>                  
                </b-row>
                <div v-if="items.length === 0">
                  <p class="text-center">There aren't any nominees yet.</p>
                </div>
                <div v-if="loading" class="d-flex justify-content-center mt-3 align-items-center"
                  style="min-height: inherit;">
                  <b-spinner />
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
      randomItems: [],							 
      loading: false,
      form_possible: true,
      diff_seconds: null,
      distance: 0,
      timePeriodMinutes: 0,
      section_number: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      form: {
        peep_name: null,
      },
      error: null,
      vote_item: null,
      is_voted: false,
	mask: {
        mask: 'SSSSSSSSSSSSSSSS',
        tokens: {'S': {pattern: /[0-9a-zA-Z ]/}}
      },	  
      timer: null,
    };
  },

  watch: {
    items: {
      handler(items) {
        this.randomItems = [...items].sort((a, b) => (a.avi_id > b.avi_id ? 1 : (a.avi_id < b.avi_id ? -1 : 0))).slice(0, 2);
      },
      deep: true      
    }
  
  },
  validations: {
    form: {
      peep_name: {
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
    this.isVotingPossible();							
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
        this.section_number = (Math.floor(this.diff_seconds / this.timePeriodMinutes)) % 2;

        this.timer = setInterval(() => {
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
               if (this.section_number == 1) {
                this.$api.peeps.update().then(() => {})
                this.distance = 1000 * 5; // set process timer to 5s
                this.items = [];
              } else {
                this.distance = this.timePeriodMinutes;
              }
              this.form_possible = true;              
              this.section_number = (this.section_number + 1) % 3;
            }
          }
        }, 1000);
      });
    },

    fetchItems() {
      this.loading = true;
      this.$api.nominations_peeps.fetch(this.currentPage, this.params).then(response => {
        this.items = response.data.data;
        this.loading = false;
      })
    },

    redirectToItem(id) {
      const routeName = 'ratings.avis.view';
      return {name: routeName, params: {id: id} }
    },

    getPossible() {
      this.$api.nominations_peeps.getPossible().then((response) => {
        this.form_possible = response.data.possible;
      });
    },

    isVotingPossible() {
      this.$api.votings_peeps.getPossible().then((res) => {
        this.is_voted = res.data.possible;
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
      this.$api.nominations_peeps.create(payload).then(response => {
        if (response.data.status === 'success') {
          this.form_possible = false;
          window.location.href = '/promo?type=5';
        }
      }).catch(error => {
        this.error = error.response.data.message;
      })
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    closeConfirmForm() {
      this.$refs['confirmModal'].hide();
    },

    vote() {
      if (this.vote_item) {
        this.$api.votings_peeps.create(this.vote_item).then(response => {
          if (response.data.status === 'success') {
            window.location.href = '/promo?type=6';
          }
        })
      }
    },

    showConfirmForm(item) {
      this.vote_item = item;
      this.$refs['confirmModal'].show();
    },
  },
};
</script>
<style lang="scss">
.peepTimer {

  .timer {
    h1 {
      margin: 20px;
      text-align: center;
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

    .d-block {
      font-size: 24px;
      color: #07ff5f;
    }

    .col-6 {
      max-width: fit-content;
    }

    a {
      color: #07ff5f;
    }

    .btn-primary {
      color: #fff;
      background-color: #149b4a;
      border-color: #00ff5c;
    }
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
.modal-body {
    padding: 0;
    background-color: #30cbdb;
}
.modal-header {
    background-color: #30cbdb;
}

</style>