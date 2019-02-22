<template>
  <div>
    <game-form
    v-bind:game="game"
    btnText="Zapisz"
    @submit="updateGame"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import GameForm from '@/components/GameForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'editGame',
  components: {
    'game-form': GameForm
  },
  data () {
    return {
      game: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`games/${this.$route.params.gameId}`)
    .then(response => {
      if(response.data){
        this.game = response.data;
      }
    })
    .catch(e => {
      this.statusMsg = e // TODO - ludzki błąd
    })
  },
  methods: {
    updateGame: function () {
      HTTP.put(`games`, this.game)
      .then(() => {
        this.statusMsg = "pomyślnie zmieniono dane gry"
      })
      .catch(e => {
        this.statusMsg = e // TODO - ludzki błąd
      })
    }
  }
}
</script>
