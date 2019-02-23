<template>
  <div>
    <reservation-form
      v-bind:reservation="reservation"
      btnText="Rezerwuj stolik"
      @submit="addReservation($event)"/>
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
        startTime: '',
        duration: 1,
        date: null,
        time: null,
        tableId: null
      },
      statusMsg: ''
    }
  },
  methods: {
    addReservation: function (reservation) {
      // TODO: errorMessage
      HTTP.post(`private_reservations`, reservation)
      .then(() => {
        this.statusMsg = "zarezerwowano stolik"
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
