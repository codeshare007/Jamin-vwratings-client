<template>
  <div class="claimComponent">
    <div v-if="!loading" class="mb-3">
      <b-form v-if="Object.keys(items).length === 0">
        <b-row class="justify-content-start mt-4">
          <b-col cols="6">
            <b-form-input
              :placeholder="'name of ' + this.entity"
              class="bg-dark text-white border-dark"
              :state="validateState('name')"
              v-model="$v.form.name.$model"
            />
          </b-col>

          <b-col cols="3" class="d-flex">
            <b-button variant="success" type="submit" @click="claimItem">
              Submit
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
          {{ items[row.index]['claimed_until_formatted'] || '00:00:00' }}
        </template>

        <template #cell(actions)="row">
          <b-button variant="success" size="sm" @click="stayClaimed(row.item.id)">Stay Claimed</b-button>
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

  mounted() {
    this.countDownTimer();
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

    countDownTimer() {
      for (let i in this.items) {
        let t = Date.parse(new Date(this.items[i].claimed_until)) - Date.parse(new Date());

        if (t > 0) {
          setTimeout(() => {
            let timeLeft = '';
            timeLeft += Math.floor(t / (1000 * 60 * 60)) + ':';
            timeLeft += Math.floor(t / 1000 / 60 % 60) + ':';
            timeLeft += Math.floor(t / 1000 % 60) + '';
            this.items[i].claimed_until_formatted = timeLeft;
            this.countDownTimer();
          }, 1000);

          this.$forceUpdate();
        } else {
          this.items[i].claimed_until_formatted = 0;
        }
      }
    },
  }
}
</script>
<style>
.claimComponent {

}
</style>