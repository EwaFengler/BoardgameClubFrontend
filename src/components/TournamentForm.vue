<template>
  <form v-on:submit.prevent="onSubmitButtonClicked">
    <tournament-time v-bind:tournament="tournament" v-on:timeFilled=""/>

    <!-- W co:<br>
    <select name="game" v-model="tournament.game_id" @click="getGames">
      <option value="le_id1">Dixit</option>
      <option value="le_id2">Tajniacy</option>
    </select>
    <br>
    Dostępne egzemplarze:<br>
    <input type="checkbox" name="copy" value="le_id" v-model="tournament.copies"> 1 egz
    <br>
    <input type="checkbox" name="copy" value="le_id2"> 1 egz
    <br>
    Dostępne stoliki:<br>
    <input type="checkbox" name="table" value="le_id" v-model="tournament.tables"> stolik 4 osoby
    <br>
    <input type="checkbox" name="table" value="le_id2"> stolik 2 osoby
    <br>
    Maksimum graczy: 20
    <br><br>
    <input type="submit" :value="btnText"> -->
    <p v-for="statusMsg in statusMsgs">{{ statusMsg }}</p>
  </form>
</template>

<script>
import TournamentTime from '@/components/TournamentTime.vue'

export default {
  name: 'tournamentForm',
  components: {
    'tournament-time': TournamentTime
  },
  props: [
    'tournament',
    'btnText'
  ],
  data () {
    return {
      statusMsgs: []
    }
  },
  methods: {
    onSubmitButtonClicked: function () {
      // TODO: walidacja
      this.$emit('submit');
    }
  }
}
</script>
