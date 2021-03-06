<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{info.bill | currency('PLN')}}</h4>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Categories not yet. 
      <router-link to="/categories">Add a new category</router-link></p>

    <section v-else>
      <div v-for="category of categories"
      :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency}} from {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div class="determinate" :class="[category.progressColor]"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
   metaInfo() {
    return {
      title: this.$title('Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('getRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(category => {
      const spend = records.filter(r => r.categoryID === category.id)
      .filter(r => r.type === 'expense')
      .reduce((total, record) => {
        return total += +record.amount
      }, 0)

      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = category.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Excess by' : 'Remaining: '} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>