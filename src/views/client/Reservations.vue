<template>
  <div>
    <router-link :to="{ name: 'addReservation'}">
      <button>Zarezerwuj stolik</button>
    </router-link>
    <ul>
      <li v-for="r in reservations" :key="r.privateReservation.id">
        <ul>
          <li>Kiedy: {{ r.dateObj.toLocaleString() }}</li>
          <li>Jak długo: {{ r.privateReservation.duration }}</li>
          <li>Liczba miejsc: {{ r.numberOfSits }}</li>
          <li v-if="r.privateReservation.tutor === null">Brak instruktora</li>
          <li v-else>Instruktor: {{ r.tutor.name }} {{ r.tutor.surname }}</li>
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
      reservations: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`clients/${this.$route.params.clientId}/reservations`)
    .then(response => {
      if(response.data) {
        if(response.data.errorMessage === null){
          this.reservations = response.data.values
          this.reservations.forEach(r => {
            r.dateObj = new Date(r.privateReservation.startTime)
            this.reservation.tutor = this.reservation.tutorId ? this.getTutorById(this.reservation.tutorId) : null
        })
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
methods: {
  cancelReservation: function (reservation) {
    HTTP.delete(`private_reservations/${reservation.privateReservation.id}`)
    .then(() => {
      this.reservations.splice(this.reservations.indexOf(reservation), 1);
      this.statusMsg = "anulowano rezerwację"
    })
    .catch(() => {
      this.statusMsg = "wystąpił błąd"
    })
  }
},
getTutorById: function (tutorId) {
  HTTP.get(`tutors/${tutorId}/`)
  .then(response => {
    if(response.data && response.data.errorMessage) {
      return response.data
    }
    return null
  })
  .catch(() => {
    this.statusMsg = "wystąpił błąd przy ładowaniu instruktorów"
    return null
  })
}
}
</script>
