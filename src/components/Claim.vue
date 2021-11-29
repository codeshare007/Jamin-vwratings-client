<template>
  <div class="claimComponent">
    <div v-if="!loading" class="mb-3">
      <b-form v-if="Object.keys(items).length === 0">
        <b-row class="justify-content-start">
          <b-col cols="6">
            <b-form-input
              :placeholder="'Enter Name'"
              class="bg-dark text-white border-dark"
              :state="validateState('name')"
              v-model="$v.form.name.$model"
            />
          </b-col>

          <b-col cols="3" class="d-flex">
            <b-button class="claimbut" type="submit" @click="claimItem">
              Claim
            </b-button>
          </b-col>

          <span class="ml-3 mt-3 d-block text-danger" v-for="(item, key) in errors" :key="key">
            {{ item }}
          </span>
        </b-row>
      </b-form>

      <b-table
        v-if="Object.keys(items).length !== 0"
        table-variant="dark"
        :items="items"
        :fields="[
          {key: this.entity + '.name', label: 'name'},
          {key: 'claimed_until', label: 'claimed until'},
          {key: 'actions', name: 'actions'}
         ]">

        <template #cell(claimed_until)="row">
          <vue-countdown :time="countdown(row.item.claimed_until)" :interval="100" v-slot="{ totalHours, minutes, seconds }">
            {{ totalHours + ':' +  minutes + ':' + seconds }}
          </vue-countdown>

        </template>

        <template #cell(actions)="row">
          <b-button variant="success" size="sm" @click="stayClaimed(row.item.id)">Reset</b-button>
          <b-button variant="primary" size="sm" @click="redirectToItem(row.item)" class="ml-2">
            <b-icon-eye/>
          </b-button>
        </template>

      </b-table>
    </div>
  </div>
</template>
<script>
const {required} = require('vuelidate/lib/validators');
import moment from 'moment';

export default {
  props: {
    items: [],
    entity: String,
    entities: String,
    itemName: String
  },

  data() {
    return {
      loading: false,
      errors: [],
      form: {
        name: null
      }
    }
  },

  validations: {
    form: {
      name: {required}
    }
  },

  methods: {
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
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
        if (response.data.status === 'success') {
          window.location.href = '/promo';
        }
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

    redirectToItem(item) {
      let id;
      if (this.entity === 'avi') id = item.avis_id;
      if (this.entity === 'party') id = item.party_id;
      this.$router.push({name: `ratings.${this.entities}.view`, params: {id: id}})
    },

    countdown(date) {
      let until = moment(date.until);
      let duration = moment.duration(until.diff(date.now));
      return duration['_milliseconds'];
    }

  }
}
</script>
<style>
.claimComponent {

.claimbut {
background: transparent;
}
}
</style>