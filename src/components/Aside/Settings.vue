<template>
  <div class="p-3">
    <h6>Настройки</h6>
    <div class="aside-options" v-for="(item, id) in options">
      <div class="clearfix mt-3">
        <small><b>{{ item.title }}</b></small>
        <c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right" :checked="item.checked"/>
      </div>
      <div v-if="item.info">
        <small class="text-muted" v-html="item.info"></small>
      </div>
    </div>
    <hr>

    <h6>Системная Нагрузка</h6>
    <div class="text-uppercase mb-1 mt-4"><small><b>Использование CPU</b></small></div>
    <b-progress height={} class="progress-xs" :variant="server.cpu.color" :value="server.cpu.percent"></b-progress>
    <small class="text-muted">{{ server.cpu.processes }} Процессов. {{ server.cpu.value }}/{{ server.cpu.max }} Ядер.</small>

    <div class="text-uppercase mb-1 mt-2"><small><b>Использование Памяти</b></small></div>
    <b-progress height={} class="progress-xs" :variant="server.memory.color" :value="server.memory.percent"></b-progress>
    <small class="text-muted">{{ server.memory.value }}MB/{{ server.memory.max }}MB</small>

    <div class="text-uppercase mb-1 mt-2"><small><b>Использование SSD 1</b></small></div>
    <b-progress height={} class="progress-xs" :variant="server.ssd1.color" :value="server.ssd1.percent"></b-progress>
    <small class="text-muted">{{ server.ssd1.value }}GB/{{ server.ssd1.max }}GB</small>

    <div class="text-uppercase mb-1 mt-2"><small><b>Использование SSD 2</b></small></div>
    <b-progress height={} class="progress-xs" :variant="server.ssd2.color" :value="server.ssd2.percent"></b-progress>
    <small class="text-muted">{{ server.ssd2.value }}GB/{{ server.ssd2.max }}GB</small>
  </div>
</template>

<script>
import cSwitch from '../Switch'

export default {
  name: 'c-settings',
  components: {
    cSwitch
  },
  data: function () {
    return {
      options: [
        { title: 'Option 1', checked: true, info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Option 2', checked: false, info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Option 3', checked: false },
        { title: 'Option 4', checked: true }
      ],
      server: this.$store.state.server
    }
  }
}
</script>
