<template>
  <div>
    Data:<br>
    <input type="date" name="day" v-model="tournament.date">
    <br>
    Godzina:<br>
    <input type="time" name="time" v-model="tournament.time">
    <br>
    Jak długo:<br>
    <input type="number" min="1" v-model="tournament.duration">min
    <br><br>
    <button @click="proceed">dalej</button>
    <p v-for="statusMsg in statusMsgs">{{ statusMsg }}</p>
  </div>
</template>

<script>

export default {
  name: 'tournamentTime',
  props: [
    'tournament'
  ],
  data () {
    return {
      statusMsgs: []
    }
  },
  methods: {
    proceed: function () {
      this.statusMsgs = [];
      if(this.tournament.date == null){
        this.statusMsgs.push("wybierz datę");
      }
      if(this.tournament.time == null){
        this.statusMsgs.push("wybierz godzinę");
      }
      if(this.tournament.duration <= 0){
        this.statusMsgs.push("czas trwania turnieju powinien być dodatni");
      }
      this.$emit('timeFilled');
    },
  }
}
</script>
