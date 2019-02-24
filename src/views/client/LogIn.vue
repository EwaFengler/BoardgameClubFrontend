<template>
  <form @submit.prevent="onLogInButtonClicked">
    Email:<br>
    <input type="email" v-model="email" required>
    <button>Zaloguj się</button>
    <p v-if="errorMsg">{{ errorMsg }}</p>
  </form>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'logIn',
  data () {
    return {
      email: '',
      errorMsg: ''
    }
  },
  methods: {
    onLogInButtonClicked: function () {
      HTTP.post(`clients/get-by-email`, { value: this.email })
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.$router.push({ path: `/client/${response.data.id}` })
          }
          else {
            this.errorMsg = response.data.errorMessage
          }
        }
        else {
          this.errorMsg = "brak użytkownika o podanym emailu"
        }
    })
    .catch(() => {
      this.errorMsg = "wystąpił błąd"
    })
  }
}
}
</script>
