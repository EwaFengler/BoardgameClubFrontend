<template>
  <form>
    Data:<br>
    <input type="date" v-model="timeObject.date">
    <br>
    Godzina:<br>
    <input type="time" v-model="timeObject.time">
    <br>
    Jak długo:<br>
    <input type="number" min="1" v-model="timeObject.duration">min
    <br><br>
    <button @click="proceed">dalej</button>
    <p v-for="statusMsg in statusMsgs">{{ statusMsg }}</p>
  </form>
</template>

<script>

export default {
  name: 'timeForm',
  props: [
    'timeObject'
  ],
  data () {
    return {
      statusMsgs: []
    }
  },
  methods: {
    proceed: function () {
      this.statusMsgs = [];
      if(this.timeObject.date == null){
        this.statusMsgs.push("wybierz datę");
      }
      if(this.timeObject.time == null){
        this.statusMsgs.push("wybierz godzinę");
      }
      if(this.timeObject.duration <= 0){
        this.statusMsgs.push("czas trwania turnieju powinien być dodatni");
      }
      if(this.statusMsgs.length === 0){
        this.timeObject.startTime = this.timeObject.date + 'T' + this.timeObject.time;
        this.$emit('timeFilled');
      }
    },
  }
}
</script>
