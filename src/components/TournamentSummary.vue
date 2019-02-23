<template>
  <div>
    <li>Kiedy: {{ tournament.dateObj.toLocaleString() }}</li>
    <li>Jak długo: {{ tournament.duration }}min</li>
    <li>W co: {{ tournament.readOnlyGameName }}</li>
    <li>Maksymalna liczba graczy: {{ tournament.maxPlayers }}</li>
    <br><br>
    <button @click="$emit('goBack')">wstecz</button>
    <button @click="$emit('submit')">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  name: 'tournamentSummary',
  props: [
    'tournament',
    'btnText'
  ]
}
</script>
