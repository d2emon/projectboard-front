<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="8">
        <b-card no-body :header="project.name">
          <b-table  v-if="newTasks" class="mb-0 table-outline" responsive="sm" hover :fields="projectFields" :items="newTasks" head-variant="light" striped>
            <div slot="project" slot-scope="row">
              <router-link :to="row.item.url">{{row.item.name}}</router-link>
            </div>
            <div slot="start_due" slot-scope="row">
              {{row.item.expected_start_date}}
              <div>
                <div v-if="row.item.actual_start_date">
                  {{row.item.actual_start_date}}
                </div>
                <div v-else>
                  No date specified
                </div>
              </div>
            </div>
            <div slot="end_due" slot-scope="row">
              {{row.item.expected_end_date}}
              <div>
                <div v-if="row.item.actual_end_date">
                  {{row.item.actual_end_date}}
                </div>
                <div v-else>
                  No date specified
                </div>
              </div>
            </div>
            <div slot="details" slot-scope="row">
              <a :href="'#' + row.item.url">Details</a>
            </div>
            <div slot="user_data" slot-scope="row">
              <b-row>
                <b-col sm="3">
                  <div class="avatar">
                    <template v-if="row.item.user.avatar">
                       <img :src="row.item.user.avatar" class="img-avatar" alt="">
                       <span
                         class="avatar-status"
                         v-bind:class="{ 'bg-success': row.item.user.status == 'success',  'bg-warning': row.item.user.status == 'warning', 'bg-danger': row.item.user.status == 'danger', 'bg-secondary': row.item.user.status == '' }"></span>
                     </template>
                     <template v-else>
                        <img src="/static/img/avatars/6.jpg" class="img-avatar" alt="">
                      </template>
                    </div>
                 </b-col>
                 <b-col>
                   <div>{{row.item.user.name}}</div>
                   <div class="small text-muted">
                     <span>
                       <template v-if="row.item.user.new">New</template>
                       <template v-else>Recurring</template>
                     </span> | Registered: {{row.item.user.registered}}
                   </div>
                 </b-col>
                 <b-col sm="3">
                   <i v-if="row.item.user.country" class="h4 mb-0" :class="flag(row.item.user.country.flag)" :title="row.item.user.country.flag" :id="row.item.user.country.flag"></i>
                 </b-col>
               </b-row>
            </div>

            <div slot="edit" slot-scope="row">
              <router-link :to="row.item.url_edit"><i class="fa fa-edit"></i></router-link>
            </div>
            <div slot="done" slot-scope="row">
              <b-form-checkbox v-model="row.item.is_complete">
              </b-form-checkbox>
            </div>
            <div slot="del" slot-scope="row">
              <router-link :to="row.item.url_del"><i class="fa fa-trash"></i></router-link>
            </div>
          </b-table>
          <div v-else>
            No Recent Tasks.
          </div>
        </b-card>

        <b-card no-body header="Overdue tasks">
          <b-table  v-if="overdueTasks" class="mb-0 table-outline" responsive="sm" hover :fields="projectFields" :items="overdueTasks" head-variant="light" striped>
            <div slot="project" slot-scope="row">
              <router-link :to="row.item.url">{{row.item.name}}</router-link>
            </div>
            <div slot="start_due" slot-scope="row">
              {{row.item.expected_start_date}}
              <div>
                <div v-if="row.item.actual_start_date">
                  {{row.item.actual_start_date}}
                </div>
                <div v-else>
                  No date specified
                </div>
              </div>
            </div>
            <div slot="end_due" slot-scope="row">
              {{row.item.expected_end_date}}
              <div>
                <div v-if="row.item.actual_end_date">
                  {{row.item.actual_end_date}}
                </div>
                <div v-else>
                  No date specified
                </div>
              </div>
            </div>
            <div slot="details" slot-scope="row">
              <a :href="'#' + row.item.url">Details</a>
            </div>
            <div slot="user_data" slot-scope="row">
              <b-row>
                <b-col sm="3">
                  <div class="avatar">
                    <template v-if="row.item.user.avatar">
                       <img :src="row.item.user.avatar" class="img-avatar" alt="">
                       <span
                         class="avatar-status"
                         v-bind:class="{ 'bg-success': row.item.user.status == 'success',  'bg-warning': row.item.user.status == 'warning', 'bg-danger': row.item.user.status == 'danger', 'bg-secondary': row.item.user.status == '' }"></span>
                     </template>
                     <template v-else>
                        <img src="/static/img/avatars/6.jpg" class="img-avatar" alt="">
                      </template>
                    </div>
                 </b-col>
                 <b-col>
                   <div>{{row.item.user.name}}</div>
                   <div class="small text-muted">
                     <span>
                       <template v-if="row.item.user.new">New</template>
                       <template v-else>Recurring</template>
                     </span> | Registered: {{row.item.user.registered}}
                   </div>
                 </b-col>
                 <b-col sm="3">
                   <i v-if="row.item.user.country" class="h4 mb-0" :class="flag(row.item.user.country.flag)" :title="row.item.user.country.flag" :id="row.item.user.country.flag"></i>
                 </b-col>
               </b-row>
            </div>

            <div slot="edit" slot-scope="row">
              <router-link :to="row.item.url_edit"><i class="fa fa-edit"></i></router-link>
            </div>
            <div slot="done" slot-scope="row">
              <b-form-checkbox v-model="row.item.is_complete">
              </b-form-checkbox>
            </div>
            <div slot="del" slot-scope="row">
              <router-link :to="row.item.url_del"><i class="fa fa-trash"></i></router-link>
            </div>
          </b-table>
          <div v-else>
            No overdue tasks.
          </div>
        </b-card>





                <b-card v-if="invites" header="Create a new project">
                  <b-card-body>
                      <b-form-group
                        label="Shortname:"
                        description="Shortname for your project. Determines URL. Can not contain spaces/sepcial chars.">
                        <b-form-input
                          v-model="project.shortname"
                          required
                          placeholder="Shortname">
                        </b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Name:"
                        description="Name of the project.">
                        <b-form-input
                          v-model="project.name"
                          required
                          placeholder="Name">
                        </b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Start Date:">
                        <b-form-input
                          type="date"
                          v-model="project.start_date"
                          required>
                        </b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="End Date:">
                        <b-form-input
                          type="date"
                          v-model="project.end_date">
                        </b-form-input>
                      </b-form-group>
                      <b-button type="submit" variant="primary" @click="newProject">Submit</b-button>
                  </b-card-body>
                </b-card>




        <b-card v-if="invites" header="Invite a User">
          <b-card-body>
            <b-form-group
              label="Username:"
              description="User name of the user to invite.">
              <b-form-input
                v-model="invite.username"
                required
                placeholder="Username">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Group:"
              description="Permissions available to this user.">
              <b-form-select v-model="invite.group" :options="groups" />
            </b-form-group>
            <b-button type="submit" variant="primary" @click="inviteUser">Invite User</b-button>
          </b-card-body>
        </b-card>

        <b-card v-if="invites" header="Add a task">
          <b-card-body>
            <b-form-group
              label="Name:"
              description="Name of the task.">
              <b-form-input
                v-model="task.name"
                required
                placeholder="Name">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Start Date:"
              description="When will this task start?">
              <b-form-input
                type="date"
                v-model="task.start_date"
                required>
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="End Date:"
              description="When will this task end?">
              <b-form-input
                type="date"
                v-model="task.end_date">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="User Responsible:"
              description="Who is reponsible for this task?">
              <b-form-select v-model="task.user" :options="groups" />
            </b-form-group>
            <b-button type="submit" variant="primary" @click="addTask">Add a task</b-button>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col sm="4">
        <b-card no-body header="Actions">
          <ul>
            <li><a href="#" id="taskshow">Add a task</a></li>
            <li><a href="#" id="inviteshow">Invite a user</a></li>
          </ul>

          <b-list-group v-if="subs">
            <b-list-group-item v-for="sub in subs">
              <b-row>
                <b-col sm="9"><a :to="sub.project.url">{{ sub.project.name }}</a></b-col>
                <b-col sm="3">
                  <c-switch variant="primary" v-model="sub.project.is_active" :pill="true"/>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
          <p v-else>You are not subscribed to any project</p>
        </b-card>

        <b-card header="Meta">
          <b-card-body class="pb-0">
            <p class="sideblurb">
          		You are looking at details for project {project.name}.
              This project has {project.task_set.all.count} tasks.
      		  </p>
            <ul>
              <li><a href="{project.quicktasks_url}">Tasks Quick Entry</a></li>
              <li><a href="{project.quicktaskitems_url}">Task Items Quick Entry</a></li>
        			{% ifequal access 'Owner' %}
        			<li><a href="{project.settings_url}">Settings</a></li>
        			{% endifequal %}
            </ul>

            <p class="sideblurb">Your dashboard has {{subs.length}} projects.</p>
            <p>
              <c-switch :pill="true" v-model="inactive" variant="success"/> Show inactive projects
            </p>
          </b-card-body>
        </b-card>







        {% if project.invited_users %}
        <div>
          <h3>Pending users.</h3>
          <ul>
            {% for user in project.invited_users %}
            <li>{user.user.username}</li>
            {% endfor %}
          </ul>
        </div>
        {% endif %}



  		  <h3>Users</h3>
  		  <ul>
          {% for user in project.subscribeduser_set.all %}
          <li>
            <a href="{user.get_absolute_url}">{user.user.username}</a>
          </li>
          {% endfor %}
       </ul>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import cSwitch from '../components/Switch'

