<template>
  <div>
    <person-form
    v-bind:person="client"
    btnText="Zapisz"
    @submit="updateAccount"/>
    <button @click="deleteAccount">Usuń konto</button>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import PersonForm from '@/components/PersonForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'accountSettings',
  components: {
    'person-form': PersonForm
  },
  data () {
    return {
      client: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    // TODO: po dodaniu informacji o błędzie:
    // - odkomentowanie ifa (pacz niżej)
    HTTP.get(`clients/${this.$route.params.clientId}`)
    .then(response => {
      if (response.data) {
        // if (response.data.errorMessage == "") {
          this.client = response.data;
        // }
        // else {
        //   this.errorMsg = response.data.errorMessage
        // }
      }
    })
    .catch(() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    updateAccount: function () {
      // TODO: po dodaniu informacji o błędzie:
      // - odkomentowanie ifa
      // - dostosowanie nazwy zmiennej jeżeli to nie jest "errorMessage"
      // - jeżeli nie działa dla czegoś, co powoduje błąd - np. nieunikatowego emaila,
      // zakomentować ifa, w miejscu ifa wyświetlić response w konsoli przeglądarki:
      // console.log(response)
      // i odpowiednio zmienić nazwę zmiennej lub naprawić backend.
      HTTP.put(`clients`, this.client)
      .then(response => {
        if (response.data) {
          // if (response.data.errorMessage == "") {
            this.statusMsg = "Pomyślnie zmieniono ustawienia"
          // }
          // else {
          //   this.errorMsg = response.data.errorMessage
          // }
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    deleteAccount: function () {
      HTTP.delete(`clients/${this.$route.params.clientId}`)
      .then(response => {
        // TODO: po dodaniu informacji o błędzie:
        // - odkomentować j/w
        // - przykładowy błąd: konto już zostało usunięte
        // if (response.data) {
          // if (response.data.errorMessage == "") {
            this.$router.push({ path: `/account-removed` })
          // }
          // else {
          //   this.errorMsg = response.data.errorMessage
          // }
        // }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
