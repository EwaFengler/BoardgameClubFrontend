import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import LogIn from './views/client/LogIn.vue'
import Register from './views/client/Register.vue'
import AccountRemoved from './views/client/AccountRemoved.vue'

import Client from './views/client/Client.vue'
import ClientHome from './views/client/ClientHome.vue'
import AccountSettings from './views/client/AccountSettings.vue'
import Tournaments from './views/client/Tournaments.vue'
import TournamentSignUp from './views/client/TournamentSignUp.vue'
import Reservations from './views/client/Reservations.vue'
import AddReservation from './views/client/AddReservation.vue'
import EditReservation from './views/client/EditReservation.vue'
import Rentals from './views/client/Rentals.vue'
import RentGame from './views/client/RentGame.vue'
import EditRental from './views/client/EditRental.vue'

import Stuff from './views/stuff/Stuff.vue'
import Tutors from './views/stuff/Tutors.vue'
import AddTutor from './views/stuff/AddTutor.vue'
import EditTutor from './views/stuff/EditTutor.vue'
import Tables from './views/stuff/Tables.vue'
import AddTable from './views/stuff/AddTable.vue'
import Games from './views/stuff/Games.vue'
import AddGame from './views/stuff/AddGame.vue'
import EditGame from './views/stuff/EditGame.vue'
import CreatedTournaments from './views/stuff/Tournaments.vue'
import AddTournament from './views/stuff/AddTournament.vue'
import EditTournament from './views/stuff/EditTournament.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/log-in',
      name: 'logIn',
      component: LogIn
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/account-removed',
      name: 'accountRemoved',
      component: AccountRemoved
    },
    {
      path: '/client/:clientId',
      component: Client,
      children: [
        {
          path: '',
          name: 'clentHome',
          component: ClientHome
        },
        {
          path: 'account-settings',
          name: 'accountSettings',
          component: AccountSettings
        },
        {
          path: 'tournaments',
          name: 'tournaments',
          component: Tournaments
        },
        {
          path: 'tournaments/new',
          name: 'tournamentSignUp',
          component: TournamentSignUp
        },
        {
          path: 'reservations',
          name: 'reservations',
          component: Reservations
        },
        {
          path: 'reservations/new',
          name: 'addReservation',
          component: AddReservation
        },
        {
          path: 'reservations/edit/:reservationId',
          name: 'editReservation',
          component: EditReservation
        },
        {
          path: 'rentals',
          name: 'rentals',
          component: Rentals
        },
        {
          path: 'rentals/new',
          name: 'rentGame',
          component: RentGame
        },
        {
          path: 'rentals/edit/:rentalId',
          name: 'editRental',
          component: EditRental
        }
      ]
    },
    {
      path: '/secret',
      name: 'secret',
      component: Stuff
    },
    {
      path: '/secret/tutors',
      name: 'tutors',
      component: Tutors
    },
    {
      path: '/secret/tutors/new',
      name: 'addTutor',
      component: AddTutor
    },
    {
      path: '/secret/tutors/:tutorId',
      name: 'editTutor',
      component: EditTutor
    },
    {
      path: '/secret/tables',
      name: 'tables',
      component: Tables
    },
    {
      path: '/secret/tables/new',
      name: 'AddTable',
      component: AddTable
    },
    {
      path: '/secret/games',
      name: 'games',
      component: Games
    },
    {
      path: '/secret/games/new',
      name: 'addGame',
      component: AddGame
    },
    {
      path: '/secret/games/:gameId',
      name: 'editGame',
      component: EditGame
    },
    {
      path: '/secret/torunaments',
      name: 'createdTournaments',
      component: CreatedTournaments
    },
    {
      path: '/secret/torunaments/:tournamentId',
      name: 'editTournament',
      component: EditTournament
    },
    {
      path: '/secret/torunaments/new',
      name: 'addTournament',
      component: AddTournament
    }
  ]
})
