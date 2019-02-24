<template>
  <div>
    <router-link :to="{ name: 'addReservation'}">
      <button>Zarezerwuj stolik</button>
    </router-link>
    <ul v-if="!loadingData">
      <li v-for="r in reservations" :key="r.privateReservation.id">
        <ul>
          <li>Kiedy: {{ r.dateObj.toLocaleString() }}</li>
          <li>Jak długo: {{ r.privateReservation.duration }}min</li>
          <li>Liczba miejsc: {{ r.numberOfSits }}</li>
          <li>Instruktor: {{ r.tutor.name }} {{ r.tutor.surname }}</li>
          <li>
            <router-link :to="{ name: 'editReservation', params: { 'reservationId': r.privateReservation.id } }">
              <button>Edytuj</button>
            </router-link>
          </li>
          <li>
            <button @click="cancelReservation(r)">Zrezygnuj</button>
          </li>
        </ul>
      </li>
    </ul>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'reservations',
  data () {
    return {
      loadingData: true,
      reservations: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    this.getReservations()
    .then(() => {
      let promises = []
      this.reservations.forEach(r => {
        r.dateObj = new Date(r.privateReservation.startTime)
        promises.push(this.assignTutor(r))
      })
      return Promise.all(promises)
    })
    .then(() => { this.loadingData = false })
  },
  methods: {
    getReservations: function (){
      return HTTP.get(`clients/${this.$route.params.clientId}/reservations`)
      .then(response => {
        if(response.data) {
          if(response.data.errorMessage === null){
            this.reservations = response.data.values
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
    cancelReservation: function (reservation) {
      HTTP.delete(`private_reservations/${reservation.privateReservation.id}`)
      .then(() => {
        this.reservations.splice(this.reservations.indexOf(reservation), 1);
        this.statusMsg = "anulowano rezerwację"
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    assignTutor: async function (reservation) {
      if(reservation.privateReservation.tutorId === null){
        reservation.tutor =  { name: "brak", surname: "instruktora" }
        return;
      }
      return HTTP.get(`tutors/${reservation.privateReservation.tutorId}`)
      .then(response => {
        if(response.data && response.data.errorMessage === null) {
          reservation.tutor = response.data
        }
      })
    }
  },
}
</script>
