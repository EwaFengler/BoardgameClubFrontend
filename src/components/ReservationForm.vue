<template>
  <div>
    <time-form v-if="stage===1"
    :timeObject="timeObject"
    @timeFilled="proceedToTables($event); stage++"/>
    <table-form v-if="stage===2"
    inputType="radio"
    v-bind:tables="tables"
    v-bind:currentTables="currentTable"
    @tablesSelected="proceedToTutor($event); stage++"
    @goBack="stage--"/>
    <tutor-form v-if="stage===3"
    v-bind:tutors="tutors"
    v-bind:currentTutor="currentTutor"
    @tutorSelected="proceedToSubmit($event); stage++"
    @goBack="stage--"/>
    <reservation-summary v-if="stage===4"
    :reservation="localReservation"
    :btnText="btnText"
    @submit="$emit('submit', localReservation); stage = 1"
    @goBack="stage--"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import TimeForm from '@/components/TimeForm.vue'
import TableForm from '@/components/TableForm.vue'
import TutorForm from '@/components/TutorForm.vue'
import ReservationSummary from '@/components/ReservationSummary.vue'
import {HTTP} from '@/http-common';

export default {
  name: 'reservationForm',
  components: {
    'time-form': TimeForm,
    'table-form': TableForm,
    'tutor-form': TutorForm,
    'reservation-summary': ReservationSummary
  },
  props: [
    'reservation',
    'btnText'
  ],
  data () {
    return {
      stage: 1,
      localReservation: {
        ...this.reservation
      },
      timeObject: {
        duration: this.reservation.duration,
        date: this.reservation.date,
        time: this.reservation.time
      },
      tables: [],
      tutors: [],
      statusMsg: ''
    }
  },
  computed: {
    currentTable: function () {
      return this.reservation.tableId ? this.getCurrentTable() : null;
    },
    currentTutor: function () {
      return this.reservation.tutorId ? this.getCurrentTutor() : null;
    }
  },
  methods: {
    proceedToTables: function (timeObject) {
      this.localReservation = { ...this.localReservation, ...timeObject };
      this.timeObject = timeObject;
      this.getTables();
    },
    proceedToTutor: function (pickedTable) {
      this.localReservation.numberOfSits = pickedTable.numberOfSits;
      this.localReservation.tableId = pickedTable.id;
      this.getTutors();
    },
    proceedToSubmit: function (pickedTutor) {
      this.localReservation.tutorId = pickedTutor.id;
      this.localReservation.tutorName = pickedTutor.name;
      this.localReservation.tutorSurname = pickedTutor.surname;
    },
    getTables: function () {
      HTTP.post(`tables/available-at`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.tables = response.data.values
          if(this.currentTable) {
            this.tables = [this.currentTable, ...this.tables]
          }
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    getTutors: function () {
      HTTP.post(`private_reservations/available-tutors-at`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.tutors = response.data.values
        }
      })
      .catch(response => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    getCurrentTable: function () {
      HTTP.get(`tables/${this.reservation.tableId}`)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.currentTable = response.data
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    },
    getCurrentTutor: function () {
      HTTP.get(`tutors/${this.reservation.tutorId}`)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.currentTutor = response.data
        }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
