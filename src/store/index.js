import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'
import models from './models'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    models: models,
    projects: models.projects,
    tasks: models.tasks,
    users: models.users,
    invites: models.invites
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
