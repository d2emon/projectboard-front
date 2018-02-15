<template>
  <div class="p-3">
    <template v-for="(item, id) in messages">
      <div class="message">
        <div class="py-3 pb-5 mr-3 float-left">
          <div class="avatar">
            <img :src="'static/img/avatars/' + item.avatar" class="img-avatar" :alt="item.email">
            <b-badge :variant="item.variant" class="avatar-status" ></b-badge>
          </div>
        </div>
        <div>
          <small class="text-muted">{{ item.name }}</small>
          <small class="text-muted float-right mt-1">{{ item.registered }}</small>
        </div>
        <div class="text-truncate font-weight-bold" v-html="item.title"></div>
        <small class="text-muted" v-html="item.text"></small>
      </div>
      <hr v-if="id < (messages.length - 1)">
    </template>
  </div>
</template>
<script>
export default {
  name: 'c-messages',
  data: function () {
    return {
      messages: this.$store.state.messages
      /*
      messages: [
        {
          user: { avatar: 'static/img/avatars/7.jpg', email: 'admin@bootstrapmaster.com', status: 'success', name: 'Lukasz Holeczek' },
          time: '1:52 PM',
          title: 'Lorem ipsum dolor sit amet',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
        },
        {
          user: { avatar: 'static/img/avatars/7.jpg', email: 'admin@bootstrapmaster.com', status: 'success', name: 'Lukasz Holeczek' },
          time: '1:52 PM',
          title: 'Lorem ipsum dolor sit amet',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
        },
        {
          user: { avatar: 'static/img/avatars/7.jpg', email: 'admin@bootstrapmaster.com', status: 'success', name: 'Lukasz Holeczek' },
          time: '1:52 PM',
          title: 'Lorem ipsum dolor sit amet',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
        },
        {
          user: { avatar: 'static/img/avatars/7.jpg', email: 'admin@bootstrapmaster.com', status: 'success', name: 'Lukasz Holeczek' },
          time: '1:52 PM',
          title: 'Lorem ipsum dolor sit amet',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
        },
        {
          user: { avatar: 'static/img/avatars/7.jpg', email: 'admin@bootstrapmaster.com', status: 'success', name: 'Lukasz Holeczek' },
          time: '1:52 PM',
          title: 'Lorem ipsum dolor sit amet',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...'
        }
      ]
      */
    }
  }
}
</script>
