<template>
  <div>
    <div class="page-title">
      <h3>Profile</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input id="description" type="text" 
        v-model="name" :class="{invalid: ($v.name.$dirty && !$v.name.required)}">
        <label for="description">Name</label>
         <small v-if="$v.name.$dirty && !$v.name.required"
      class="helper-text invalid">The field 'Name' cannot be null.</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Update
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
   metaInfo() {
    return {
      title: this.$title('Profile')
    }
  },
  data: () => ({
    name: ''
  }),
  validations: {
    name: { required },
  }, 
  async mounted() {
    this.name = this.info.name

    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['UpdateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.UpdateInfo({
          name: this.name
        })
      } catch (e) {}
    }
  }
}
</script>
