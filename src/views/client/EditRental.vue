<template>
  <div>
    <rental-form
    v-if="!loadingData"
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
      loadingData: true,
      rental: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    this.getRental().then(() => { this.loadingData = false });
  },
  methods: {
    getRental: function () {
      return HTTP.get(`private_rentals/${this.$route.params.rentalId}`)
      .then(response => {
        if(response.data) {
          this.rental = response.data;
          this.rental.date = this.rental.startTime.substr(0, 10);
          this.rental.time = this.rental.startTime.substr(11, 5);
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    updateRental: function (rental) {
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
