<template>
  <div>
    <router-link :to="{ name: 'AddTable'}">
      <button>Dodaj stolik</button>
    </router-link>
    <ul>
      <li v-for="table in tables"
        :key="table.table_id">
        <ul>
          <li>Liczba miejsc: {{ table.numberOfSits }}</li>
          <li><button @click="deleteTable(table)">Usuń</button></li>
        </ul>
      </li>
    </ul>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'tables',
  data () {
    return {
      tables: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`tables`)
    .then(response => {
      if(response.data){
        this.tables = response.data
      }
    })
    .catch(e => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    deleteTable: function (table) {
      // TODO: errorMessage
      HTTP.delete(`tables/${table.id}`)
      .then(() => {
        this.tables.splice(this.tables.indexOf(table), 1);
        this.statusMsg = "pomyślnie usunięto stolik";
      })
      .catch(e => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
