<template>
  <transition name="fade">
    <div class="profileChange" v-if="loaded">

      <h3 class="mb-4">Change/Add Email</h3>

      <b-form-group label="Email">
        <b-form-input v-on:keyup.enter="updateProfile()" v-model="$v.form.email.$model" />
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="updateProfile()" variant="success">Submit</b-button>
      </div>
    </div>
  </transition>
</template>
<script>
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
      email: {}
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
          this.$bvToast.toast('Password changed successfully', {
            title: `Success`,
            toaster: 'b-toaster-bottom-right',
            variant: 'success',
            solid: true
          })
        }
      }).catch(error => {
        this.errors = [];
        const errors = error.response.data.errors;
        for (let i in errors) {
          let error = errors[i][0]
          this.$bvToast.toast(error, {
            title: `Error`,
            toaster: 'b-toaster-bottom-right',
            variant: 'danger',
            solid: true
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.profileChange {
  background: #157272;
  border-radius: 15px;
  padding: 20px 19px;

  .form-control {
    background: #133347;
    color: white;
    border: 0;

    &:focus {
      background: #133347;
      box-shadow: 0 0 0 0.2rem #06abab75;
    }

    &::placeholder {
      color: white;
    }
  }
}
</style>