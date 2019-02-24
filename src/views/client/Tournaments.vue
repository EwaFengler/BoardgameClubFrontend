<template>
  <div>
    <router-link :to="{ name: 'tournamentSignUp'}">
      <button>Zapisz się na turniej</button>
    </router-link>
    <ul>
      <li v-for="tnmnt in tournaments"
      :key="tnmnt.tournamentDTO.id">
      <ul>
        <li>Kiedy: {{ tnmnt.dateObj.toLocaleString() }}</li>
        <li>Jak długo: {{ tnmnt.tournamentDTO.duration }}min</li>
        <li>W co: {{ tnmnt.gameName }}</li>
        <li>
          <button @click="leaveTournament(tnmnt)">Zrezygnuj</button>
        </li>
      </ul>
    </li>
  </ul>
  <p v-if="statusMsg">{{ statusMsg }}</p>
</div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'tournaments',
  data () {
    return {
      tournaments: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`clients/${this.$route.params.clientId}/participated-tournaments`)
    .then(response => {
      if(response.data){
        if(response.data.errorMessage === null){
          this.tournaments = response.data.values
          this.tournaments.forEach(t => {
            t.dateObj = new Date(t.tournamentDTO.startTime)
          })
        }
        else {
          this.statusMsg = response.data.errorMessage
        }
      }
    })
    .catch (() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    leaveTournament: function (tnmnt) {
      HTTP.delete(`tournament_participants/${this.$route.params.clientId}/${tnmnt.tournamentDTO.id}`)
      .then (() => {
        this.tournaments.splice(this.tournaments.indexOf(tnmnt), 1);
        this.statusMsg = "zrezygnowano z uczestnictwa w turnieju"
      })
      .catch (() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
