<template>
  <div>
    <select name="game" v-model="tournament.game_id" @click="getGames">
      <option value="le_id1">Dixit</option>
      <option value="le_id2">Tajniacy</option>
    </select>
    <button @click="goBack">wstecz</button>
    <button @click="proceed">dalej</button>
    <p v-for="statusMsg in statusMsgs">{{ statusMsg }}</p>
  </div>
</template>

<script>

export default {
  name: 'tournamentTime',
  props: [
    'tournament',
    'games'
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
      this.$emit('gameFilled');
    },
    goBack: function () {

    }
  }
}
</script>
