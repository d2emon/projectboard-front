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

var users = []
for (let i = 0; i < 10; i++) {
  users.push({
    name: usernames[Math.floor(Math.random() * usernames.length)],
    new: Math.floor(Math.random() * 2) > 0,
    registered: dates[Math.floor(Math.random() * dates.length)],
    avatar: 'static/img/avatars/' + (Math.floor(Math.random() * 6) + 1) + '.jpg',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    country: countries[Math.floor(Math.random() * countries.length)]
  })
}

var tasks = []
for (let i = 0; i < 25; i++) {
  tasks.push({
    id: i + 1,
    name: 'Task' + (i + 1),
    url: '/project/task',
    url_edit: '/project/task/edit',
    url_del: '/project/task/delete',
    expected_start_date: dates[Math.floor(Math.random() * dates.length)],
    expected_end_date: dates[Math.floor(Math.random() * dates.length)],
    actual_start_date: dates[Math.floor(Math.random() * dates.length)],
    actual_end_date: dates[Math.floor(Math.random() * dates.length)],
    user: users[Math.floor(Math.random() * users.length)],
    project: null,
    is_complete: Math.floor(Math.random() * 2) > 0,
    due: dates[Math.floor(Math.random() * dates.length)]
  })
}

var projects = []
var invites = []
for (let i = 0; i < 10; i++) {
  let project = {
    shortname: 'project-' + (i + 1),
    name: 'Project ' + (i + 1),
    start_date: dates[Math.floor(Math.random() * dates.length)],
    end_date: dates[Math.floor(Math.random() * dates.length)],
    url: '/project',
    is_active: Math.floor(Math.random() * 2) > 0,
    tasks: [],
    overdue_tasks: [],
    invites: [],
    users: users
  }
  for (let i = 0; i < 5; i++) {
    let userId = Math.floor(Math.random() * users.length)
    invites.push({
      id: i + 1,
      project: project,
      user: users[userId]
    })
    project.invites.push(users[userId])
  }
  projects.push(project)
}

for (let i = 0; i < tasks.length; i++) {
  let project = projects[Math.floor(Math.random() * projects.length)]
  tasks[i].project = project
  project.tasks.push(tasks[i])
  project.overdue_tasks.push(tasks[i])
}

export default {
  projects: projects,
  tasks: tasks,
  users: users,
  invites: invites
}
