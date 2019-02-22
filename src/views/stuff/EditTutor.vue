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
        this.tutor = response.data;
      }
    })
    .catch(() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    updateTutor: function () {
      // TODO: errorMessage
      HTTP.put(`tutors`, this.tutor)
      .then(() => {
        this.statusMsg = "pomyślnie zmieniono dane instruktora"
      })
      .catch(e => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
