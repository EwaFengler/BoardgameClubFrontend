<template>
  <div>
    <reservation-form
    v-if="!loadingData"
    :reservation="reservation"
    btnText="Zapisz"
    @submit="updateReservation($event)"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import ReservationForm from '@/components/ReservationForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'editReservation',
  components: {
    'reservation-form': ReservationForm
  },
  data () {
    return {
      loadingData: true,
      reservation: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    this.getReservation().then(() => { this.loadingData = false });
  },
  methods: {
    getReservation: function () {
      return HTTP.get(`private_reservations/${this.$route.params.reservationId}`)
      .then(response => {
        if (response.data) {
          if (response.data.errorMessage === null) {
            this.reservation = response.data;
            this.reservation.date = this.reservation.startTime.substr(0, 10);
            this.reservation.time = this.reservation.startTime.substr(11, 5);
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
    updateReservation: function (reservation) {
      // TODO: errorMessage
      HTTP.put(`private_reservations`, reservation)
      .then(() => {
        this.statusMsg = "pomyślnie zmieniono rezerwację"
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
