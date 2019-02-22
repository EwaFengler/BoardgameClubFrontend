<template>
  <form v-on:submit.prevent="onSubmitButtonClicked">
    Data:<br>
    <input type="date" v-model="rental.date">
    <br>
    Godzina:<br>
    <input type="time" v-model="rental.time">
    <br>
    Czas trwania:<br>
    <input type="time" min="1" v-model="rental.duration">
    <br>
    Gra:<br>
    <select name="game" @click="getCopies">
      <option value="Dixit">Dixit</option>
      <option value="Tajniacy">Tajniacy</option>
    </select>
    <br><br>
    <input type="submit" :value="btnText">
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </form>
</template>

<script>
export default {
  name: 'rentalForm',
  props: [
    'rental',
    'btnText'
  ],
  data () {
    return {
      statusMsg: ''
    }
  },

  methods: {
    onSubmitButtonClicked: function () {
      this.$emit('submit');
    },
    getCopies: function () {

    }
  }
}
</script>
