<template>
  <aside class="aside-menu">
    <b-tabs>
      <b-tab title="<i class='icon-list'></i>">
        <events/>
      </b-tab>
      <b-tab title="<i class='icon-speech'></i>">
        <messages/>
      </b-tab>
      <b-tab title="<i class='icon-settings'></i>">
        <settings/>
      </b-tab>
    </b-tabs>
  </aside>
</template>

<script>
import Events from './Events'
import Messages from './Messages'
import Settings from './Settings'

export default {
  name: 'c-aside',
  components: {
    Events,
    Messages,
    Settings
  }
}
</script>
