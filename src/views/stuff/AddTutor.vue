<template>
  <div>
    <person-form
    v-bind:person="tutor"
    btnText="Dodaj"
    @submit="createTutor"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import PersonForm from '@/components/PersonForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'addTutor',
  components: {
    'person-form': PersonForm
  },
  data () {
    return {
      tutor: {
        name: '',
        surname: '',
        email: '',
        phoneNumber: ''
      },
      statusMsg: ''
    }
  },
  methods: {
    createTutor: function () {
      // TODO: po dodaniu informacji o błędzie:
      // - odkomentowanie ifa
      // - dostosowanie nazwy zmiennej jeżeli to nie jest "errorMessage"
      // - jeżeli nie działa dla czegoś, co powoduje błąd - np. nieunikatowego emaila,
      // zakomentować ifa, w miejscu ifa wyświetlić response w konsoli przeglądarki:
      // console.log(response)
      // i odpowiednio zmienić nazwę zmiennej lub naprawić backend.
      HTTP.post(`tutors`, this.tutor)
      .then(response => {
        // if(response.data){
        //   if(response.data.errorMessage !== ""){
            this.statusMsg = "pomyślnie dodano instruktora"
        //   }
        //   else {
        //     this.statusMsg = response.data.errorMessage
        //   }
        // }
      })
      .catch(e => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
