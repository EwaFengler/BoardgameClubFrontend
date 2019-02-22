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
        if(response.data === true){
          this.validId = true;
        }
        else {
          this.validId = false;
          this.errorMsg = "użytkownik o podanym ID nie istnieje";
        }
      })
      .catch(e => {
        this.validId = false;
        this.errorMsg = e;
      })
    }
  }
}
</script>
