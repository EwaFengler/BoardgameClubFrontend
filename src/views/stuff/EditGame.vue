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
        if(response.data.errorMessage === null){
          this.game = response.data;
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
    updateGame: function () {
      HTTP.put(`games`, this.game)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.statusMsg = "pomyślnie zmieniono dane gry"
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
