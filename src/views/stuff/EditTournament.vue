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
    getTournament: function () {
      return HTTP.get(`tournaments/${this.$route.params.tournamentId}`)
      .then(response => {
        if(response.data){
          this.tournament = response.data;
          this.tournament.date = this.tournament.startTime.substr(0, 10);
          this.tournament.time = this.tournament.startTime.substr(11, 5);
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    updateTournament: function (tournament) {
      let removedReservations = this.getDiff(this.tournament.tableIds, tournament.tableIds);
      let addedReservations = this.getDiff(tournament.tableIds, this.tournament.tableIds);
      let removedRentals = this.getDiff(this.tournament.copyIds, tournament.copyIds);
      let addedRentals = this.getDiff(tournament.copyIds, this.tournament.copyIds);

      HTTP.put(`tournaments`, tournament)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.statusMsg = "zapisano turniej"
          }
          else {
            this.statusMsg = response.data.errorMessage
          }
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })

    },
    addReservation: function (tournamentId, tableId) {
      HTTP.post(`tournament_reservations`, {tournamentId: tournamentId, tableId: tableId})
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    removeReservation: function (tournamentId, tableId) {
      HTTP.delete(`tournament_reservations`, {tournamentId: tournamentId, tableId: tableId})
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    addRental: function (tournamentId, copyId) {
      HTTP.post(`tournament_rentals`, {tournamentId: tournamentId, copyId: copyId})
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    removeRental: function (tournamentId, copyId) {
      HTTP.delete(`tournament_rentals`, {tournamentId: tournamentId, copyId: copyId})
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    getDiff: function (arr1, arr2) {
      return arr1.filter(x => !arr2.includes(x));
    }
  }
}
</script>
