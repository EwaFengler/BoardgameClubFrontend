<template>
  <div>
    Dostępni instruktorzy dla DATY i GODZINY:
    <form>
      <div v-for="tutor in tutors">
        <input type="radio" :value="tutor.id"> {{ tutor.name }} {{ tutor.surname }}
        <br>
      </div>
      <br>
      <input type="submit" value="Zamów instruktora">
    </from>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>

export default {
  name: 'addTutor',
  data () {
    return {
      tutors: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.post(`tutors/available`, ...)
    .then(response => {
      if(response.data){
        this.tutors = response.data
      }
    })
    .catch(e => {
      this.statusMsg = e // TODO - ludzki błąd
    })
  },
}
</script>
