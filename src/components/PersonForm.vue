<template>
  <form v-on:submit.prevent="onSubmitButtonClicked">
    Imię:<br>
    <input type="text" name="name" v-model="person.name">
    <br>
    Nazwisko:<br>
    <input type="text" name="surname" v-model="person.surname">
    <br>
    Email:<br>
    <input type="email" name="email" v-model="person.email">
    <br>
    Numer telefonu:<br>
    <input type="text" name="phoneNumber" v-model="person.phoneNumber">
    <br><br>
    <input type="submit" :value="btnText">
    <p v-for="statusMsg in statusMsgs">{{ statusMsg }}</p>
  </form>
</template>

<script>
export default {
  name: 'personForm',
  props: [
    'person',
    'btnText'
  ],
  data () {
    return {
      statusMsgs: []
    }
  },
  methods: {
    onSubmitButtonClicked: function () {
      this.statusMsgs = [];
      if(this.person.name === ""){
        this.statusMsgs.push("imię nie może być puste");
      }
      if(this.person.surname === ""){
        this.statusMsgs.push("nazwisko nie może być puste");
      }
      if(this.person.email === ""){ //TODO lepsza walidacja maila
        this.statusMsgs.push("email nie może być pusty");
      }
      if(this.person.phoneNumber === ""){
        this.statusMsgs.push("numer telefonu nie może być pusty");
      }
      if(!/^\d*$/.test(this.person.phoneNumber)){
        this.statusMsgs.push("numer telefonu powinien zawierać tylko cyfry");
      }
      if(this.statusMsgs.length === 0){
        this.$emit('submit');
      }
    }
  }
}
</script>
