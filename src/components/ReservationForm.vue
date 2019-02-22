<template>
  <form v-on:submit.prevent="onSubmitButtonClicked">
    Data:<br>
    <input type="date" v-model="reservation.date">
    <br>
    Godzina:<br>
    <input type="time" v-model="reservation.time">
    <br>
    Czas trwania:<br>
    <input type="number" min="1" v-model="reservation.duration">min
    <br><br>
    <div v-if="tables.length">
      <div v-for="table in tables" :key="table.table_id">
        <input type="radio" name="table" :value="key">
        liczba miejsc: {{ table.number_of_sits }}
      </div>
      <br>
      <input type="submit" :value="btnText">
    </div>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </form>
</template>

<script>
import {HTTP} from '@/http-common';
import { debounce } from "lodash";

export default {
  name: 'reservationForm',
  props: [
    'reservation',
    'btnText'
  ],
  data () {
    return {
      tables: [],
      statusMsg: ''
    }
  },
  watch: {
    reservation: function () {
      this.debouncedGetTables()
    }
  },
  created: function () {
    this.debouncedGetTables = debounce(this.getTables, 500)
  },
  methods: {
    onSubmitButtonClicked: function () {
      if(this.reservation.tableId === null){
        this.statusMsg = "wybierz stolik"
      }
      else {
        this.$emit('submit');
      }
    },
    getTables: function () {
      this.reservation.tableId = null // TODO TODO TODO
      if(this.reservation.date !== "" && this.reservation.time !== ""){
        let reservationTime = this.reservation.date + 'T' + this.reservation.time;

        // HTTP.post(`tables/available-at`)
        // .then(response => {
        //   if(response.data){
            this.tables = [
              {
                table_id: 1,
                number_of_sits: 4
              },
              {
                table_id: 2,
                number_of_sits: 2
              }
            ]
            if(this.tables === []){
              this.statusMsg = "brak stolików w podanym terminie"
            }
        //   }
        // })
        // .catch(e => {
        //   this.statusMsg = e
        // })
      }
    }
  }
}
</script>
