<template>
  <div>
    <rental-form
    v-bind:rental="rental"
    btnText="Wypożycz grę"
    @submit="addRental"/>
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
      rental: { // TODO - razie potrzeby dostosować pola
        clientId: this.$route.params.clientId,
        copyId: null,
        duration: 1,
        date: null,
        time: null,
        rentalTime: ''
      },
      statusMsg: ''
    }
  },
  methods: {
    addRental: function () {
      // TODO: po dodaniu informacji o błędzie:
      // - odkomentowanie ifa
      // - dostosowanie nazwy zmiennej jeżeli to nie jest "errorMessage"
      // - jeżeli nie działa dla czegoś, co powoduje błąd - np. dla próby wypożyczenia niedostępnego egzemplarza
      // zakomentować ifa, w miejscu ifa wyświetlić response w konsoli przeglądarki:
      // console.log(response)
      // i odpowiednio zmienić nazwę zmiennej lub naprawić backend.
      // INFO: nie dało się sprawdzić endpointa
      HTTP.post(`private_rentals`, this.rental)
      .then(response => {
        // if(response.data){
        //   if (response.data.errorMessage) {
            this.statusMsg = "pomyślnie wypożyczono grę"
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
