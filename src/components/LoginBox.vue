<template>
  <b-card-group>
    <b-card no-body class="p-4">
      <b-card-body>
        <h1>Login</h1>
        <p class="text-muted">Sign In to your account</p>
        <b-input-group class="mb-3">
          <div class="input-group-prepend"><span class="input-group-text"><i class="icon-user"></i></span></div>
          <input v-model="form.name" type="text" class="form-control" placeholder="Username">
        </b-input-group>
        <b-input-group class="mb-4">
          <div class="input-group-prepend"><span class="input-group-text"><i class="icon-lock"></i></span></div>
          <input v-model="form.password" type="password" class="form-control" placeholder="Password">
        </b-input-group>
        <c-switch v-model="form.remember" type="icon" variant="primary" v-bind="{on: '\uf00c', off: '\uf00d'}" :pill="true"/> Remember Me
        <b-row>
          <b-col cols="6">
            <b-button variant="primary" class="px-4" @click="onSubmit">Login</b-button>
          </b-col>
          <b-col cols="6" class="text-right">
            <b-button variant="link" class="px-0" to="/accounts/reset/">Forgot password?</b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
      <b-card-body class="text-center">
        <div>
          <h2>Sign up</h2>
          <p>
            Don't have a Account yet?<br />
            Signing up is easy.
          </p>
          <b-button variant="primary" class="active mt-3" to="/accounts/register/">Register Now!</b-button>
        </div>
      </b-card-body>
    </b-card>
  </b-card-group>
</template>

<script>
import cSwitch from './Switch'

export default {
  name: 'loginBox',
  components: {
    cSwitch
  },
  data: function () {
    return {
      form: {
        name: '',
        password: '',
        remember: false
      }
    }
  },
  computed: {
    usernameState () {
      return (this.form.name.length > 1) && (this.form.name.length < 30)
      /**
       * forms.RegexField(r'^[a-zA-Z0-9_]{1,30}$',
       */
    },
    passwordState () {
      return this.form.name.length > 1
    }
  },
  methods: {
    onSubmit (evt) {
      alert(JSON.stringify(this.form))
      alert('/accounts/login/')
      /*
      <pre>
      def clean(self):
          try:
              user = User.objects.get(username__iexact = self.cleaned_data['username'])
          except KeyError:
              raise forms.ValidationError('Please provide a username.')
          except User.DoesNotExist:
              raise forms.ValidationError('Invalid username, please try again.')

          if not user.check_password(self.cleaned_data['password']):
              raise forms.ValidationError('Invalid password, please try again.')

          return self.cleaned_data
      </pre>
      */
      this.$router.push('/dashboard')
    }
  }
}
</script>
