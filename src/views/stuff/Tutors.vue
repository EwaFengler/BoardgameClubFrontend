<template>
  <div>
    <router-link :to="{ name: 'addTutor'}">
      <button>Dodaj instruktora</button>
    </router-link>
    <ul>
      <li v-for="tutor in tutors" :key="tutor.id">
        <ul>
          <li>{{ tutor.name }}</li>
          <li>{{ tutor.surname }}</li>
          <li>{{ tutor.email }}</li>
          <li>{{ tutor.phoneNumber }}</li>
          <li>
          <router-link :to="{ name: 'editTutor', params: {'tutorId': tutor.id}}">
            <button>Edytuj</button>
          </router-link>
          </li>
          <li><button @click="deleteTutor(tutor)">Usuń</button></li>
        </ul>
      </li>
    </ul>
    <p v-if="statusMsg">{{ statusMsg }}</p>
  </div>
</template>

<script>
import {HTTP} from '@/http-common';

export default {
  name: 'tutors',
  data () {
    return {
      tutors: [],
      statusMsg: ''
    }
  },
  mounted: function () {
    HTTP.get(`tutors`)
    .then(response => {
      if(response.data){
        this.tutors = response.data
      }
    })
    .catch(() => {
      this.statusMsg = "wystąpił błąd"
    })
  },
  methods: {
    deleteTutor: function (tutor) {
      // TODO: po dodaniu informacji o błędzie:
      // - odkomentowanie ifa
      // - dostosowanie nazwy zmiennej jeżeli to nie jest "errorMessage"
      // - jeżeli nie działa dla czegoś, co powoduje błąd - np. już usuniętego instruktora,
      // zakomentować ifa, w miejscu ifa wyświetlić response w konsoli przeglądarki:
      // console.log(response)
      // i odpowiednio zmienić nazwę zmiennej lub naprawić backend.
      HTTP.delete(`tutors/${tutor.id}`)
      .then(response => {
        // if(response.data){
        //   if(response.data.errorMessage !== ""){
            this.tutors.splice(this.tutors.indexOf(tutor), 1);
            this.statusMsg = "pomyślnie usunięto instruktora";
        //   }
        //   else {
        //     this.statusMsg = response.data.errorMessage
        //   }
        // }
      })
      .catch(() => {
        this.statusMsg = "wystąpił błąd"
      })
    }
  }
}
</script>
