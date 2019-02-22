<template>
  <form v-on:submit.prevent="createTable">
    Liczba miejsc:<br>
    <input type="number" min="1" v-model.number="table.numberOfSits">
    <br><br>
    <input type="submit" value="Dodaj">
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </form>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'addTable',
  data () {
    return {
      table: {
        numberOfSits: 1
      },
      statusMsg: ''
    }
  },
  methods: {
    createTable: function () {
      if(!Number.isInteger(this.table.numberOfSits)){
        this.statusMsg = "liczba miejsc powinna być liczbą"
      }
      else if(this.table.numberOfSits <= 0){
        this.statusMsg = "liczba miejsc powinna być większa od zera"
      }
      else {
        HTTP.post(`tables`, this.table)
        .then(() => {
          this.statusMsg = "pomyślnie dodano stolik"
        })
        .catch(e => {
          this.statusMsg = "wystąpił błąd"
        })
      }
    }
  }
}
</script>
