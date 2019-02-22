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
      // TODO: po dodaniu informacji o błędzie:
      // - odkomentowanie ifa
      // - dostosowanie nazwy zmiennej jeżeli to nie jest "errorMessage"
      // - jeżeli nie działa dla czegoś, co powoduje błąd - np. nieunikatowego emaila,
      // zakomentować ifa, w miejscu ifa wyświetlić response w konsoli przeglądarki:
      // console.log(response)
      // i odpowiednio zmienić nazwę zmiennej lub naprawić backend.
      HTTP.post(`clients`, this.person)
      .then(response => {
        if(response.data){
          // if(response.data.errorMessage == ""){
            if(response.data.id){
              this.$router.push({ path: `/client/${response.data.id}` })
            }
            else {
              this.errorMsg = "wystąpił błąd"
            }
          // }
          // else {
          //   this.errorMsg = response.data.errorMessage
          // }          
        }
      })
      .catch(() => {
        this.errorMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
