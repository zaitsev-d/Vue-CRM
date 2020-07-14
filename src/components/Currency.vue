<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Exchange rate</span>
            </div>
            <table>
              <thead>
              <tr>
                <th>Currency</th>
                <th>Course</th>
                <th>Data</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="cur of currencies"
              :key="cur" class="list">
                <td>{{cur}}</td>
                <td>{{rates[cur].toFixed(5)}}</td>
                <td>{{date | date('date')}}</td>
              </tr>
              </tbody>
            </table>
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
    props: ['rates', 'date'],
    data: () => ({
        currencies: ['USD', 'EUR', 'PLN']
    })
}
</script>