<template>
  <div>
    <div class="page-title">
      <h3>Record History</h3>
    </div>

    <div style="width: 43%; height: 43%;" class="history-chart">
      <canvas ref="canvas" width="100" height="100"></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Records not yet. 
      <router-link to="/record">Add a new record</router-link></p>

    <section style="margin-top: 5%;" v-else>
      <Table :records="items" />
      <Paginate
       v-model="page"
       :page-count="pageCount"
       :click-handler="pageChangeHandler"
       :prev-text="'Prev'"
       :next-text="'Next'"
       :container-class="'pagination'"
       :page-class="'waves-effect'"/>
    </section>
  </div>
</template>

<script>
import PaginationMixin from '@/mixins/pagination.mixin'
import Table from '@/components/history/Table'
import {Pie} from 'vue-chartjs'

export default {
  name: 'history',
   metaInfo() {
    return {
      title: this.$title('History')
    }
  },
  extends: Pie,
  mixins: [PaginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted(){
    this.records = await this.$store.dispatch('getRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)
    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryID).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Expense',
        }
      }))


      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
            label: 'Expenses by categories',
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryID === c.id && r.type === 'expense') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      })
    }
  },
  watch: {
    '$route'(to, from){
      if (!to.query.page){
        this.pageChangeHandler(1);
        this.page = 1;
      }
    }
  },
  components: {
    Table
  }
}
</script>