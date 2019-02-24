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
    HTTP.get(`clients/${this.$route.params.clientId}`)
    .then(response => {
      if (response.data) {
        if (response.data.errorMessage === null) {
          this.client = response.data;
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
    updateAccount: function () {
      HTTP.put(`clients`, this.client)
      .then(response => {
        if (response.data) {
          if (response.data.errorMessage === null) {
            this.statusMsg = "Pomyślnie zmieniono ustawienia"
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
    deleteAccount: function () {
      HTTP.delete(`clients/${this.$route.params.clientId}`)
      .then(() => {
        this.$router.push({ path: `/account-removed` })
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
