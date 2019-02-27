<template>
  <div>
    <router-link :to="{ name: 'addGame'}">
      <button>Dodaj grę</button>
    </router-link>
    <ul v-if="!loadingData">
      <li v-for="game in games"
      :key=" game.id">
      <ul>
        <li>Nazwa: {{ game.name }}</li>
        <li>Wydawca: {{ game.publisher }}</li>
        <li>Minimum graczy: {{ game.minPlayers }}</li>
        <li>Maksimum graczy: {{ game.maxPlayers }}</li>
        <li>Średni czas gry: {{ game.avgTime }}min</li>
        <li>Liczba egzemplarzy: {{ game.numberOfCopies }}
          <router-link :to="{ name: 'gameCopies', params: {'gameId': game.id}}">
            <button>egzemplarze</button>
          </router-link>
        </li>
        <li v-if="game.description !== ''">
          Opis: {{ game.description }}
        </li>
        <li>
          <router-link :to="{ name: 'editGame', params: {'gameId': game.id}}">
            <button>Edytuj</button>
          </router-link>
        </li>
        <li><button @click="deleteGame(game)">Usuń</button></li>
      </ul>
    </li>
  </ul>
  <p v-if="statusMsg">{{ statusMsg }}</p>
</div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'games',
  data () {
    return {
      loadingData: true,
      games: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    this.getGames()
    .then(() => {
      let promises = []
      this.games.forEach(g => {
        promises.push(this.assignNoOfCopies(g))
      })
      return Promise.all(promises)
    })
    .catch(() => { this.statusMsg = "wystąpił błąd" })
    .then(() => { this.loadingData = false });
  },
  methods: {
    getGames: function () {
      return HTTP.get(`games`)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.games = response.data.values
          }
          else {
            this.statusMsg = response.data.errorMessage
          }
        }
      })
    },
    assignNoOfCopies: function (game) {
      return HTTP.get(`game_copies/count/${game.id}`)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            game.numberOfCopies = response.data.value
          }
          else {
            this.statusMsg = response.data.errorMessage
          }
        }
      })
    },
    deleteGame: function (game) {
      HTTP.delete(`games/${game.id}`)
      .then(() => {
        this.games.splice(this.games.indexOf(game), 1);
        this.statusMsg = "pomyślnie usunięto grę";
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
