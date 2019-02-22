<template>
  <div>
    <reservation-form
      v-bind:reservation="reservation"
      btnText="Rezerwuj stolik"
      @submit="addReservation"/>
      <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import ReservationForm from '@/components/ReservationForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'addReservation',
  components: {
    'reservation-form': ReservationForm
  },
  data () {
    return {
      reservation: {
        clientId: this.$route.params.clientId,
        duration: 1,
        date: null,
        time: null,
        reservationTime: '',
        tableId: null
      },
      statusMsg: ''
    }
  },
  methods: {
    addReservation: function () {
      HTTP.post(`private_reservations`, this.reservation)
      .then(() => {
        this.statusMsg = "zarezerwowano stolik"
      })
      .catch(e => {
        this.statusMsg = e // TODO - ludzki błąd
      })
    }
  }
}
</script>
