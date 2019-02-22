<template>
  <div>
    <rental-form
    btnText="Zapisz"
    @submit="updateRental"/>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import RentalForm from '@/components/RentalForm.vue';

export default {
  name: 'editRental',
  components: {
    'rental-form': RentalForm
  },
  data () {
    return {
      statusMsg: ''
    }
  },
  methods: {
    updateRental: function () {
      this.statusMsg = "zmieniono ustawienia wypożyczenia"
    }
  }
}
</script>
