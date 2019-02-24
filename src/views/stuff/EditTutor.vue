<template>
  <div>
    <person-form
    v-bind:person="tutor"
    btnText="Zapisz"
    @submit="updateTutor"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import PersonForm from '@/components/PersonForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'editTutor',
  components: {
    'person-form': PersonForm
  },
  data () {
    return {
      tutor: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`tutors/${this.$route.params.tutorId}`)
    .then(response => {
      if(response.data){
        if(response.data.errorMessage === null){
          this.tutor = response.data;
        }
        else {
          this.statusMsg = response.data.errorMessage
        }
      }
    })
    .catch(() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    updateTutor: function () {
      HTTP.put(`tutors`, this.tutor)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.statusMsg = "pomyślnie zmieniono dane instruktora"
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
