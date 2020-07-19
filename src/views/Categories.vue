<template>
    <div>
  <div class="page-title">
    <h3>Categories</h3>
  </div>
  <section>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <Create @created="addNewCategory"/>

      <Edit v-if="categories.length" :categories="categories"
      :key="categories.length + updateCount" @updated="updateCategories" />

      <p v-else class="center">Categories not yet</p>
    </div>
  </section>
</div>
</template>

<script>
import Create from '@/components/category/Create'
import Edit  from '@/components/category/Edit'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    Create, Edit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const index = this.categories.findIndex(c => c.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
