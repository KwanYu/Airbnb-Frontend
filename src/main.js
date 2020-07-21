import Vue from 'vue'
import App from '../public/App.vue'
import vuetify from './plugins/vuetify';
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'


Vue.config.productionTip = false

const datepickerOptions = {}
Vue.use(AirbnbStyleDatepicker, datepickerOptions)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

