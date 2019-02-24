<template>
  <div>
    <rental-form
    v-bind:rental="rental"
    btnText="Wypożycz grę"
    @submit="addRental($event)"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import RentalForm from '@/components/RentalForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'rentGame',
  components: {
    'rental-form': RentalForm
  },
  data () {
    return {
      rental: {
        clientId: this.$route.params.clientId,
        startTime: null,
        duration: 60,
        date: null,
        time: null,
        copyId: null
      },
      statusMsg: ''
    }
  },
  methods: {
    addRental: function (rental) {
      HTTP.post(`private_rentals`, rental)
      .then(response => {
        if(response.data){
          if (response.data.errorMessage === null) {
            this.statusMsg = "pomyślnie wypożyczono grę"
          }
          else {
            this.statusMsg = response.data.errorMessage
          }
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
