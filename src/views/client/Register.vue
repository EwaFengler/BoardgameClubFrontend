<template>
  <div>
    <person-form
    v-bind:person="person"
    v-bind:btnText="btnText"
    v-on:submit="register"/>
    <p v-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
import PersonForm from '@/components/PersonForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'register',
  components: {
    'person-form': PersonForm
  },
  data () {
    return {
      person: {
        name: '',
        surname: '',
        email: '',
        phoneNumber: ''
      },
      btnText: "Zarejestruj się",
      errorMsg: ''
    }
  },
  methods: {
    register: function () {
      HTTP.post(`clients`, this.person)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            if(response.data.id){
              this.$router.push({ path: `/client/${response.data.id}` })
            }
            else {
              this.errorMsg = "wystąpił błąd"
            }
          }
          else {
            this.errorMsg = response.data.errorMessage
          }          
        }
      })
      .catch(() => {
        this.errorMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
