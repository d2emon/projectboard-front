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

        <b-card header="Invite a User">
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

        <b-card header="Add a task">
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
              <b-form-select v-model="task.user" :options="users" />
            </b-form-group>
            <b-button type="submit" variant="primary" @click="addTask">Add a task</b-button>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col sm="4">
        <b-card no-body header="Actions">
            <b-list-group>
              <b-list-group-item to="/project/task/add">
                Add a task
              </b-list-group-item>
              <b-list-group-item to="/project/invite">
                Invite a user
              </b-list-group-item>
            </b-list-group>
        </b-card>

        <b-card no-body header="Meta">
          <b-card-body class="pb-0">
            <p class="sideblurb">
          		You are looking at details for project {{project.name}}.
              This project has {{project.tasks.length}} tasks.
      		  </p>
          </b-card-body>
          <b-list-group>
            <b-list-group-item to="/project/tasks">
              Tasks Quick Entry
            </b-list-group-item>
            <b-list-group-item to="/project/items">
              Task Items Quick Entry
            </b-list-group-item>
            <b-list-group-item v-if="access == 2" to="/project/settings">
              Settings
            </b-list-group-item>
          </b-list-group>
        </b-card>

        <b-card no-body header="Pending users" v-if="project.invites">
            <b-list-group>
              <b-list-group-item v-for="(user, id) in project.invites" :key="id">
                <b-row>
                  <b-col sm="3">
                    <div class="avatar">
                      <template v-if="user.avatar">
                        <img :src="user.avatar" class="img-avatar" alt="">
                        <span
                          class="avatar-status"
                          v-bind:class="{ 'bg-success': user.status == 'success',  'bg-warning': user.status == 'warning', 'bg-danger': user.status == 'danger', 'bg-secondary': user.status == '' }"></span>
                      </template>
                      <template v-else>
                        <img src="/static/img/avatars/6.jpg" class="img-avatar" alt="">
                      </template>
                    </div>
                  </b-col>
                  <b-col>
                    <div>{{user.name}}</div>
                    <div class="small text-muted">
                      <span>
                        <template v-if="user.new">New</template>
                        <template v-else>Recurring</template>
                      </span> | Registered: {{user.registered}}
                    </div>
                  </b-col>
                  <b-col sm="3">
                    <i v-if="user.country" class="h4 mb-0" :class="flag(user.country.flag)" :title="user.country.flag" :id="user.country.flag"></i>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
        </b-card>

        <b-card no-body header="Users">
            <b-list-group-item v-for="(user, id) in project.users" :key="id" :to="user.url">
              <b-row>
                <b-col sm="3">
                  <div class="avatar">
                    <template v-if="user.avatar">
                      <img :src="user.avatar" class="img-avatar" alt="">
                      <span
                        class="avatar-status"
                        v-bind:class="{ 'bg-success': user.status == 'success',  'bg-warning': user.status == 'warning', 'bg-danger': user.status == 'danger', 'bg-secondary': user.status == '' }"></span>
                    </template>
                    <template v-else>
                      <img src="/static/img/avatars/6.jpg" class="img-avatar" alt="">
                    </template>
                  </div>
                </b-col>
                <b-col>
                  <div>{{user.name}}</div>
                  <div class="small text-muted">
                    <span>
                      <template v-if="user.new">New</template>
                      <template v-else>Recurring</template>
                    </span> | Registered: {{user.registered}}
                  </div>
                </b-col>
                <b-col sm="3">
                  <i v-if="user.country" class="h4 mb-0" :class="flag(user.country.flag)" :title="user.country.flag" :id="user.country.flag"></i>
                </b-col>
              </b-row>
            </b-list-group-item>
        </b-card>

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
    console.log(this.$store.state.projects[0])
    var users = []
    for (let i = 0; i < this.$store.state.users.length; i++) {
      users.push({ value: i + 1, text: this.$store.state.users[i].name })
    }
    return {
      groups: [
        { value: 1, text: 'Owner' },
        { value: 2, text: 'Participant' },
        { value: 3, text: 'Viewer' }
      ],
      users: users,
      invite: {
        username: '',
        group: ''
      },
      task: {
        name: '',
        start_date: null,
        end_date: null
      },
      project: this.$store.state.projects[0],
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
      newTasks: this.$store.state.tasks,
      overdueTasks: this.$store.state.tasks,
      access: 2
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
