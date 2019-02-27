<template>
  <div>
    <div v-for="table in tables" :key="table.id">
      <input :type="inputType" name="table"
      :value="table"
      v-model="selectedTables">
      Liczba miejsc: {{ table.numberOfSits }}
    </div>
    <br><br>
    <button @click="$emit('goBack')">wstecz</button>
    <button @click="proceed">dalej</button>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'tableForm',
  props: [
    'inputType',
    'tables',
    'currentTables'
  ],
  data () {
    return {
      selectedTables: this.currentTables,
      statusMsg: ''
    }
  },
  methods: {
    proceed: function () {
      if(this.selectedTables === null || this.selectedTables.length === 0){
        this.statusMsg = "wybierz stolik(i)";
      }
      else {
        this.statusMsg = "";
        this.$emit('tablesSelected', this.selectedTables);
      }
    }
  }
}
</script>
