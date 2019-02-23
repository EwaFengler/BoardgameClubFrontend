<template>
  <div>
    <time-form
    v-if="stage===1"
    v-bind:timeObject="timeObject"
    @timeFilled="proceedToTables"
    />
    <table-form
     v-if="stage===2"
     inputType="checkbox"
     v-bind:tables="tables"
     @tablesFilled="proceedToGame"
     @goBack="stage--"/>
    <tournament-game
    v-if="stage===3"
    v-bind:games="games"
    @gamePicked="pickedGame=$event; stage++"
    @goBack="stage--"/>
    <tournament-copies
    v-if="stage===4"
    v-bind:copies="games[0].gameCopies"
    @copiesPicked="stage++"
    @goBack="stage--"/>
    <tournament-summary
    v-if="stage===5"
    v-bind:btnText="btnText"
    v-bind:tournament="tournament"
    @submit="submit"
    @goBack="stage--"/>
  </div>
</template>

<script>
import TimeForm from '@/components/TimeForm.vue'
import TournamentGame from '@/components/TournamentGame.vue'
import TableForm from '@/components/TableForm.vue'
import TournamentCopies from '@/components/TournamentCopies.vue'
import TournamentSummary from '@/components/TournamentSummary.vue'
import {HTTP} from '@/http-common';

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
      timeObject: {
        duration: 1,
        date: null,
        time: null
      },
      tables: [],
      games: [],
      pickedGame: null,
      statusMsgs: []
    }
  },
  computed: {
    startTime: function () {
      return this.timeObject.date + 'T' + this.timeObject.time
    },
    timeQuery: function () {
      return {
        startTime: this.timeObject.date + 'T' + this.timeObject.time,
        duration: this.timeObject.duration
      }
    },
    gameCopies: function () {
      return this.games.find(g => {
        return g.game.id == pickedGame
      }).gameCopies;
    }
  },
  methods: {
    proceedToTables: function () {
      this.tournament.duration = this.timeObject.duration;
      this.tournament.startTime = this.startTime;
      this.getTables();
      this.stage = 2;
    },
    proceedToGame: function () {
      this.getGames();
      this.stage = 3;
    },
    getTables: function () {
      HTTP.post(`tables/available-at`, this.timeQuery)
      .then(response => {
        if(response.data){
          this.tables = response.data
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    getGames: function () {
      HTTP.post(`game_copies/available-all`, this.timeQuery)
      .then(response => {
        if(response.data){
          this.games = response.data
          // TODO - na backendzie + sort?
          this.games.forEach(e => {
            e.availableCopies = e.gameCopies.length
          })
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    submit: function () {
      // this.$emit('submit');
    }
  }
}
</script>
