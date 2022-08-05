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
            <b-modal ref="confirmModal" ok-title="Add" size="sg" ok-variant="dark" hide-footer
              modal-class="confirm__modal" title="Are you sure?">

              <b-form @reset="closeConfirmForm">
                <div class="d-flex justify-content-end mt-5">
                  <b-button variant="success" @click="vote">YES</b-button>
                  <b-button variant="danger" type="reset" class="mr-2">Cancel</b-button>				  
                </div>
              </b-form>
            </b-modal>

            <div class="vote text-center" v-if="section_number">
              <h4>Creep Vote</h4>
              <p>Here are this weeks nominations for creeps. Click the one that you think is the worst.</p>
              <h5>Current Nominees</h5>
              <b-row class="d-flex justify-content-center" v-if="is_voted">
                <b-col cols="6">
                  <a href="javascript:void(0);" class="d-block" v-for="(item, i) in this.items" :key="i"
                    @click="showConfirmForm(item)">{{ item.avi_name }}</a>
                </b-col>
              </b-row>
              <p v-if="!is_voted">You have already voted this round</p>
            </div>


            <div class="nominate" v-else>
              <div class="nom text-center">
                <h4>Creep Nomination</h4>
                <p>Enter the exact name of the creep you would like to nominate this round, then come back to vote when
                  the timer runs out. Please note: Nominees must come from the <a href='/avis?type=bad_list'>Bad
                    List</a> </p>

                <b-form v-if="this.form_possible">

                  <b-form-input v-mask="mask" class="mb-1 text-center" placeholder="Creep's Name"
                    v-model="$v.form.creep_name.$model" :state="validateState('creep_name')" type="text"
                    v-on:keydown.enter.prevent/>

                  <span class="error-message text-center text-danger d-block text-center">{{ this.error }}</span>
                  <div class="d-flex justify-content-end">
                    <b-button @click="submitNomination" variant="primary">Submit</b-button>
                  </div>
                </b-form>

                <h4>Current Nominees</h4>
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

const { required, maxLength } = require('vuelidate/lib/validators')
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
      error: null,
      vote_item: null,
      is_voted: false,
      mask: {
        mask: 'SSSSSSSSSSSSSSSS',
        tokens: { 'S': { pattern: /[0-9a-zA-Z ]/ } }
      },
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
    this.isVotingPossible();
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
        this.section_number = (Math.floor(this.diff_seconds / this.timePeriodMinutes) % 2 === 0) ? false : true;

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
              if (!this.section_number)
                window.location.href = 'http://localhost:8000/promo?type=7';
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

    redirectToItem(id) {
      const routeName = 'ratings.avis.view';
      return { name: routeName, params: { id: id } }
    },

    getPossible() {
      this.$api.nominations.getPossible().then((response) => {
        this.form_possible = response.data.possible;
      });
    },

    isVotingPossible() {
      this.$api.votings.getPossible().then((res) => {
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
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    closeConfirmForm() {
      this.$refs['confirmModal'].hide();
    },

    vote() {
      if (this.vote_item) {
        this.$api.votings.create(this.vote_item).then(response => {
          if (response.data.status === 'success') {
            window.location.href = '/promo?type=4';
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
.creepTimer {

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
      font-size: larger;
      color: #ff0707;
    }

    .col-6 {
      max-width: fit-content;
    }

    a {
      color: #ff0707;
    }

    .btn-primary {
      color: #fff;
      background-color: #dc3545;
      border-color: #22cb0f;
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