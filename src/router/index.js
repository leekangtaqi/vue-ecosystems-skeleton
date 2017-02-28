import Vue from 'vue'
import Router from 'vue-router'
import Todos from 'components/Todos'
import Todo from 'components/Todo'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
import Draw from 'components/Draw'

Vue.use(Router)
Vue.use(VueRx, Rx)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    }
  ]
})
