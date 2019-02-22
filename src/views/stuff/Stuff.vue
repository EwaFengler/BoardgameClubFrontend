<template>
  <div>
    <router-link :to="{ name: 'tutors'}">
      <button>Instruktorzy</button>
    </router-link>
    <router-link :to="{ name: 'tables'}">
      <button>Stoliki</button>
    </router-link>
    <router-link :to="{ name: 'games'}">
      <button>Gry</button>
    </router-link>
    <router-link :to="{ name: 'createdTournaments'}">
      <button>Turnieje</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'stuff'
}
</script>
