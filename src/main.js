import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';

import {Button,NavBar,Icon,CellGroup,Field,Tabbar,TabbarItem,Cell} from 'vant'

Vue.use(ElementUI);

Vue.use(Button);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Cell);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,store
}).$mount('#app');
