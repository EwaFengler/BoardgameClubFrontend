<template>
  <div>
    <router-link :to="{ name: 'tutors'}">
      <button>Instruktorzy</button>
    </router-link>
    <router-link :to="{ name: 'tables'}">
      <button>Stoliki</button>
    </router-link>
    <router-link :to="{ name: 'games'}">
      <button>Gry</button>
    </router-link>
    <router-link :to="{ name: 'createdTournaments'}">
      <button>Turnieje</button>
    </router-link>
    <button @click="backUp">backup klientów i instruktorów</button>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'stuff',
  data () {
    return {
      statusMsg: ''
    }
  },
  methods: {
    backUp: function () {
      return HTTP.get(`/clients/copy-persons-table`)
      .then(response => {
        this.statusMsg = "pomyślnie wykonano backup"
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
