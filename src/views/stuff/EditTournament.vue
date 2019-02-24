<template>
  <div>
    <tournament-form
    v-if="!loadingData"
    :tournament="tournament"
    btnText="Zapisz"
    @submit="updateTournament($event)"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import TournamentForm from '@/components/TournamentForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'editTournament',
  components: {
    'tournament-form': TournamentForm
  },
  data () {
    return {
      loadingData: true,
      tournament: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    this.getTournament().then(() => { this.loadingData = false });
  },
  methods: {
    getTournament: function () { // TODO: get też ids!
      return HTTP.get(`tournaments/${this.$route.params.tournamentId}`)
      .then(response => {
        if(response.data){
          this.tournament = response.data;
          this.tournament.dateObj = new Date(this.tournament.startTime);
          this.tournament.date = this.tournament.dateObj.toISOString().substr(0, 10);
          this.tournament.time = this.tournament.dateObj.toISOString().substr(11, 5);
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    updateTournament: function (tournament) {
      // TODO: errorMessage
      HTTP.put(`tournaments`, tournament)
      .then(() => {
        this.statusMsg = "zapisano turniej"
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
      let removedReservations = this.getDiff(this.tournament.tableIds, tournament.tableIds);
      let addedReservations = this.getDiff(tournament.tableIds, this.tournament.tableIds);
      let removedRentals = this.getDiff(this.tournament.copyIds, tournament.copyIds);
      let addedRentals = this.getDiff(tournament.copyIds, this.tournament.copyIds);
    }, //TODO: dodanie, odjęcie
    addReservation: function (tournamentId, tableId) {

    },
    removeReservation: function (tournamentId, tableId) {

    },
    addRental: function (tournamentId, copyId) {

    },
    removeRental: function (tournamentId, copyId) {

    },
    getDiff: function (arr1, arr2) {
      return arr1.filter(x => !arr2.includes(x));
    }
  }
}
</script>
