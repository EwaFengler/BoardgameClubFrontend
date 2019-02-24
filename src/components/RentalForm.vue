<template>
  <div>
    <time-form v-if="stage===1"
    :timeObject="timeObject"
    @timeFilled="proceedToGame($event); stage++"/>
    <game-form v-if="stage===2"
    v-bind:games="games"
    @gameSelected="proceedToSubmit($event); stage++"
    @goBack="stage--"/>
    <!-- <rental-summary v-if="stage===3"
    :rental="localRental"
    :btnText="btnText"
    @submit="$emit('submit', localRental); stage = 1"
    @goBack="stage--"/> -->
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import TimeForm from '@/components/TimeForm.vue'
import TournamentGame from '@/components/TournamentGame.vue'
import {HTTP} from '@/http-common'

export default {
  name: 'rentalForm',
  props: [
    'rental',
    'btnText'
  ],
  components: {
    'time-form': TimeForm,
    // 'game-form': GameForm,
    'game-form': TournamentGame,
    // 'rental-summary': RentalSummary
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
        time: this.rental.time
      },
      games: [],
      statusMsg: ''
    }
  },

  methods: {
    proceedToGame: function (timeObject) {
      this.localRental = { ...this.localRental, ...timeObject };
      this.timeObject = timeObject;
      this.getGames();
    },
    getGames: function () {
      HTTP.post(`game_copies/available-all`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.games = response.data.values
          // this.games.forEach(g => {
          //   g.availableCopies = g.gameCopies.length
          // })
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
