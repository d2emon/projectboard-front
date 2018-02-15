import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import * as actions from './actions'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'
import models from './models'

import menu from './menu'
import messages from './messages'
import notifications from './notifications'
import server from './server'
// import tasks from './tasks'

Vue.use(Vuex)

function percent2color (percent) {
  if (percent > 75) return 'success'
  if (percent > 50) return 'info'
  if (percent > 25) return 'warning'
  return 'danger'
}

// const debug = process.env.NODE_ENV !== 'production'
var url = 'http://localhost:8000'

export default new Vuex.Store({
  state: {
    http: axios.create({
      baseURL: url + '/api'
    }),

    serverUrl: url,

    user: {
      avatar: 'https://www.gravatar.com/avatar/?d=robohash&f=y',
      email: 'admin@bootstrapmaster.com'
    },

    username: 'admin',
    password: 'adminadmin',
    token: null,

    models: models,
    projects: [],
    // tasks: models.tasks,
    users: models.users,
    invites: [],
    message: '',

    menu: menu,
    messages: messages.messages,
    notifications: notifications.notifications,
    server: server.server,
    tasks: [] // tasks
  },
  getters: {
    percent2color: (state) => (percent) => {
      if (percent > 75) return 'success'
      if (percent > 50) return 'info'
      if (percent > 25) return 'warning'
      return 'danger'
    },
    userMenu: state => {
      console.log([
        state.notifications,
        state.messages,
        state.notifications.length,
        state.messages.length,
        state.tasks.length,
        10
      ])
      return [
        { header: 'Учетная запись' },
        { icon: 'fa fa-bell-o', title: 'Обновления', variant: 'info', count: state.notifications.length },
        { icon: 'fa fa-envelope-o', title: 'Сообщения', variant: 'success', count: state.messages.length },
        { icon: 'fa fa-tasks', title: 'Заданчи', variant: 'danger', count: state.tasks.length },
        { icon: 'fa fa-comments', title: 'Комментарии', variant: 'warning', count: 10 },
        { header: 'Настройки' },
        { icon: 'fa fa-user', title: 'Профиль' },
        { icon: 'fa fa-wrench', title: 'Настройки' },
        { icon: 'fa fa-usd', title: 'Платежи', variant: 'secondary', count: 5 },
        { icon: 'fa fa-file', title: 'Проекты', variant: 'primary', count: state.projects.length, to: '/dashboard' },
        { divider: true },
        { icon: 'fa fa-shield', title: 'Заблокировать' },
        { icon: 'fa fa-lock', title: 'Выйти' }
      ]
    }
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
    },
    clearTasks: state => {
      state.tasks = []
    },
    addTask: (state, task) => {
      state.tasks.push({
        title: task.name,
        progress: task.progress,
        color: percent2color(task.progress) // percent2color(progress)
        // color: this.getters.percent2color(task.progress) // percent2color(progress)
      })
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
          context.commit('clearTasks')
          response.data.tasks.forEach(task => {
            // console.log(context.getters.percent2color)
            // console.log(context.getters.percent2color(task.progress))
            // console.log(percent2color)
            // console.log(percent2color(task.progress))
            context.commit(
              'addTask',
              task,
              percent2color(task.progress)
            )
          })

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
