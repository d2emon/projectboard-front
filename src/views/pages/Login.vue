<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <LoginBox></LoginBox>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import LoginBox from '../../components/LoginBox'

export default {
  name: 'Login',
  components: {
    LoginBox
  }
}
</script>
