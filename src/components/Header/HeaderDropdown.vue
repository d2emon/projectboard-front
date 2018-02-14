<template>
  <b-nav-item-dropdown right no-caret>
    <template slot="button-content">
      <img :src="user.avatar" class="img-avatar" :alt="user.email">
    </template>
    <template v-for="(item, id) in menu">
      <b-dropdown-header v-if="item.header" tag="div" class="text-center" :key="id"><strong>{{item.header}}</strong></b-dropdown-header>
      <b-dropdown-divider v-else-if="item.divider" :key="id"></b-dropdown-divider>
      <b-dropdown-item v-else :to="item.to" :key="id"><i :class="item.icon"></i> {{item.title}}<b-badge v-if="item.count" :variant="item.variant">{{item.count}}</b-badge></b-dropdown-item>
    </template>
  </b-nav-item-dropdown>
</template>
<script>
  export default {
    name: 'header-dropdown',
    computed: {
    },
    data: function () {
      return {
        user: this.$store.state.user,
        menu: this.$store.getters.userMenu
      }
    }
  }
</script>
