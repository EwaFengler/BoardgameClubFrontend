<template>
  <router-view v-if="validId"/>
  <p v-else>{{ errorMsg }}</p>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'client',
  data () {
    return {
      validId: false,
      errorMsg: ''
    }
  },
  watch: {
    '$route.params.clientId': function (id) {
      this.checkForId(id)
    }
  },
  mounted: function () {
    this.checkForId(this.$route.params.clientId)
  },
  methods: {
    checkForId: function (clientId) {
      HTTP.get(`clients/${clientId}/exists`)
      .then(response => {
        if(response.data){
          if(response.data.errorMessage === null && response.data.value){
              this.validId = true;
          }
          else {
            this.validId = false;
            this.errorMsg = response.data.errorMessage || "użytkownik o podanym ID nie istnieje";
          }
        }
        else {
          this.validId = false;
          this.errorMsg = "wystąpił błąd";
        }
      })
      .catch(() => {
        this.validId = false;
        this.errorMsg = "wystąpił błąd";
      })
    }
  }
}
</script>
