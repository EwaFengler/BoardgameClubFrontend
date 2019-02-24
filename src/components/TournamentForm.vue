<template>
  <div>
    <time-form v-if="stage===1"
    :timeObject="timeObject"
    @timeFilled="proceedToTables($event); stage++"/>
    <table-form v-if="stage===2"
    inputType="checkbox"
    v-bind:tables="tables"
    v-bind:currentTables="currentTables"
    @tablesSelected="proceedToGame($event); stage++"
    @goBack="stage--"/>
    <tournament-game v-if="stage===3"
    v-bind:games="games"
    v-bind:currentGame="currentGame"
    @gameSelected="proceedToCopies($event); stage++"
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
import TournamentGame from '@/components/TournamentGame.vue'
import TableForm from '@/components/TableForm.vue'
import TournamentCopies from '@/components/TournamentCopies.vue'
import TournamentSummary from '@/components/TournamentSummary.vue'
import {HTTP} from '@/http-common'

export default {
  name: 'tournamentForm',
  components: {
    'time-form': TimeForm,
    'tournament-game': TournamentGame,
    'table-form': TableForm,
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
        time: this.tournament.time
      },
      tables: [],
      games: [],
      selectedGame: null,
      statusMsgs: [] //TODO
    }
  },
  computed: {
    currentTables: function () {
      return this.getCurrentTables();
    },
    currentGame: function () {
      return this.getCurrentGame();
    },
    currentCopies: function () {
      return this.getCurrentCopies();
    },
    gameCopies: function () {
      let copies = this.games.find(g => { g.game.id == this.selectedGame.id }).gameCopies;
      if(this.selectedGame.id == this.tournament.gameId){
        copies = [...this.currentCopies, ...copies];
      }
      return copies;
    }
  },
  methods: {
    proceedToTables: function (timeObject) {
      this.localTournament = { ...this.localTournament, ...timeObject };
      this.timeObject = timeObject;
      this.getTables();
    },
    proceedToGame: function (selectedTables) {
      this.localTournament.numberOfSits = selectedTables.map(t => t.numberOfSits).reduce((acc, b) => acc + b);
      this.localTournament.tableIds = selectedTables.map(t => t.id);
      this.getGames();
    },
    proceedToCopies: function (selectedGame) {
      this.selectedGame = selectedGame;
      this.localTournament.gameId = selectedGame.id;
      this.localTournament.gameName = selectedGame.name;
    },
    proceedToSubmit: function (selectedCopies) {
      this.localTournament.copyIds = selectedCopies;
      this.localTournament.maxPlayers = Math.min(this.localTournament.numberOfSits,
        this.selectedGame.maxPlayers * selectedCopies.length);
    },
    getTables: function () {
      HTTP.post(`tables/available-at`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.tables = [...this.currentTables, ...response.data.values]
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    getGames: function () {
      HTTP.post(`game_copies/available-all`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.games = [this.currentGame, ...response.data.values]
          // TODO - na backendzie + sort?
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
      return [];
      //TODO : endpoint - wszystkie stoły turnieju (z miejscami)
    },
    getCurrentGame: function () {
      return null;
      //TODO : endpoint na daną grę z jej egzemplarzami
    },
    getCurrentCopies: function () {
      return [];
      //TODO : endpoint - wszystkie kopie turnieju (ew lista kopii i filtr tutaj)
    }
  }
}
</script>
