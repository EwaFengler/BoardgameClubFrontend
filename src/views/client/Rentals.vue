<template>
  <div>
    <router-link :to="{ name: 'rentGame'}">
      <button>Wypożycz grę</button>
    </router-link>
    <ul>
      <li v-for="rental in rentals" :key="rental.id">
        <ul>
          <li>Kiedy: {{ rental.dateObj.toLocaleString() }}</li>
          <li>Jak długo: {{ rental.duration }}min</li>
          <li>W co: {{ rental.readOnlyGameName }}</li>
          <li>
            <router-link :to="{ name: 'editRental', params: { 'rentalId':rental.id } }">
              <button>Edytuj</button>
            </router-link>
          </li>
          <li>
            <button @click="deleteRental(rental)">Zrezygnuj</button>
          </li>
        </ul>
      </li>
    </ul>
    <p>{{ statusMsg }}</p>
  </div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'rentals',
  data () {
    return {
      rentals: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`clients/${this.$route.params.clientId}/rentals`)
    .then(response => {
      if(response.data){
        if(response.data.errorMessage === null){
          this.rentals = response.data.values
          this.rentals.forEach(e => {
            e.dateObj = new Date(e.startTime)
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
    deleteRental: function (rental) {
      HTTP.delete(`private_rentals/${rental.id}`)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.rentals.splice(this.rentals.indexOf(rental), 1);
            this.statusMsg = "anulowano wypożyczenie"
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
