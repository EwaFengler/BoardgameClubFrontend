<template>
  <div>
    <rental-form
    v-bind:rental="rental"
    btnText="Zapisz"
    @submit="updateRental($event)"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import RentalForm from '@/components/RentalForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'editRental',
  components: {
    'rental-form': RentalForm
  },
  data () {
    return {
      rental: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`private_rentals/${this.$route.params.rentalId}`)
    .then(response => {
      if(response.data){ //TODO errorMessage
        this.rental = response.data;
      }
    })
    .catch(() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    updateRental: function (rental) {
      // TODO: errorMessage
      HTTP.put(`private_rentals`, rental)
      .then(() => {
      this.statusMsg = "zmieniono ustawienia wypożyczenia"
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
