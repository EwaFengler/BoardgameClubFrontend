<template>
    <div>
      <div v-for="tutor in tutorsToSelect" :key="tutor.id">
        <input type="radio" name="tutor" :value="tutor" v-model="selectedTutor">
        {{ tutor.name }} {{ tutor.surname }}
      </div>
      <br><br>
      <button @click="$emit('goBack')">wstecz</button>
      <button @click="proceed">dalej</button>
      <p v-if="statusMsg">{{ statusMsg }}</p>
    </div>
</template>

<script>

export default {
  name: 'tutorForm',
  props: [
    'tutors',
    'currentTutor'
  ],
  data () {
    return {
      selectedTutor: this.currentTutor,
      statusMsg: ''
    }
  },
  computed: {
    tutorsToSelect: function () {
      return [{id: null, name: "brak", surname: "instruktora"}, ...this.tutors]
    }
  },
  methods: {
    proceed: function () {
      if(this.selectedTutor === null){
        this.statusMsg = "wybierz instruktora lub zaznacz brak";
      }
      else {
        this.statusMsg = "";
        this.$emit('tutorSelected', this.selectedTutor);
      }
    }
  }
}
</script>
