<template>
  <div>
    <ul>
      <li>Kiedy: {{ tournament.date }}, {{ tournament.time }}</li>
      <li>Jak długo: {{ tournament.duration }}min</li>
      <li>W co: {{ tournament.readOnlyGameName }}</li>
      <li>Maksymalna liczba graczy: {{ tournament.maxPlayers }}</li>
    </ul>
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
