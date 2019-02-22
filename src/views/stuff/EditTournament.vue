<template>
  <div>
    <tournament-form
    v-bind:tournament='tournament'
    btnText="Zapisz"
    @submit="updateTournament"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import TournamentForm from '@/components/TournamentForm.vue';
import {HTTP} from '@/http-common';

export default {
  name: 'editTournament',
  components: {
    'tournament-form': TournamentForm
  },
  data () {
    return {
      tournament: {},
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`tournaments/${this.$route.params.tournamentId}`)
    .then(response => {
      if(response.data){
        this.tournament = response.data;
        this.tournament.dateObj = new Date(this.tournament.startTime);
        this.tournament.date = this.tournament.dateObj.toISOString().substr(0, 10);
        this.tournament.time = this.tournament.dateObj.toISOString().substr(11, 5);
      }
    })
    .catch(e => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    updateTournament: function () {
      this.statusMsg = "zapisano turniej"
    }
  }
}
</script>