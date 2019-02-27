<template>
  <div>
    <ul>
      <li v-for="copy in copies" :key="copy.id">
        <ul> ID egzemplarza: {{ copy.id }} </ul>
        <button @click="deleteCopy(copy)">usuń</button>
      </li>
    </ul>
    <button @click="addCopy">dodaj egzemplarz</button>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'gameCopies',
  data () {
    return {
      copies: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    this.getCopies();
  },
  methods: {
    getCopies:function () {
      HTTP.get(`game_copies/all-by-game-id/${this.$route.params.gameId}`)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.copies = response.data.values;
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
    addCopy: function () {
      HTTP.post(`game_copies`, { gameId: this.$route.params.gameId })
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.copies.push(response.data);
            this.statusMsg = "dodano egzemplarz";
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
    deleteCopy: function (copy) {
      HTTP.delete(`game_copies/${copy.id}`)
      .then(() => {
        this.copies.splice(this.copies.indexOf(copy), 1);
        this.statusMsg = "usunięto egzemplarz";
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
