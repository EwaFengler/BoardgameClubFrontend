<template>
  <form v-on:submit.prevent="onSubmitButtonClicked">
    <div v-for="tnmnt in tournaments"
    :key="tnmnt.tournamentDTO.id">
    <input type="radio" :value="tnmnt.tournamentDTO.id" v-model.number="entry.tournamentId">
    <ul>
      <li>Kiedy: {{ tnmnt.dateObj.toLocaleString() }}</li>
      <li>Jak długo: {{ tnmnt.tournamentDTO.duration }}min</li>
      <li>W co: {{ tnmnt.gameName }}</li>
    </ul>
  </div>
  <br>
  <input type="submit" value="Zapisz mnie!">
  <p v-if="statusMsg">{{ statusMsg }}</p>
</form>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'tournamentSignUp',
  data () {
    return {
      tournaments: [],
      entry: {
        "clientId": this.$route.params.clientId,
        "tournamentId": null
      },
      statusMsg: ''
    }
  },
  mounted: function () {
    this.getAvailableTournaments(this.$route.params.clientId)
  },
  methods: {
    onSubmitButtonClicked: function () {
      if (this.entry.tournamentId !== null) {
        HTTP.post(`tournament_participants`, this.entry)
        .then(response => {
          if (response.data) {
            if(response.data.errorMessage === null){
              this.entry.tournamentId = null;
              this.getAvailableTournaments(this.$route.params.clientId);
              this.statusMsg = "pomyślnie zapisano się na turniej";
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
      else {
        this.statusMsg = "Wybierz turniej"
      }
    },
    getAvailableTournaments: function (clientId) {
      HTTP.get(`clients/${clientId}/available-tournaments`)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.tournaments = response.data.values
            this.tournaments.forEach(e => {
              e.dateObj = new Date(e.tournamentDTO.startTime)
            })
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
