<template>
  <div>
    <time-form v-if="stage===1"
    :timeObject="timeObject"
    @timeFilled="proceedToTables($event)"/>
    <table-form v-if="stage===2"
    inputType="checkbox"
    v-bind:tables="tables"
    v-bind:currentTables="currentTables"
    @tablesSelected="proceedToGame($event)"
    @goBack="stage--"/>
    <game-select-form v-if="stage===3"
    v-bind:games="games"
    v-bind:currentGame="tournament.gameId"
    @gameSelected="proceedToCopies($event);"
    @goBack="stage--"/>
    <tournament-copies v-if="stage===4"
    v-bind:copies="gameCopies"
    v-bind:currentCopies="currentCopies"
    @copiesSelected="proceedToSubmit($event); stage++"
    @goBack="stage--"/>
    <tournament-summary v-if="stage===5"
    :tournament="localTournament"
    :btnText="btnText"
    @submit="$emit('submit', localTournament); stage = 1"
    @goBack="stage--"/>
  </div>
</template>

<script>
import TimeForm from '@/components/TimeForm.vue'
import TableForm from '@/components/TableForm.vue'
import GameSelectForm from '@/components/GameSelectForm.vue'
import TournamentCopies from '@/components/TournamentCopies.vue'
import TournamentSummary from '@/components/TournamentSummary.vue'
import {HTTP} from '@/http-common'

export default {
  name: 'tournamentForm',
  components: {
    'time-form': TimeForm,
    'table-form': TableForm,
    'game-select-form': GameSelectForm,
    'tournament-copies': TournamentCopies,
    'tournament-summary': TournamentSummary
  },
  props: [
    'tournament',
    'btnText'
  ],
  data () {
    return {
      stage: 1,
      localTournament: {
        ...this.tournament
      },
      timeObject: {
        duration: this.tournament.duration,
        date: this.tournament.date,
        time: this.tournament.time,
        targetId: this.tournament.id
      },
      currentTables: [],
      currentGame: null,
      currentCopies: [],
      tables: [],
      games: [],
      gameCopies: [],
      selectedGame: null,
      statusMsgs: []
    }
  },
  methods: {
    proceedToTables: function (timeObject) {
      this.localTournament = { ...this.localTournament, ...timeObject };
      this.timeObject = timeObject;
      this.getTables()
      .then(()  => { return this.getCurrentTables() })
      .then(()  => { this.stage++ })
      .catch(() => { this.statusMsg = "wystąpił błąd" });
    },
    proceedToGame: function (selectedTables) {
      this.localTournament.numberOfSits = selectedTables.map(t => t.numberOfSits).reduce((acc, b) => acc + b);
      this.localTournament.tableIds = selectedTables.map(t => t.id);
      this.getGames()
      .then(() => { this.stage++ })
      .catch(() => { this.statusMsg = "wystąpił błąd" });
    },
    proceedToCopies: function (selectedGameId) {
      this.selectedGame = this.games.find(g => {
        return g.game.id == selectedGameId
      });
      this.gameCopies = this.selectedGame.gameCopies;
      this.localTournament.gameId = this.selectedGame.game.id;
      this.localTournament.gameName = this.selectedGame.game.name;
      this.getCurrentCopies()
      .then(() => { this.stage++ })
      .catch(() => { this.statusMsg = "wystąpił błąd" });
    },
    proceedToSubmit: function (selectedCopies) {
      this.localTournament.copyIds = selectedCopies;
      this.localTournament.maxPlayers = 
      Math.min(this.localTournament.numberOfSits, this.selectedGame.game.maxPlayers * selectedCopies.length);
    },
    getTables: function () {
      return HTTP.post(`tables/available-at-tournament`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.tables = response.data.values
        }
      })
    },
    getGames: function () {
      return HTTP.post(`game_copies/available-at-tournament`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.games = response.data.values
          this.games.forEach(g => {
            g.availableCopies = g.gameCopies.length
          })
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    getCurrentTables: function () {
      let promises = []
      this.tournament.tableIds.forEach(t => {
        promises.push(this.getTableById(t))
      })
      return Promise.all(promises)
    },
    getCurrentCopies: function () {
      let promises = []
      this.tournament.copyIds.forEach(c => {
        promises.push(this.getCopyById(c))
      })
      return Promise.all(promises)
    },
    getTableById: function (tableId) {
      return HTTP.get(`tables/${tableId}`)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          if(this.tables.some(t => { return t.id === response.data.id })){
            this.currentTables.push(response.data)
          }
        }
      })
    },
    getCopyById: function (copyId) {
      return HTTP.get(`game_copies/${copyId}`)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          if(this.gameCopies.some(c => { return c.id === response.data.id })){
            this.currentCopies.push(response.data.id)
          }
        }
      })
    }
  }
}
</script>
