<template>
  <div>
    <router-link :to="{ name: 'addTournament'}">
      <button>Dodaj turniej</button>
    </router-link>
    <ul>
      <li v-for="tournament in tournaments"
        :key=" tournament.id">
        <ul>
          <li>Kiedy: {{ tournament.dateObj.toLocaleString() }}</li>
          <li>Jak długo: {{ tournament.duration }}min</li>
          <li>W co: {{ tournament.readOnlyGameName }}</li>
          <li>Maksymalna liczba graczy: {{ tournament.maxPlayers }}</li>
          <li>Zapisanych graczy: {{ tournament.readOnlyPlayersNumber }}</li>
          <li>
            <router-link :to="{ name: 'editTournament', params: { 'tournamentId': tournament.id} }">
              <button>Edytuj</button>
            </router-link>
          </li>
          <li><button @click="deleteTournament(tournament)">Usuń</button></li>
        </ul>
      </li>
    </ul>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'createdTournaments',
  data () {
    return {
      tournaments: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`tournaments`)
    .then(response => {
      if(response.data){
        this.tournaments = response.data
        this.tournaments.forEach((e) => {
          e.dateObj = new Date(e.startTime)
        })
      }
    })
    .catch(e => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    //TODO: errorMessage
    deleteTournament: function (tournament) {
      HTTP.delete(`tournaments/${tournament.id}`)
      .then(() => {
        this.tournaments.splice(this.tournaments.indexOf(tournament), 1);
        this.statusMsg = "pomyślnie usunięto turniej";
      })
      .catch(e => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
