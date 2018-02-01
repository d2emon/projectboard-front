<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-jumbotron header="Welcome to Dashbard!">
        <b-row>
          <b-col xs="6">

            <b-card header="Plan. Track. Manage.">
          		<ul>
                <li v-for="(feature, id) in features" :key="id">{{feature}}</li>
          		</ul>
            </b-card>

            <b-card header="Oh look. Some screenshots!">
              <b-card-group>
                <b-card
                  no-body
                  v-for="(screenshot, id) in screenshots"
                  :header="screenshot.title"
                  :img-src="screenshot.url"
                  :img-alt="screenshot.title"
                  img-top
                  :key="id"
                >
                </b-card>
              </b-card-group>
            </b-card>
          </b-col>

          <b-col xs="6">
            <LoginBox></LoginBox>
          </b-col>
        </b-row>

      </b-jumbotron>
    </div>
  </div>
</template>
<script>
import LoginBox from '../components/LoginBox'

export default {
  name: 'index',
  components: {
    LoginBox
  },
  data () {
    return {
      features: [
        'Manage depenedencies with multi-level-hierchical task structure.',
        'Track time spent with task items.',
        'Integrated wiki, file storage and notice board.',
        'Versioned projects so your data is never lost.',
        'Integrated metrics.',
        'Keep track of changes via mail or rss.',
        'Multiple access levels.'
      ],
      screenshots: [
        { title: 'Calendar', url: '/static/img/screenshots/tn_calendar_1.png' },
        { title: 'Metrics', url: '/static/img/screenshots/tn_dashboard_1.png' },
        { title: 'Dashboard', url: '/static/img/screenshots/tn_metrics_1.png' }
      ],
      show: true
    }
  }
}
</script>
