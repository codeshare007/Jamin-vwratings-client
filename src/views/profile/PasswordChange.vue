<template>
  <transition name="fade">
    <div class="passwordChange" v-if="loaded">

      <h3 class="mb-4">Change password</h3>

      <b-alert
        show
        variant="danger"
        class="d-block mr-2 mb-4 text-danger"
        v-for="(item, key) in errors"
        :key="key">{{ item }}</b-alert>

      <div v-if="passwordChanged">
        Password changed successfully.
      </div>

      <b-form v-else>
        <b-form-input
          v-model="$v.form.old_password.$model"
          type="password"
          :state="validateState('old_password')"
          placeholder="Old password"
          class="mb-2"
        />
        <b-form-input
          v-model="$v.form.password.$model"
          type="password"
          :state="validateState('password')"
          placeholder="New password (must be 6 characters minimal length)"
          class="mb-2"
        />
        <b-form-input
          v-model="$v.form.password_confirmation.$model"
          type="password"
          :state="validateState('password_confirmation')"
          placeholder="New password confirmation"
          class="mb-2"
        />

        <div class="d-flex justify-content-end mt-4">
          <b-button @click="changePassword()" variant="success">Submit</b-button>
        </div>
      </b-form>
    </div>
  </transition>
</template>
<script>
const {required, minLength} = require('vuelidate/lib/validators')

export default {
  data() {
    return {
      loaded: false,
      errors: [],
      passwordChanged: false,
      form: {
        old_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.loaded = true
    }, 200)
  },

  validations: {
    form: {
      old_password: {required},
      password: {
        required: required,
        minLength: minLength(6)
      },
      password_confirmation: {
        required: required,
        minLength: minLength(6)
      },
    }
  },

  methods: {
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    changePassword() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      const payload = this.form;
      this.$api.profile.changePassword(payload).then(response => {
        if (response.data.status === 'success') {
          this.passwordChanged = true;
          this.errors = [];
        }
      }).catch(error => {
        this.errors = [];
        const errors = error.response.data.errors;
        for (let i in errors) {
          let error = errors[i][0]
          this.errors.push(error);
        }
      })
    },
  }
}
</script>
<style lang="scss">
.passwordChange {
  background: #1f5476;
  border-radius: 15px;
  padding: 20px 19px;

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
}
</style>