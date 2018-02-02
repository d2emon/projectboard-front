<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="8">
        <b-card no-body :header="'You are subscribed to ' + subs.length + ' projects.'">
          <b-table class="mb-0 table-outline" responsive="sm" hover :items="projectItems" :fields="projectFields" head-variant="light" striped>
            <div slot="project" slot-scope="item">
            {{item.value}}
              <a :to="item.value.url">{{item.value.name}}</a>
            </div>
            <div slot="task" slot-scope="row">
              <a :href="row.item.url">{{row.item.name}}</a>
            </div>
            <div slot="complete" slot-scope="row">
              <b-form-checkbox v-model="row.item.is_complete">
              </b-form-checkbox>
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
            <div slot="due" slot-scope="item">
              <strong>{{item.value}}</strong>
            </div>
          </b-table>
        </b-card>

        <b-card v-if="invites" no-body header="Pending Invites">
          <b-list-group>
            <b-list-group-item v-for="invite in invites">
              <b-row>
                <b-col sm="10"><a :to="invite.project.url">{{ invite.project.name }}</a></b-col>
                <b-col sm="2"><b-button variant="success" @click="accept(invite)">Accept</b-button></b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
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
      </b-col>

      <b-col sm="4">
        <b-card no-body header="Projects">
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
            <p class="sideblurb">Your dashboard has {{subs.length}} projects.</p>
            <p>
              <c-switch :pill="true" v-model="inactive" variant="success"/> Show inactive projects
            </p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="8">
        <h2>{{project.name}}</h2>
        <div class="contenttext">
          <div class="tblpad" v-if="new_tasks">
  				  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tbltitle">
              <tr>
                <td width="19%" style="padding-left:30px;">Project Name</td>
                <td width="16%" style=" text-align:left" >Expected Start Due</td>
                <td width="16%" style=" text-align:left">Expected End Date</td>
                <td width="16%" style=" text-align:left">User Responsible</td>
              	<td width="8%" style=" text-align:left">Details </td>
              	<td width="6%" style=" text-align:left">Edit</td>
              	<td width="10%" style=" text-align:left">Mark Done</td>
                <td width="9%"  style="background:#4D7CA7 url(images/curve_blue.gif) 100% 0px no-repeat">Delete</td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tbl">
  		        {% for task in new_tasks %}
  		        <tbody>
                {% include 'project/taskrow.html' %}
  		        </tbody>
              {% endfor %}
            </table>
            <b-table class="mb-0 table-outline" responsive="sm" hover :items="projectItems" :fields="projectsFields" head-variant="light" striped>
            </b-table>
          </div>
          <div v-else class="no_table">
            No Recent Tasks.
          </div>
        </div>

        <b-card no-body :header="project.name" v-if="new_tasks">
          <b-table class="mb-0 table-outline" responsive="sm" hover :items="projectItems" :fields="projectFields" head-variant="light" striped>
            <div slot="project" slot-scope="item">
            {{item.value}}
              <a :to="item.value.url">{{item.value.name}}</a>
            </div>
            <div slot="task" slot-scope="row">
              <a :href="row.item.url">{{row.item.name}}</a>
            </div>
            <div slot="complete" slot-scope="row">
              <b-form-checkbox v-model="row.item.is_complete">
              </b-form-checkbox>
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
            <div slot="due" slot-scope="item">
              <strong>{{item.value}}</strong>
            </div>
          </b-table>
        </b-card>


  			<h1 class="titleor">Overdue tasks </h1>
  			<div class="contenttext">
  				<div class="tblpad">
            {% if overdue_tasks %}
  				  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tbltitle">
              <tr>
                <td width="19%" style="padding-left:30px;">Task Name</td>
                <td width="16%" style=" text-align:left" >Expected Start Due</td>
                <td width="16%" style=" text-align:left">Expected End Date</td>
                <td width="16%" style=" text-align:left">User Responsible</td>
              	<td width="8%" style=" text-align:left">Details </td>
              	<td width="6%" style=" text-align:left">Edit</td>
              	<td width="10%" style=" text-align:left">Mark Done</td>
                <td width="9%"  style="background:#4D7CA7 url(images/curve_blue.gif) 100% 0px no-repeat">Delete</td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tbl">
              {% for task in overdue_tasks %}
              <tbody>
                {% include 'project/taskrow.html' %}
              </tbody>
              {% endfor %}
            </table>
            {% else %}
            <div class="no_table">
              No overdue tasks.
            </div>
            {% endif %}
          </div>
        </div>

        <b-card no-body :header="'You are subscribed to ' + subs.length + ' projects.'">
          <b-table class="mb-0 table-outline" responsive="sm" hover :items="projectItems" :fields="projectFields" head-variant="light" striped>
            <div slot="project" slot-scope="item">
            {{item.value}}
              <a :to="item.value.url">{{item.value.name}}</a>
            </div>
            <div slot="task" slot-scope="row">
              <a :href="row.item.url">{{row.item.name}}</a>
            </div>
            <div slot="complete" slot-scope="row">
              <b-form-checkbox v-model="row.item.is_complete">
              </b-form-checkbox>
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
            <div slot="due" slot-scope="item">
              <strong>{{item.value}}</strong>
            </div>
          </b-table>
        </b-card>

        <div class="genericform">
  		    <h3>Invite a User</h3>
  		    <div class="createcontent">
            <div id="inviteform">
              <form action="." method="post">
                {% csrf_token %}
                {inviteform.as_p}
                <div><input type="submit" name="invite" value="Invite User" class="submitbutton" /></div>
              </form>
            </div>
  		    </div>
  		  </div>

  		  <div class="genericform">
  		    <h3>Add a task</h3>
  		    <div class="createcontent">
            <div id="taskform">
              <form action="." method="post">
                {% csrf_token %}
                {taskform.as_p}
                <div><input type="submit" name="task" value="Add a task" class="submitbutton" /></div>
              </form>
            </div>
  		    </div>
  		  </div>
      </b-col>
      <b-col sm="4">
        <h3>Actions</h3>
        <ul>
          <li><a href="#" id="taskshow">Add a task</a></li>
          <li><a href="#" id="inviteshow">Invite a user</a></li>
        </ul>

        <h3>Meta</h3>
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
      project: {
        shortname: '',
        name: 'Project Name',
        start_date: '',
        end_date: ''
      },
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
      projectFields: {
        project: {
          label: 'Project Name',
          sortable: true
        },
        task: {
          label: 'Task',
          sortable: true
        },
        due: {
          label: 'Was due on',
          sortable: true
        },
        user_data: {
          label: '<i class="icon-people"></i> User'
        },
        complete: {
          label: 'Select',
          class: 'text-center'
        }
      },
      projectItems: [
        {
          id: 1,
          url: '/project/task',
          name: 'Task',
          project: { name: 'Project 1', url: '/project' },
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
          name: 'Task',
          project: { name: 'Project 1', url: '/project' },
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
          name: 'Task',
          project: { name: 'Project 1', url: '/project' },
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
          name: 'Task',
          project: { name: 'Project 1', url: '/project' },
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
          name: 'Task',
          project: { name: 'Project 1', url: '/project' },
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
          name: 'Task',
          project: { name: 'Project 1', url: '/project' },
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
    }
  }
}
</script>
