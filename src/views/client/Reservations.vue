<template>
  <div>
    <router-link :to="{ name: 'addReservation'}">
      <button>Zarezerwuj stolik</button>
    </router-link>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.id">
        <ul>
          <li>{{ reservation.reservationTime }}</li>
          <li>{{ reservation.duration }}</li>
          <li>{{ reservation.numberOfSits }}</li>
          <li v-if="reservation.tutor === null">
            <button>Zamów instruktora</button>
          </li>
          <li v-else>Instruktor: {{ reservation.tutor }} <button>Zrezygnuj</button></li>
          <li>
            <router-link :to="{ name: 'editReservation', params: { 'reservationId': reservation.id } }">
              <button>Edytuj</button>
            </router-link>
          </li>
          <li>
            <button @click="cancelReservation(reservation)">Zrezygnuj</button>
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
    // HTTP.get(`clients/${this.$route.params.clientId}/reservations`)
    // .then(response => {
    //   if(response.data) {
        // this.reservations = response.data
        this.reservations = [
          {
            id: 1,
            reservationTime: "le timestamp",
            duration: 120,
            numberOfSits: 4,
            tutorId: null
          },
          {
            id: 2,
            reservationTime: "le timestamp",
            duration: 90,
            numberOfSits: 3,
            tutorId: 1
          }
        ]
    //   }
    // })
    // .catch(e => {
    //   this.statusMsg = e // TODO - ludzki błąd
    // })
  },
  methods: {
    cancelReservation: function (reservation) {
      // HTTP.delete(`private_reservations/${reservation.id}`) //TODO
      // .then(() => {
      this.reservations.splice(this.reservations.indexOf(reservation), 1);
      this.statusMsg = "anulowano rezerwację"
      // })
      // .catch(e => {
      //   this.statusMsg = e // TODO - ludzki błąd
      // })
    }
  }
}
</script>
