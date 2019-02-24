<template>
  <div>
    <tournament-form
    :tournament="tournament"
    btnText="Dodaj turniej"
    @submit="addTournament($event)"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import TournamentForm from '@/components/TournamentForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'addTournament',
  components: {
    'tournament-form': TournamentForm
  },
  data () {
    return {
      tournament: {
        gameId: null,
        startTime: null,
        duration: 60,
        date: null,
        time: null,
        tableIds: [],
        copyIds: []
      },
      statusMsg: ''
    }
  },
  methods: {
    addTournament: function (tournament) {
      HTTP.post(`tournaments`, tournament)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null){
            this.statusMsg = "dodano turniej"
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
