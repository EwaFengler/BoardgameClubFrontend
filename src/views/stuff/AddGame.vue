<template>
  <div>
    <game-form
    v-bind:game="game"
    btnText="Dodaj grę"
    @submit="addGame"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import GameForm from '@/components/GameForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'addGame',
  components: {
    'game-form': GameForm
  },
  data () {
    return {
      game: {
        name: '',
        publisher: '',
        minPlayers: 1,
        maxPlayers: 1,
        avgTime: 60,
        description: ''
      },
      statusMsg: ''
    }
  },
  methods: {
    addGame: function () {
      HTTP.post(`games`, this.game)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.statusMsg = "pomyślnie dodano grę";
          }
          else {
            this.statusMsg = response.data.errorMessage
          }
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
