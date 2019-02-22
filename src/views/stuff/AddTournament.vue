<template>
  <div>
    <tournament-form
    v-bind:tournament='tournament'
    btnText="Dodaj turniej"
    @submit="addTournament"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import TournamentForm from '@/components/TournamentForm.vue';

export default {
  name: 'addTournament',
  components: {
    'tournament-form': TournamentForm
  },
  data () {
    return {
      tournament: {
        gameId: null,
        duration: 10,
        date: null,
        time: null,
        startTime: null,
        tableIds: [],
        copyIds: []
      },
      statusMsg: ''
    }
  },
  methods: {
    addTournament: function () {
      this.statusMsg = "dodano turniej"
    }
  }
}
</script>
