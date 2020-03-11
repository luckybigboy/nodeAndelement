import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Axios from 'axios';

Vue.prototype.$http = Axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 3000
})

Vue.config.productionTip = false

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.auth)) {
    if (sessionStorage.getItem('token')) {
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
});

// 提示框的封装

Vue.prototype.$msgBox = function tip (msg = '你确定要离开页面', title = '警告', settings = {}) {
  Object.assign(settings, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
    dangerouslyUseHTMLString: true
  });
  return this.$confirm(`<p style="font-weight:bold">${msg}</p>`, title, settings);
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