export default {
  name: 'dashboard',
  components: {
    cSwitch
  },
  data: function () {
    return {
      groups: [
        { value: 1, text: 'Owner' },
        { value: 2, text: 'Participant' },
        { value: 3, text: 'Viewer' }
      ],
      invite: {
        username: '',
        group: ''
      },
      task: {
        name: '',
        start_date: null,
        end_date: null
      },
      project: {
        shortname: '',
        name: 'Project Name',
        start_date: '',
        end_date: ''
      },
      projectFields: {
        project: {
          label: 'Project Name',
          sortable: true
        },
        start_due: {
          label: 'Expected Start Due',
          sortable: true
        },
        end_due: {
          label: 'Expected End Date',
          sortable: true
        },
        user_data: {
          label: '<i class="icon-people"></i> User'
        },
        details: {
          label: 'Details'
        },
        edit: {
          label: 'Edit',
          class: 'text-center'
        },
        done: {
          label: 'Mark Done',
          class: 'text-center'
        },
        del: {
          label: 'Delete',
          class: 'text-center'
        }
      },
      newTasks: [
        {
          id: 1,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          actual_start_date: '2018-01-01',
          actual_end_date: '2018-01-01',
          user: {
            name: 'Yiorgos Avraamu',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/1.jpg',
            status: 'success',
            country: { name: 'USA', flag: 'us' }
          },
          is_complete: false,
          due: '10 sec ago'
        },
        {
          id: 2,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          actual_start_date: '2018-01-01',
          user: {
            name: 'Avram Tarasios',
            new: false,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/2.jpg',
            status: 'danger',
            country: { name: 'Brazil', flag: 'br' }
          },
          is_complete: false,
          due: '5 minutes ago'
        },
        {
          id: 3,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          actual_end_date: '2018-01-01',
          user: {
            name: 'Quintin Ed',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/3.jpg',
            status: 'warning',
            country: { name: 'India', flag: 'in' }
          },
          is_complete: true,
          due: '1 hour ago'
        },
        {
          id: 4,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          user: {
            name: 'Enéas Kwadwo',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/4.jpg',
            status: '',
            country: { name: 'France', flag: 'fr' }
          },
          is_complete: false,
          due: 'Last month'
        },
        {
          id: 5,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          user: {
            name: 'Agapetus Tadeáš',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/5.jpg',
            status: 'success',
            country: { name: 'Spain', flag: 'es' }
          },
          is_complete: true,
          due: 'Last week'
        },
        {
          id: 6,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          project: {
            name: 'Project 1',
            url: '/project',
            expected_start_date: '2018-01-01',
            expected_end_date: '2018-01-01'
          },
          user: {
            name: 'Friderik Dávid',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/6.jpg',
            status: 'danger',
            country: { name: 'Poland', flag: 'pl' }
          },
          is_complete: false,
          due: 'Last week'
        }
      ],
      overdueTasks: [
        {
          id: 1,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          actual_start_date: '2018-01-01',
          actual_end_date: '2018-01-01',
          user: {
            name: 'Yiorgos Avraamu',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/1.jpg',
            status: 'success',
            country: { name: 'USA', flag: 'us' }
          },
          is_complete: false,
          due: '10 sec ago'
        },
        {
          id: 2,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          actual_start_date: '2018-01-01',
          user: {
            name: 'Avram Tarasios',
            new: false,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/2.jpg',
            status: 'danger',
            country: { name: 'Brazil', flag: 'br' }
          },
          is_complete: false,
          due: '5 minutes ago'
        },
        {
          id: 3,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          actual_end_date: '2018-01-01',
          user: {
            name: 'Quintin Ed',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/3.jpg',
            status: 'warning',
            country: { name: 'India', flag: 'in' }
          },
          is_complete: true,
          due: '1 hour ago'
        },
        {
          id: 4,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          user: {
            name: 'Enéas Kwadwo',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/4.jpg',
            status: '',
            country: { name: 'France', flag: 'fr' }
          },
          is_complete: false,
          due: 'Last month'
        },
        {
          id: 5,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          user: {
            name: 'Agapetus Tadeáš',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/5.jpg',
            status: 'success',
            country: { name: 'Spain', flag: 'es' }
          },
          is_complete: true,
          due: 'Last week'
        },
        {
          id: 6,
          url: '/project/task',
          url_edit: '/project/task/edit',
          url_del: '/project/task/delete',
          name: 'Task',
          expected_start_date: '2018-01-01',
          expected_end_date: '2018-01-01',
          project: {
            name: 'Project 1',
            url: '/project',
            expected_start_date: '2018-01-01',
            expected_end_date: '2018-01-01'
          },
          user: {
            name: 'Friderik Dávid',
            new: true,
            registered: 'Jan 1, 2015',
            avatar: 'static/img/avatars/6.jpg',
            status: 'danger',
            country: { name: 'Poland', flag: 'pl' }
          },
          is_complete: false,
          due: 'Last week'
        }
      ],

      new_tasks: true,
      subs: [
        {
          project: {
            name: 'Project',
            url: '/project',
            is_active: true,
            overdue_tasks: [
              {
                id: 1,
                name: 'Task',
                url: '/project/task',
                expected_end_date: '2018-01-01',
                user_responsible: 'Avram Tarasios',
                is_complete: false
              },
              {
                id: 2,
                name: 'Task',
                url: '/project/task',
                expected_end_date: '2018-01-01',
                user_responsible: 'Avram Tarasios',
                is_complete: true
              },
              {
                id: 3,
                name: 'Task',
                url: '/project/task',
                expected_end_date: '2018-01-01',
                user_responsible: 'Avram Tarasios',
                is_complete: false
              }
            ]
          }

        }

      ],
      invites: [
        { id: 1, project: { id: 1, name: 'Project1', url: '/project' } },
        { id: 2, project: { id: 2, name: 'Project2', url: '/project' } },
        { id: 3, project: { id: 3, name: 'Project3', url: '/project' } }
      ],
      projectsFields: {
        project: {
          label: 'Project Name',
          sortable: true
        },
        start_due: {
          label: 'Expected Start Due',
          sortable: true
        },
        end_due: {
          label: 'Expected End Date',
          sortable: true
        },
        user: {
          label: '<i class="icon-people"></i> User'
        },
        details: {
          label: 'Details'
        },
        edit: {
          label: 'Edit'
        },
        mark_done: {
          label: 'Mark Done'
        },
        del: {
          label: 'Delete'
        }
      },
      inactive: false,

      selected: 'Month',
      tableItems: [
        {
          avatar: { url: 'static/img/avatars/1.jpg', status: 'success' },
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'USA', flag: 'us' },
          usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Mastercard', icon: 'fa fa-cc-mastercard' },
          activity: '10 sec ago'
        },
        {
          avatar: { url: 'static/img/avatars/2.jpg', status: 'danger' },
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          country: { name: 'Brazil', flag: 'br' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Visa', icon: 'fa fa-cc-visa' },
          activity: '5 minutes ago'
        },
        {
          avatar: { url: 'static/img/avatars/3.jpg', status: 'warning' },
          user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'India', flag: 'in' },
          usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Stripe', icon: 'fa fa-cc-stripe' },
          activity: '1 hour ago'
        },
        {
          avatar: { url: 'static/img/avatars/4.jpg', status: '' },
          user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'France', flag: 'fr' },
          usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'PayPal', icon: 'fa fa-paypal' },
          activity: 'Last month'
        },
        {
          avatar: { url: 'static/img/avatars/5.jpg', status: 'success' },
          user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Spain', flag: 'es' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Google Wallet', icon: 'fa fa-google-wallet' },
          activity: 'Last week'
        },
        {
          avatar: { url: 'static/img/avatars/6.jpg', status: 'danger' },
          user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Poland', flag: 'pl' },
          usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Amex', icon: 'fa fa-cc-amex' },
          activity: 'Last week'
        }
      ],
      tableFields: {
        avatar: {
          label: '<i class="icon-people"></i>',
          class: 'text-center'
        },
        user: {
          label: 'User'
        },
        country: {
          label: 'Country',
          class: 'text-center'
        },
        usage: {
          label: 'Usage'
        },
        payment: {
          label: 'Payment method',
          class: 'text-center'
        },
        activity: {
          label: 'Activity'
        }
      }
    }
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    },
    accept (invite) {
      alert(JSON.stringify({
        id: invite.id,
        project_id: invite.project.id
      }))
    },
    newProject () {
      alert(JSON.stringify(this.project))
    },
    inviteUser () {
      alert(JSON.stringify(this.invite))
    },
    addTask () {
      alert(JSON.stringify(this.task))
    }
  }
}
</script>
