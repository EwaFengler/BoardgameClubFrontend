<template>
  <form v-on:submit.prevent="onSubmitButtonClicked">
    Nazwa:<br>
    <input type="text" v-model="game.name">
    <br>
    Wydawca:<br>
    <input type="text" v-model="game.publisher">
    <br>
    Minimum graczy:<br>
    <input type="number" min="1" v-model.number="game.minPlayers">
    <br>
    Maksimum graczy:<br>
    <input type="number" min="1" v-model.number="game.maxPlayers">
    <br>
    Średni czas gry:<br>
    <input type="number" min="1"  v-model.number="game.avgTime"> min
    <br>
    Opis (opcjonalny):<br>
    <textarea name="description" rows="4" cols="50" v-model="game.description"></textarea>
    <br><br>
    <input type="submit" :value="btnText">
    <p v-for="statusMsg in statusMsgs">{{ statusMsg }}</p>
  </form>
</template>

<script>

export default {
  name: 'gameForm',
  props: [
    'game',
    'btnText'
  ],
  data () {
    return {
      statusMsgs: []
    }
  },
  methods: {
    onSubmitButtonClicked: function () {
      this.statusMsgs = [];
      if(this.game.name === ""){
        this.statusMsgs.push("nazwa gry nie może być pusta");
      }
      if(this.game.publisher === ""){
        this.statusMsgs.push("nazwa wydawcy nie może być pusta");
      }
      if(this.game.minPlayers <= 0 || this.game.maxPlayers <= 0){
        this.statusMsgs.push("liczba graczy musi być dodatnia");
      }
      if(this.game.minPlayers > this.game.maxPlayers){
        this.statusMsgs.push("minimalna liczba graczy musi być mniejsza od maksymalnej liczby graczy");
      }
      if(this.statusMsgs.length === 0){
        this.$emit('submit');
      }
    }
  }
}
</script>
