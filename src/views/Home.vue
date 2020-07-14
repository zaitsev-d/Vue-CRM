<template>
  <div>
    <div class="page-title">
      <h3>Account</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div v-else class="row">
      <Bill :rates="currency.rates"/>
      <Currency 
      :rates="currency.rates"
      :date="currency.date"/>
    </div>

  </div>
</template>

<script>
import Bill from '@/components/Bill'
import Currency from '@/components/Currency'
export default {
  name: 'home',
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('infoCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('infoCurrency')
      this.loading = false
    }
  },
  components: {
    Bill, Currency
  }
}
</script>
