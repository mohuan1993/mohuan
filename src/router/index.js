import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Mycourse from '@/components/Mycourse'
import Discover from '@/components/Discover'
import Account from '@/components/Account'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/mycourse',
      name: 'Mycourse',
      component: Mycourse
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    }
  ]
})
