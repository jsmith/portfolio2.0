import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';
import 'vue-material-design-icons/styles.css';
import './global.css';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
