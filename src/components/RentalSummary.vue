<template>
  <div>
    <ul>
      <li>Kiedy: {{ rental.date }}, {{ rental.time }}</li>
      <li>Jak długo: {{ rental.duration }}min</li>
      <li>W co: {{ rental.gameName }}</li>
    </ul>
    <br><br>
    <button @click="$emit('goBack')">wstecz</button>
    <button @click="$emit('submit')">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  name: 'rentalSummary',
  props: [
    'rental',
    'btnText'
  ]
}
</script>
