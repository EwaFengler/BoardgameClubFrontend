<template>
  <div>
    Data:<br>
    <input type="date" v-model="localTimeObject.date">
    <br>
    Godzina:<br>
    <input type="time" v-model="localTimeObject.time">
    <br>
    Jak długo:<br>
    <input type="number" min="1" v-model="localTimeObject.duration">min
    <br><br>
    <button @click="proceed">dalej</button>
    <p v-for="statusMsg in statusMsgs">{{ statusMsg }}</p>
  </div>
</template>

<script>

export default {
  name: 'timeForm',
  props: [
    'timeObject'
  ],
  data () {
    return {
      localTimeObject: {
        ...this.timeObject
      },
      statusMsgs: []
    }
  },
  methods: {
    proceed: function () {
      this.statusMsgs = [];
      if(this.localTimeObject.date == null){
        this.statusMsgs.push("wybierz datę");
      }
      if(this.localTimeObject.time == null){
        this.statusMsgs.push("wybierz godzinę");
      }
      if(this.localTimeObject.duration <= 0){
        this.statusMsgs.push("czas trwania turnieju powinien być dodatni");
      }
      if(this.statusMsgs.length === 0){
        this.localTimeObject.startTime = this.localTimeObject.date + 'T' + this.localTimeObject.time;
        this.$emit('timeFilled', this.localTimeObject);
      }
    }
  }
}
</script>
