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
        this.tournaments = response.data
        this.tournaments.forEach((e) => {
          e.dateObj = new Date(e.tournamentDTO.startTime)
        })
      }
    })
    .catch (() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    leaveTournament: function (tnmnt) {
      // TODO: po dodaniu informacji o błędzie:
      // - odkomentowanie ifa
      // - dostosowanie nazwy zmiennej jeżeli to nie jest "errorMessage"
      // - jeżeli nie działa dla czegoś, co powoduje błąd - np. już usuniętego uczestnictwa,
      // zakomentować ifa, w miejscu ifa wyświetlić response w konsoli przeglądarki:
      // console.log(response)
      // i odpowiednio zmienić nazwę zmiennej lub naprawić backend.
      HTTP.delete(`tournament_participants/${this.$route.params.clientId}/${tnmnt.tournamentDTO.id}`)
      .then (response => {
        // if (response.data) {
        //   if(response.data.errorMessage == ""){
            this.tournaments.splice(this.tournaments.indexOf(tnmnt), 1);
            this.statusMsg = "zrezygnowano z uczestnictwa w turnieju"
        //   }
        //   else {
        //     this.statusMsg = response.data.errorMessage
        //   }
        // }
      })
      .catch (() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
