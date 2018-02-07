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

export default new Vuex.Store({
  state: {
    http: null,
    url: 'http://localhost/',
    username: 'admin',
    password: 'adminadmin',
    token: null,
    models: models,
    projects: models.projects,
    tasks: models.tasks,
    users: models.users,
    invites: models.invites,
    message: ''
  },
  mutations: {
    createHTTP (state, url) {
      state.url = url
      state.http = axios.create({
        baseUrl: url
        /**
         * headers: {
         *   Authorization: 'Bearer {token}'
         * }
         */
      })
    },
    updateIndex (state, payload) {
      state.message = payload
    }
  },
  actions: {
    auth: (context) => {
      if (!context.state.http) {
        context.commit('createHTTP', 'http://localhost:8000/')
      }

      context.state.http.post(context.state.url + 'api/api-token-auth/', {
        username: context.state.username,
        password: context.state.password
      })
        .then(response => {
          context.state.token = response.data.token
          alert(JSON.stringify(response))
          console.log(context.state)
          // context.commit('updateIndex', response.data.message)
          // resolve()
        })
        .catch(e => {
          alert(e)
        })
    },
    refreshIndex: (context) => {
      //
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
