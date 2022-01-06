<template>
  <div class="entitiesClaimed">

    <div class="d-flex align-items-center mb-2 justify-content-between">
      <p class="m-0">
        <font-awesome-icon icon="user-edit" size="sm" class="mr-1" />
        Claimed {{ entityName }}
      </p>

      <b-button variant="transparent" size="sm" id="tooltip-target-1">
        <b-icon-info-circle variant="light"/>
      </b-button>
    </div>

    <b-tooltip target="tooltip-target-1" triggers="hover">
      Simply add a {{ entityName }} name and don't let the timer run out.
      <router-link :to="{name: 'ratings.claim'}">More info</router-link>
    </b-tooltip>

    <div v-if="Object.keys(items).length && !loading">
      <div v-for="(item, i) in items" :key="i" class="entitiesClaimed__item">
        <div>{{ item[entity].name }}</div>
        <div>
          <vue-countdown
            :time="countdown(item.claimed_until)"
            :interval="100"
            v-slot="{ totalHours, minutes, seconds }"
          >{{ totalHours + ':' + minutes + ':' + seconds }}
          </vue-countdown>
        </div>
        <div>
          <b-button variant="warning" @click="stayClaimed()" size="sm">
            <b-icon-arrow-clockwise />
          </b-button>
        </div>
      </div>
    </div>

    <div class="mt-1 mb-3 d-flex flex-column justify-items-start" v-if="!Object.keys(items).length">
      <b-input
        type="text"
        :state="validateState('name')"
        class="mr-3 w-100 mb-2"
        v-model="$v.form.name.$model"
        :placeholder="`Enter ${entityName} name`"
      />
      <b-button @click="claimItem" variant="warning">Claim</b-button>
    </div>

    <b-alert variant="danger" show v-for="(item, key) in errors" :key="key">{{ item }}</b-alert>
  </div>
</template>
<script>
const {required} = require('vuelidate/lib/validators');
import moment from 'moment';

export default {

  props: {
    entity: String
  },

  data() {
    return {
      items: [],
      errors: [],
      loading: true,
      entityName: 'player',
      form: {
        name: ''
      }
    }
  },

  watch: {
    entity(value) {
      if (value === 'avi') this.entityName = 'player';
      if (value === 'party') this.entityName = 'party';
      this.fetchClaimed();
    }
  },

  validations: {
    form: {
      name: {required}
    }
  },

  mounted() {
    this.fetchClaimed()
  },

  methods: {
    fetchClaimed() {
      this.loading = true;
      this.errors = [];
      this.$api.profile.claimed().then(response => {
        if (this.entity === 'avi') this.items = response.data.data.avis;
        if (this.entity === 'party') this.items = response.data.data.parties;
        this.loading = false;
      })
    },

    claimItem(e) {
      e.preventDefault();

      this.$v.form.$touch();
      if (this.$v.form.$error) return;

      const payload = {
        name: this.form.name,
        type: this.entity
      };

      this.$api.profile.claim(payload).then(response => {
        if (response.data.status === 'success')
          window.location.href = '/promo';
      }).catch(error => {
        this.errors = [];
        const errors = error.response.data.errors;
        for (let i in errors) {
          let error = errors[i][0]
          this.errors.push(error)
        }
      })
    },

    stayClaimed() {
      this.$api.profile.stayClaimed({type: this.entity}).then(response => {
        if (response.data.status === 'success') {
          window.location = '/promo'
        }
      })
    },

    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    countdown(date) {
      let until = moment(date.until);
      let duration = moment.duration(until.diff(date.now));
      return duration['_milliseconds'];
    }
  }
}
</script>
<style lang="scss">
.entitiesClaimed {
  background: #1f5476;
  min-height: 140px;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  margin-bottom: 20px;

  @media screen and (min-width: 1024px) {
    min-height: calc(100% - 21px);
    margin-bottom: 20px;
  }

  .form-control {
    background: #133347;
    color: white;
    border: 0;

    &:focus {
      background: #133347;
    }

    &::placeholder {
      color: white;
    }
  }

  &__item {
    margin-top: 10px;
    cursor: pointer;
    background: #133347;
    padding: 10px;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>