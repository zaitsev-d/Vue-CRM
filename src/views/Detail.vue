<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb">{{record.type === 'income' ? 'Income' : 'Expense'}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'expense',
            'green': record.type === 'income'
          }">
            <div class="card-content white-text">
              <p>Description: {{record.description}}</p>
              <p>Amount: {{record.amount | currency}}</p>
              <p>Category: {{record.categoryName}}</p>

              <small>Data: {{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>Record with this ID = {{$route.params.id}} not found.</p>
  </div>
</template>

<script>
export default {
  name: 'detail',
   metaInfo() {
    return {
      title: this.$title('Details')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('getRecordByID', id)
    const category = await this.$store.dispatch('fetchCategoryByID', record.categoryID)

    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false
  }
}
</script>