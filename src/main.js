import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueChatScroll);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
