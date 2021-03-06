import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import VueMeta from 'vue-meta'
import './registerServiceWorker'
import router from './router'
import store from './store'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyApDCwAw7pkBI-i6cLdyDba0eXDoeEJkf4',
  authDomain: 'vue-crm-database.firebaseapp.com',
  databaseURL: 'https://vue-crm-database.firebaseio.com',
  projectId: 'vue-crm-database',
  storageBucket: 'vue-crm-database.appspot.com',
  messagingSenderId: '740895172989',
  appId: '1:740895172989:web:f3639bff51e4fe898d4414',
  measurementId: 'G-Z428D00GQ3'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
