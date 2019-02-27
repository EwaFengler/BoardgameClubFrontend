<template>
  <div>
    <time-form v-if="stage===1"
    :timeObject="timeObject"
    @timeFilled="proceedToTables($event)"/>
    <table-form v-if="stage===2"
    inputType="radio"
    v-bind:tables="tables"
    v-bind:currentTables="currentTable"
    @tablesSelected="proceedToTutor($event)"
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
        time: this.reservation.time,
        targetId:  this.reservation.id
      },
      currentTable: null,
      currentTutor: null,
      tables: [],
      tutors: [],
      statusMsg: ''
    }
  },
  methods: {
    proceedToTables: function (timeObject) {
      this.localReservation = { ...this.localReservation, ...timeObject };
      this.timeObject = timeObject;
      this.getTables()
      .then(()  => { return this.getCurrentTable() })
      .then(()  => { this.stage++ })
      .catch(e => { this.statusMsg = e });
    },
    proceedToTutor: function (pickedTable) {
      this.localReservation.numberOfSits = pickedTable.numberOfSits;
      this.localReservation.tableId = pickedTable.id;
      this.getTutors()
      .then(()  => { return this.getCurrentTutor() })
      .then(()  => { this.stage++ })
      .catch(e => { this.statusMsg = e });
    },
    proceedToSubmit: function (pickedTutor) {
      this.localReservation.tutorId = pickedTutor.id;
      this.localReservation.tutorName = pickedTutor.name;
      this.localReservation.tutorSurname = pickedTutor.surname;
    },
    getTables: function () {
      return HTTP.post(`tables/available-at-private`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.tables = response.data.values
        }
      })
    },
    getTutors: function () {
      return HTTP.post(`private_reservations/available-tutors-at-reservation`, this.timeObject)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          this.tutors = response.data.values
        }
      })
    },
    getCurrentTable: async function () {
      if(this.reservation.tableId === null){
        this.currentTable = null;
        return;
      }
      return HTTP.get(`tables/${this.reservation.tableId}`)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          if(this.tables.some(t => { return t.id === response.data.id })){
            this.currentTable = response.data
          }
          else {
            this.currentTable = null
          }
        }
      })
    },
    getCurrentTutor: async function () {
      if(this.reservation.tutorId === null){
        this.currentTutor = null;
        return;
      }
      return HTTP.get(`tutors/${this.reservation.tutorId}`)
      .then(response => {
        if(response.data && response.data.errorMessage === null){
          if(this.tutors.some(t => { return t.id === response.data.id })){
            this.currentTutor = response.data
          }
          else {
            this.currentTutor = null
          }
        }
      })
    },
  }
}
</script>
