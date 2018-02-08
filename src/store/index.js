import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import * as actions from './actions'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'
import models from './models'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
var url = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
    http: axios.create({
      baseURL: url
    }),
    username: 'admin',
    password: 'adminadmin',
    token: null,
    models: models,
    projects: [],
    tasks: models.tasks,
    users: models.users,
    invites: [],
    message: ''
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
      state.http.defaults.headers.Authorization = 'Token ' + token
    },
    addProject: (state, project) => {
      alert(JSON.stringify(project))
      state.projects.push(project)
    },
    accept: (state, invite) => {
      //
      console.log(state.models)
      alert(state.models.test)
      alert(JSON.stringify({
        id: invite.id,
        project_id: invite.project.id
      }))
    }
  },
  actions: {
    async getToken (context) {
      var response = await context.state.http.post('api-token-auth/', {
        username: context.state.username,
        password: context.state.password
      })
      context.commit('setToken', response.data.token)
    },
    async refreshIndex (context) {
      if (!context.state.token) { await context.dispatch('getToken') }

      context.state.http.get('main')
        .then(response => {
          context.state.projects = response.data.subs
          context.state.invites = response.data.invites
          console.log(response.data)
          // context.commit('updateIndex', response.data.message)
          // resolve()
        })
        .catch(e => {
          alert(e)
        })
    }
  }
  // actions,
  /*
   * modules: {
   *   cart,
   *   products
   * },
   */
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
