<template>
  <div>
    <div v-for="game in games" :key="game.game.id" v-if="game.availableCopies">
      <input type="radio" name="game"
      :value="game.game.id"
      v-model="selectedGame">
      <ul>
        <li>Nazwa: {{ game.game.name }}</li>
        <li>Wydawca: {{ game.game.publisher }}</li>
        <li>Minimum graczy: {{ game.game.minPlayers }}</li>
        <li>Średni czas gry: {{ game.game.avgTime }}min</li>
        <li>Maksimum graczy: {{ game.game.maxPlayers }}</li>
        <li v-if="game.game.description !== ''">
          Opis: {{ game.game.description }}
        </li>
        <li>Dostępnych egzemplarzy: {{ game.availableCopies }}</li>
      </ul>
    </div>
    <br><br>
    <button @click="$emit('goBack')">wstecz</button>
    <button @click="proceed">dalej</button>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>

export default {
  name: 'gameSelectForm',
  props: [
    'games',
    'currentGame'
  ],
  data () {
    return {
      selectedGame: this.currentGame,
      statusMsg: ""
    }
  },
  methods: {
    proceed: function () {
      if(this.selectedGame === null){
        this.statusMsg = "wybierz grę";
      }
      else {
        this.statusMsg = "";
        this.$emit('gameSelected', this.selectedGame);
      }
    }
  }
}
</script>
