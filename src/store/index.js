import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth'
import Info from './info'
import Category from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
    async infoCurrency() {
      const key = process.env.VUE_APP_FIXER
      const response = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,PLN,RUB,UAH`)
      return await response.json()
    }
  },
  modules: {
    Auth, Info, Category
  }
})
