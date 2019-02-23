<template>
  <div>
    Email:<br>
    <input type="email" v-model="email">
    <button v-on:click="onLogInButtonClicked">Zaloguj się</button>
    <p v-if="errorMsg">{{ errorMsg }}</p>
  </div>
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
        console.log(response)
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
