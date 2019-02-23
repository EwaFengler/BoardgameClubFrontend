<template>
  <div>
    <router-link :to="{ name: 'addGame'}">
      <button>Dodaj grę</button>
    </router-link>
    <ul>
      <li v-for="game in games"
        :key=" game.id">
        <ul>
          <li>Nazwa: {{ game.name }}</li>
          <li>Wydawca: {{ game.publisher }}</li>
          <li>Minimum graczy: {{ game.minPlayers }}</li>
          <li>Maksimum graczy: {{ game.maxPlayers }}</li>
          <li>Średni czas gry: {{ game.avgTime }}min</li>
          <!-- <li>{{ game.number_of_copies }}</li> -->
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
      games: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`games`)
    .then(response => {
      if(response.data){
        this.games = response.data
      }
    })
    .catch(() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    //TODO: errorMessage
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
