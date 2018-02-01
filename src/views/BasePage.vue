<template>
  <div class="animated fadeIn">
    <b-row id="content" class="outer-block-outercontent">
      <b-col xs="12">
        {% block contenttitle %}
      </b-col>
    </b-row>
    <b-row id="content" class="outer-block-outercontent">
      <b-col xs="6" class="block-contents">
        <b-card>
          <div class="textcontent block-innercontent">
          </div>
        </b-card>
        <b-card header="Line Chart">
          <div class="chart-wrapper">
            <line-example/>
          </div>
        </b-card>
        <b-card>
          {% block formsarea %}
        </b-card>
      </b-col>
      <b-col xs="6">
        <b-card header="Meta">
          <p class="totalproject">This project has 8 tasks</p>
          <p>
            You are viewing logs for :<br />
            Project name<br />
            These are also available<br />
            as <a href="#">RSS feeds</a>
          </p>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import LineExample from './charts/LineExample'

export default {
  name: 'index',
  components: {
    LineExample
  }
}
</script>
