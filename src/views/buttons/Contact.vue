<template>
  <div class="contactPage">
    <div class="blackContainer">
      <div v-if="!sent">
        <div>
          <h1 class="text-center">Message Us</h1>
          <p class="text-center">If you need us to reply to your message be sure to leave an email address.</p>
        </div>

        <b-form>
          <b-form-input
              class="mb-1"
              placeholder="Player Name (optional)"
              v-model="$v.form.name.$model"/>

          <b-form-input
              class="mb-1"
              placeholder="Reply Email (optional)"
              v-model="$v.form.email.$model"/>

          <b-form-textarea
              rows="3"
              class="mb-1"
              placeholder="Type your message....."
              v-model="$v.form.content.$model"
          />
          <div class="d-flex justify-content-end">
            <b-button @click="sendMessage" variant="primary">Send</b-button>
          </div>
        </b-form>
      </div>
      <div v-else>
        <h1>Message sent</h1>
      </div>
    </div>
  </div>
</template>
<script>
import {required} from "vuelidate/lib/validators";

import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        content: null
      },

      sent: false
    }
  },


  validations: {
    form: {
      name: {},
      email: {},
      content: {required}
    }
  },


  methods: {
    sendMessage() {
      this.$v.form.$touch();

      if (this.$v.form.$anyError) {
        return;
      }

      const payload = this.form;

      axios.post('/api/v1/send-message', payload).then(response => {
        if (response.data.status === 'success') {
          this.sent = true;
        }
      })
    }
  }
}
</script>
<style lang="scss">
.contact-page {

  h1, legend {
    font-family: 'Futura PT', sans-serif;
  }

  h1, p, legend {
    color: white;
  }
}
@media screen and (min-width: 980px){
.blackContainer {
    margin: 0 300px;
	}
}
@media screen and (min-width: 768px) and (max-width: 980px){
.blackContainer {
    margin: 20px 100px;
	}
}
</style>
