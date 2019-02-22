<template>
  <div>
    <router-link :to="{ name: 'accountSettings'}">
      <button>Ustawienia konta</button>
    </router-link>
    <router-link :to="{ name: 'tournaments'}">
      <button>Turnieje</button>
    </router-link>
    <router-link :to="{ name: 'reservations'}">
      <button>Rezerwacje</button>
    </router-link>
    <router-link :to="{ name: 'rentals'}">
      <button>Wypożyczenia</button>
    </router-link>
  </div>
</template>

<script> 
export default {
  name: 'clientHome'
}
</script>
