import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueApollo from 'vue-apollo';
import apolloClient from '@/apollo';
import VuePageTransition from 'vue-page-transition';

Vue.use(VueApollo);
Vue.use(VuePageTransition);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  VuePageTransition,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
