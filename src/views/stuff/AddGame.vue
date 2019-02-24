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
        avgTime: 10,
        description: ''
      },
      statusMsg: ''
    }
  },
  methods: {
    addGame: function () {
      //TODO: error errorMessage
      HTTP.post(`games`, this.game)
      .then(() => {
        this.statusMsg = "pomyślnie dodano grę";
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
