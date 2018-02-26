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

import gravatar from 'gravatar'

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
    gravatarSettings: {
      d: 'robohash'
    },

    user: null,

    username: 'admin',
    password: 'adminadmin',
    token: null,

    project: null,

    models: models,
    projects: [],
    tasks: [],
    users: [],
    invites: [],
    message: '',

    menu: menu,
    messages: messages.messages,
    notifications: notifications.notifications,
    server: server.server
  },
  getters: {
    fromServer: (state) => (uri) => {
      if (!uri) return false
      return state.serverUrl + uri
    },
    userAvatar: (state) => (user) => {
      if (!user) return gravatar.url('', state.gravatarSettings)
      if (user.avatar) return state.serverUrl + user.avatar
      return gravatar.url(user.email, state.gravatarSettings)
    },
    percent2color: (state) => (percent) => {
      if (percent > 75) return 'success'
      if (percent > 50) return 'info'
      if (percent > 25) return 'warning'
      return 'danger'
    },
    userMenu: state => {
      /*
      console.log([
        state.notifications,
        state.messages,
        state.notifications.length,
        state.messages.length,
        state.tasks.length,
        10
      ])
      */
      return [
        { header: 'Учетная запись' },
        { icon: 'fa fa-bell-o', title: 'Обновления', variant: 'info', count: state.notifications.length },
        { icon: 'fa fa-envelope-o', title: 'Сообщения', variant: 'success', count: state.messages.length },
        { icon: 'fa fa-tasks', title: 'Задачи', variant: 'danger', count: state.tasks.length },
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
    setUser: (state, user) => {
      if (!user) return
      // if (!user.profile) user.profile = { avatar: null }
      // if (!user.profile.avatar) user.profile.avatar = 'https://www.gravatar.com/avatar/?d=robohash&f=y'
      state.user = user
    },
    setProject: (state, project) => {
      if (!project) return
      state.project = project
    },
    clearProjects: state => {
      state.projects = []
    },
    setProjects: (state, projects) => {
      if (!projects) return
      state.projects = projects
    },
    addProject: (state, project) => {
      state.projects.push(project)
    },
    setInvites: (state, invites) => {
      if (!invites) return
      state.invites = invites
    },
    clearUsers: state => {
      state.users = []
    },
    setUsers: (state, users) => {
      if (!users) return
      var usernames = [
        'Yiorgos Avraamu',
        'Avram Tarasios',
        'Quintin Ed',
        'Enéas Kwadwo',
        'Agapetus Tadeáš',
        'Friderik Dávid'
      ]
      var dates = [
        '',
        'Jan 1, 2015',
        '10 sec ago',
        '5 minutes ago',
        '1 hour ago',
        'Last month',
        'Last week',
        'Last week'
      ]
      var statuses = [
        '',
        'success',
        'danger',
        'warning'
      ]
      var countries = [
        { name: 'USA', flag: 'us' },
        { name: 'Brazil', flag: 'br' },
        { name: 'India', flag: 'in' },
        { name: 'France', flag: 'fr' },
        { name: 'Spain', flag: 'es' },
        { name: 'Poland', flag: 'pl' }
      ]
      users.forEach(user => {
        user.profile.email = user.email
        user.profile.name = usernames[Math.floor(Math.random() * usernames.length)]
        user.profile.new = Math.floor(Math.random() * 2) > 0
        user.profile.registered = dates[Math.floor(Math.random() * dates.length)]
        user.profile.status = statuses[Math.floor(Math.random() * statuses.length)]
        user.profile.country = countries[Math.floor(Math.random() * countries.length)]
        user.value = user.username
        user.text = user.username
      })
      state.users = users
    },
    accept: (state, invite) => {
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
      // console.log(task)
      // console.log(context.getters.percent2color)
      // console.log(context.getters.percent2color(task.progress))
      // console.log(percent2color)
      // console.log(percent2color(task.progress))

      task.title = task.name
      task.color = percent2color(task.progress)

      state.tasks.push(task)
    }
  },
  actions: {
    async getToken (context) {
      var response = await context.state.http.post('api-token-auth/', {
        username: context.state.username,
        password: context.state.password
      })
      context.commit('setToken', response.data.token)

      context.state.http.get('users/1/')
        .then(response => {
          context.commit('setUser', response.data)
        })
    },
    async refreshIndex (context) {
      if (!context.state.token) { await context.dispatch('getToken') }

      context.state.http.get('main')
        .then(response => {
          // context.commit('setProjects', response.data.subs)
          // context.state.invites = response.data.invites
          console.log(response.data)
          context.commit('clearTasks')
          response.data.tasks.forEach(task => {
            context.commit(
              'addTask',
              task,
              percent2color(task.progress)
            )
          })
          console.log(context.state.tasks)
          // resolve()
        })
        .catch(e => {
          alert(e)
        })

      let projectsUrl = 'project_users?user=' + context.state.username
      context.state.http.get(projectsUrl, {
        user: context.state.username
      })
        .then(response => {
          context.commit('clearProjects')
          response.data.results.forEach(project => {
            context.commit('addProject', project.project)
          })
        })
        .catch(e => {
          alert(e)
        })

      let invitesUrl = 'project_users?user=' + context.state.username +
        '&status=1'
      context.state.http.get(invitesUrl, {
        user: context.state.username
      })
        .then(response => {
          console.log(response.data.results)
          context.commit('setInvites', response.data.results)
        })
        .catch(e => {
          alert(e)
        })
    },
    async loadProject (context, slug) {
      if (!context.state.token) { await context.dispatch('getToken') }

      context.state.http.get('users')
        .then(response => {
          context.commit('setUsers', response.data.results)
        })
        .catch(e => {
          alert(e)
        })

      let projectUrl = 'projects/' + slug + '/'
      context.state.http.get(projectUrl)
        .then(response => {
          console.log(response.data)
          var project = response.data
          project.tasks = []
          context.state.http.get('main')
            .then(response => {
              console.log(response.data)
              response.data.tasks.forEach(task => {
                project.tasks.push(task)
              })
              project.newTasks = project.tasks
              project.overdueTasks = project.tasks
              project.users = context.state.users
            })
            .catch(e => {
              alert(e)
            })
          context.commit('setProject', project)
          console.log(project)
        })
        .catch(e => {
          alert(e)
        })

      console.log(slug)
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
