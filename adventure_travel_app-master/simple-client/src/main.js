import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './styles/index.css'
import plugins from './plugin/index'
import { Button, Select, Dialog, Option, Switch, Tabs, TabPane, Message, MessageBox } from 'element-ui'
import iconfont from './assets/iconfont/iconfont.js'
Vue.use(plugins)
Vue.use(Button)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(TabPane)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(iconfont)
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
