<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Home accounting</span>
    <div class="input-field">
      <input id="email" type="text"
      v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
      <label for="email">Email</label>
      <small v-if="$v.email.$dirty && !$v.email.required"
      class="helper-text invalid">The field 'Email' cannot be null.</small>
      <small v-else-if="$v.email.$dirty && !$v.email.email"
      class="helper-text invalid">Enter the correct email.</small>
    </div>
    <div class="input-field">
      <input id="password" type="password"
      v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}">
      <label for="password">Password</label>
      <small v-if="$v.password.$dirty && !$v.password.required"
      class="helper-text invalid">The field 'Password' cannot be null.</small>
      <small v-else-if="$v.password.$dirty && !$v.password.minLength"
      class="helper-text invalid">Password length can be {{$v.password.$params.minLength.min}} symbols. Current password length: {{password.length}}</small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button class="btn waves-effect waves-light auth-submit" type="submit">
        Log In
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      First time?
      <router-link to="/register">Sign Up</router-link>
    </p>
  </div>
</form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
  name: 'login',
   metaInfo() {
    return {
      title: this.$title('Login')
    }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
