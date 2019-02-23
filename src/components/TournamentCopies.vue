<template>
  <div>
    <div v-for="copy in copies" :key="copy.id">
      <input type="checkbox" name="copy"
      :value="copy.id"
      v-model="checkedCopies">
      ID egzemplarza: {{ copy.id }}
    </div>
    <br><br>
    <button @click="$emit('goBack')">wstecz</button>
    <button @click="proceed">dalej</button>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'tournamentCopies',
  props: [
    'copies'
  ],
  data () {
    return {
      checkedCopies: [],
      statusMsg: ""
    }
  },
  methods: {
    proceed: function () {
      if(this.checkedCopies.length === 0){
        this.statusMsg = "wybierz egzemplarz(e)";
      }
      else {
        this.statusMsg = "";
        this.$emit('copiesPicked');
      }
    }
  }
}
</script>
