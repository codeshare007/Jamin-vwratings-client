<template>
  <transition name="fade">
    <div class="profileChange" v-if="loaded">

      <h3 class="mb-4">Profile</h3>

      <b-form-group label="Email">
        <b-form-input  v-model="$v.form.email.$model" />
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="updateProfile()" variant="success">Submit</b-button>
      </div>
    </div>
  </transition>
</template>
<script>
const {required} = require('vuelidate/lib/validators')

export default {
  data() {
    return {
      loaded: false,
      form: {
        email: null
      }
    }
  },


  computed: {
    profile() {
      return this.$store.getters['auth/profile']
    }
  },

  validations: {
    form: {
      email: {required}
    }
  },

  mounted() {
    this.form.email = this.profile.email;
    setTimeout(() => {
      this.loaded = true
    }, 200)
  },

  methods: {
    updateProfile() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      const payload = this.form;
      this.$api.profile.update(payload).then(response => {
        if (response.data.status === 'success') {
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
    }
  }
}
</script>
<style lang="scss">
.profileChange {
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