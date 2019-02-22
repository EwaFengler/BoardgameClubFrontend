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
          <!-- TODO: po dodaniu nazwy gry do wypożyczeń odkomentować, w razie potrzeby dostosować -->
          <!-- <li>W co: {{ rental.gameName }}</li> -->
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
    // INFO: W momencie pisania endpoint nie działał
    // HTTP.get(`clients/${this.$route.params.clientId}/rentals`)
    // .then(response => {
    //   if(response.data){
        // TODO: odkomentować faktyczne przypisanie, usunąć mocka
        // this.rentals = response.data
        /* usuwanie - początek */
        this.rentals = [
          {
            id: 1,
            copyId: 1,
            duration: 120,
            rentalTime: "2019-02-21T04:35:09.712Z"
          },
          {
            id: 2,
            copyId: 2,
            duration: 60,
            rentalTime: "2019-02-22T04:35:09.712Z"
          }
        ]
        /* usuwanie - koniec */
        this.rentals.forEach(e => {
          e.dateObj = new Date(e.rentalTime)
        })
    //   }
    // })
    // .catch(() => {
    //   this.statusMsg = "wystąpił błąd"
    // })
  },
  methods: {
    deleteRental: function (rental) {
      // TODO: po dodaniu informacji o błędzie:
      // - odkomentowanie ifa
      // - dostosowanie nazwy zmiennej jeżeli to nie jest "errorMessage"
      // - jeżeli nie działa dla czegoś, co powoduje błąd - np. ponowna próba rezygnacji z wypożyczenia,
      // zakomentować ifa, w miejscu ifa wyświetlić response w konsoli przeglądarki:
      // console.log(response)
      // i odpowiednio zmienić nazwę zmiennej lub naprawić backend.
      // INFO: nie dało się sprawdzić endpointa
      HTTP.delete(`private_rentals/${rental.id}`)
      .then(response => {
        // if(response.data){
        //   if(response.data.errorMessage == ""){
            this.rentals.splice(this.rentals.indexOf(rental), 1);
            this.statusMsg = "anulowano wypożyczenie"
        //   }
        //   else {
        //     this.statusMsg = response.data.errorMessage
        //   }
        // }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
