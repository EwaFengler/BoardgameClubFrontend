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
      HTTP.post(`tutors`, this.tutor)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.statusMsg = "pomyślnie dodano instruktora"
          }
          else {
            this.statusMsg = response.data.errorMessage
          }
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
