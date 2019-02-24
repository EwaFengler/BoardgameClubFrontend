<template>
  <div>
    <ul>
      <li>Kiedy: {{ reservation.date }}, {{ reservation.time }}</li>
      <li>Jak długo: {{ reservation.duration }}</li>
      <li>Liczba miejsc: {{ reservation.numberOfSits }}</li>
      <li>Instruktor: {{ reservation.tutorName }} {{ reservation.tutorSurname }}</li>
    </ul>
    <br><br>
    <button @click="$emit('goBack')">wstecz</button>
    <button @click="$emit('submit')">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  name: 'reservationSummary',
  props: [
    'reservation',
    'btnText'
  ]
}
</script>
