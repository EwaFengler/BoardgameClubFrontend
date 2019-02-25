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
      tournamentReservations: {},
      tournamentRentals: {},
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

      this.updateTournamentBase(tournament)
      .then(() => { return this.getTournamentReservations(tournament) })
      .then(() => { return this.getTournamentRentals(tournament) })
      .then(() => {
        let promises = [];
        addedReservations.forEach(ar => {
          promises.push(this.addReservation(tournament.id, ar))
        })
        addedRentals.forEach(ar => {
          promises.push(this.addRental(tournament.id, ar))
        })
        this.tournamentReservations.filter(tr => {
          return removedReservations.includes(tr.tableId)
        }).forEach(rr => {
          promises.push(this.removeReservation(rr.id))
        })
        this.tournamentRentals.filter(tr => {
          return removedRentals.includes(tr.copyId)
        }).forEach(rr => {
          promises.push(this.removeRental(rr.id))
        })
        return Promise.all(promises)
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    updateTournamentBase: function (tournament) {
      return HTTP.put(`tournaments`, tournament)
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
    },
    getTournamentReservations: function (tournament) {
      return HTTP.get(`tournament_reservations/all-by-tournament-id/${tournament.id}`)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.tournamentReservations = response.data.values
          }
          else {
            this.statusMsg = response.data.errorMessage
          }
        }
      })
    },
    getTournamentRentals: function (tournament) {
      return HTTP.get(`tournament_rentals/all-by-tournament-id/${tournament.id}`)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.tournamentRentals = response.data.values
          }
          else {
            this.statusMsg = response.data.errorMessage
          }
        }
      })
    },
    addReservation: function (tournamentId, tableId) {
      return HTTP.post(`tournament_reservations`, {tournamentId: tournamentId, tableId: tableId})
    },
    addRental: function (tournamentId, copyId) {
      return HTTP.post(`tournament_rentals`, {tournamentId: tournamentId, copyId: copyId})
    },
    removeReservation: function (reservationId) {
      return HTTP.delete(`tournament_reservations/${reservationId}`)
    },
    removeRental: function (rentalId) {
      return HTTP.delete(`tournament_rentals/${rentalId}`)
    },
    getDiff: function (arr1, arr2) {
      return arr1.filter(x => !arr2.includes(x));
    }
  }
}
</script>
