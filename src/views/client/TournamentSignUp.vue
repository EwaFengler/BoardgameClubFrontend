<template>
  <form v-on:submit.prevent="onSubmitButtonClicked">
    <div v-for="tnmnt in tournaments"
    :key="tnmnt.tournamentDTO.id">
    <input type="radio" :value="tnmnt.tournamentDTO.id" v-model.number="entry.tournamentId">
    <ul>
      <li>Kiedy: {{ tnmnt.dateObj.toLocaleString() }}</li>
      <li>Jak długo: {{ tnmnt.tournamentDTO.duration }}min</li>
      <li>W co: {{ tnmnt.gameName }}</li>
    </ul>
  </div>
  <br>
  <input type="submit" value="Zapisz mnie!">
  <p v-if="statusMsg">{{ statusMsg }}</p>
</form>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'tournamentSignUp',
  data () {
    return {
      tournaments: [],
      entry: {
        "clientId": this.$route.params.clientId,
        "tournamentId": null
      },
      statusMsg: ''
    }
  },
  mounted: function () {
    this.getAvailableTournaments(this.$route.params.clientId)
  },
  methods: {
    onSubmitButtonClicked: function () {
      if (this.entry.tournamentId !== null) {
        // TODO: po dodaniu informacji o błędzie:
        // - odkomentowanie ifa
        // - dostosowanie nazwy zmiennej jeżeli to nie jest "errorMessage"
        // - jeżeli nie działa dla czegoś, co powoduje błąd - np. próba dołączenia do usuniętego turnieju,
        // zakomentować ifa, w miejscu ifa wyświetlić response w konsoli przeglądarki:
        // console.log(response)
        // i odpowiednio zmienić nazwę zmiennej lub naprawić backend.
        // INFO: w momencie pisania endpoint nie działał. Zakładam, że wejście to post ze strukturą {clientId, tournamentId}
        HTTP.post(`tournament_participants`, this.entry)
        .then(response => {
          // if (response.data) {
          //   if(response.data.errorMessage != ""){
              this.entry.tournamentId = null;
              this.getAvailableTournaments(this.$route.params.clientId);
              this.statusMsg = "pomyślnie zapisano się na turniej";
          //   }
          // }
        })
        .catch(() => {
          this.statusMsg = "wystąpił błąd"
        })
      }
      else {
        this.statusMsg = "Wybierz turniej"
      }
    },
    getAvailableTournaments: function (clientId) {
      HTTP.get(`clients/${clientId}/available-tournaments`)
      .then(response => {
        if(response.data){
          this.tournaments = response.data
          this.tournaments.forEach(e => {
            e.dateObj = new Date(e.tournamentDTO.startTime)
          })
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
