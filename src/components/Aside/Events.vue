<template>
  <div>
    <template v-if="today.length">
      <Callout class="m-0 py-2 text-muted text-center bg-light text-uppercase">
        <small><b>Today</b></small>
      </Callout>

      <template v-for="(item, id) in today">
        <hr class="transparent mx-3 my-0" v-if="id == 0">
        <hr class="mx-3 my-0" v-else>
        <Callout :variant="item.variant" class="m-0 py-3">
          <div class="avatar float-right" v-if="item.user">
            <img :src="item.user.avatar" class="img-avatar" :alt="item.user.email">
          </div>
          <div v-html="item.text"></div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; {{ item.time }}</small>
          <small class="text-muted" v-if="item.location"><i class="icon-location-pin"></i>&nbsp; {{ item.location }}</small>
          <small class="text-muted" v-else-if="item.skype"><i class="icon-social-skype"></i>&nbsp; On-line </small>
        </Callout>
      </template>
      <hr class="transparent mx-3 my-0">
    </template>

    <template v-if="tommorow.length">
      <Callout class="m-0 py-2 text-muted text-center bg-light text-uppercase">
        <small><b>Tomorrow</b></small>
      </Callout>

      <template v-for="(item, id) in tommorow">
        <hr class="transparent mx-3 my-0" v-if="id == 0">
        <hr class="mx-3 my-0" v-else>
        <Callout :variant="item.variant" class="m-0 py-3">
          <div class="avatar float-right" v-if="item.user">
            <img :src="item.user.avatar" class="img-avatar" :alt="item.user.email">
          </div>
          <div v-html="item.text"></div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; {{ item.time }}</small>
          <small class="text-muted" v-if="item.location"><i class="icon-location-pin"></i>&nbsp; {{ item.location }}</small>
          <small class="text-muted" v-else-if="item.skype"><i class="icon-social-skype"></i>&nbsp; On-line </small>
          <small class="text-muted" v-else-if="item.home"><i class="icon-home"></i>&nbsp; {{ item.home }}</small>
          <div class="avatars-stack mt-2" v-if="item.users">
            <div class="avatar avatar-xs" v-for="(user, id) in item.users">
              <img :src="user.avatar" class="img-avatar" :alt="user.email">
            </div>
          </div>
        </Callout>
      </template>
      <hr class="mx-3 my-0">
    </template>
  </div>
</template>
<script>
import Callout from '../Callout'

export default {
  name: 'c-events',
  components: {
    Callout
  },
  data: function () {
    return {
      today: [
        {
          variant: 'warning',
          user: {
            avatar: 'static/img/avatars/7.jpg',
            email: 'admin@bootstrapmaster.com'
          },
          text: 'Meeting with <strong>Lucas</strong>',
          time: '1 - 3pm',
          location: 'Palo Alto, CA '
        },
        {
          variant: 'info',
          user: {
            avatar: 'static/img/avatars/4.jpg',
            email: 'admin@bootstrapmaster.com'
          },
          text: 'Skype with <strong>Megan</strong>',
          time: '4 - 5pm',
          skype: true
        }
      ],
      tommorow: [
        {
          variant: 'danger',
          text: 'New UI Project - <strong>deadline</strong>',
          time: '10 - 11pm',
          home: 'creativeLabs HQ ',
          users: [
            { avatar: 'static/img/avatars/2.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/3.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/4.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/5.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/6.jpg', email: 'admin@bootstrapmaster.com' }
          ]
        },

        {
          variant: 'success',
          text: '<strong>#10 Startups.Garden</strong> Meetup',
          time: '1 - 3pm',
          location: 'Palo Alto, CA ',
          users: []
        },
        {
          variant: 'primary',
          text: '<strong>Team meeting</strong>',
          time: '4 - 6pm',
          home: 'creativeLabs HQ ',
          users: [
            { avatar: 'static/img/avatars/2.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/3.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/4.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/5.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/6.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/7.jpg', email: 'admin@bootstrapmaster.com' },
            { avatar: 'static/img/avatars/8.jpg', email: 'admin@bootstrapmaster.com' }
          ]
        }
      ]
    }
  }
}
</script>
