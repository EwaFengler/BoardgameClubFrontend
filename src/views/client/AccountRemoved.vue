<template>
  <div>
    <p>Pomyślnie usunięto konto</p>
    <router-link :to="{ name: 'home'}">
      <p>Wróć do strony głównej</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'accountRemoved'
}
</script>
