<template>
  <div>
    <reservation-form
    v-bind:reservation="reservation"
    btnText="Zapisz"
    @submit="udpateReservation"/>
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
      reservation: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`private_reservations/${this.$route.params.reservationId}`)
    .then(response => {
      if(response.data){
        this.reservation = response.data;
        console.log(this.reservation);
        this.reservation.date = this.reservation.startTime.substr(0, 10);
        this.reservation.time = this.reservation.startTime.substr(11, 5);
      }
    })
    .catch(() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    udpateReservation: function () {
      // TODO: errorMessage
      HTTP.put(`private_reservations`, this.reservation)
      .then(() => {
        this.statusMsg = "pomyślnie zmieniono rezerwację";
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
