<template>
  <form v-on:submit.prevent="onSubmitButtonClicked">
    <time-form
    v-if="stage===1"
    v-bind:timeObject="timeObject"
    @timeFilled="proceedToTables"/>
    <table-form
    v-if="stage===2"
    inputType="radio"
    v-bind:tables="tables"
    @tablesFilled="proceedToSubmit($event)"
    @goBack="stage--"/>
    <div v-if="stage===3">
      <li>Kiedy: {{ reservation.date }}, {{ reservation.time }}</li>
      <li>Jak długo: {{ reservation.duration }}</li>
      <li>Liczba miejsc: {{ reservation.numberOfSits }}</li>
      <br><br>
      <button @click="stage--">wstecz</button>
      <input type="submit" :value="btnText">
    </div>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </form>
</template>

<script>
import TimeForm from '@/components/TimeForm.vue'
import TableForm from '@/components/TableForm.vue'
import {HTTP} from '@/http-common';

export default {
  name: 'reservationForm',
  components: {
    'time-form': TimeForm,
    'table-form': TableForm
  },
  props: [
    'reservation',
    'btnText'
  ],
  data () {
    return {
      stage: 1,
      timeObject: {
        duration: this.reservation.duration,
        date: this.reservation.date,
        time: this.reservation.time
      },
      tables: [],
      statusMsg: ''
    }
  },
  methods: {
    proceedToTables: function () {
      this.reservation = { ...this.reservation, ...this.timeObject };
      this.getTables();
      this.stage = 2;
    },
    proceedToSubmit: function (pickedTable) {
      this.reservation.numberOfSits = pickedTable.numberOfSits;
      this.reservation.tableId = pickedTable.id;
      this.stage = 3;
    },
    getTables: function () {
      //TODO: errorMessage
      HTTP.post(`tables/available-at`, this.timeObject)
      .then(response => {
        if(response.data){
          this.tables = response.data
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    onSubmitButtonClicked: function () {
      this.stage = 1;
      this.$emit('submit', this.reservation);
    }
  }
}
</script>
