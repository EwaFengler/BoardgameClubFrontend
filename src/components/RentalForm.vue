<template>
  <div>
    <time-form v-if="stage===1"
    :timeObject="timeObject"
    @timeFilled="proceedToGame($event)"/>
    <game-select-form v-if="stage===2"
    v-bind:games="games"
    v-bind:currentGame="currentGameId"
    @gameSelected="proceedToSubmit($event); stage++"
    @goBack="stage--"/>
    <rental-summary v-if="stage===3"
    :rental="localRental"
    :btnText="btnText"
    @submit="$emit('submit', localRental); stage = 1"
    @goBack="stage--"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import TimeForm from '@/components/TimeForm.vue'
import GameSelectForm from '@/components/GameSelectForm.vue'
import RentalSummary from '@/components/RentalSummary.vue'
import {HTTP} from '@/http-common'

export default {
  name: 'rentalForm',
  props: [
    'rental',
    'btnText'
  ],
  components: {
    'time-form': TimeForm,
    'game-select-form': GameSelectForm,
    'rental-summary': RentalSummary
  },
  data () {
    return {
      stage: 1,
      localRental: {
        ...this.rental
      },
      timeObject: {
        duration: this.rental.duration,
        date: this.rental.date,
        time: this.rental.time,
        targetId: this.rental.id
      },
      currentGameId: null,
      games: [],
      statusMsg: ''
    }
  },
  methods: {
    proceedToGame: function (timeObject) {
      this.localRental = { ...this.localRental, ...timeObject };
      this.timeObject = timeObject;
      this.getGames()
      .then(()  => { return this.getCurrentGameId() })
      .then(()  => { this.stage++ })
      .catch(() => { this.statusMsg = "wystąpił błąd" });
    },
    proceedToSubmit: function (selectedGameId) {
      this.localRental.gameId = selectedGameId;
      this.localRental.gameName = this.games.find(g => {
        return g.game.id == selectedGameId
      }).game.name;
    },
    getGames: function () {
      return HTTP.post(`game_copies/available-at-private`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.games = response.data.values
          this.games.forEach(g => {
            g.availableCopies = g.gameCopies.length
          })
        }
      })
    },
    getCurrentGameId: async function () {
      if(this.rental.copyId === null) {
        this.currentGameId = null;
        return;
      }
      return HTTP.get(`game_copies/${this.rental.copyId}`)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          if(this.games.filter(g => g.availableCopies > 0 ).some(g => g.game.id === response.data.gameId)){
            this.currentGameId = response.data.gameId
          }
          else {
            this.currentGameId = null
          }
        }
      })
    }
  }
}
</script>
