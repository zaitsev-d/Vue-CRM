<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Account in currency</span>

            <p v-for="cur of currencies"
            :key="cur" class="currency-line">
              <span class="list">{{getCurrency(cur) | currency(cur)}}</span>
            </p>
          </div>
        </div>
      </div>
</template>

<style scoped>
.list{
    line-height: 0.7em;
}
</style>

<script>
export default {
    props: ['rates'],
    data: () => ({
      currencies: ['PLN','USD', 'EUR']
    }),
    computed: {
        base() {
            return this.$store.getters.info.bill / (this?.rates['PLN'] / this?.rates['EUR'])
        }
    },
    methods: {
        getCurrency(currency) {
            return Math.floor(this.base * this.rates[currency])
        }
    }
}
</script>