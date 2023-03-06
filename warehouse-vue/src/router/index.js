import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Show/Home'
import Page from '@/components/Page'
import Back from '@/components/Show/Back'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', // Set default path
      name: 'Page',
      component: Page,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/page',
      name: 'Page',
      component: Page,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/back',
      name: 'Back',
      component: Back,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [ // Set sub route of home
        {
          path: '/worker',
          name: 'Worker',
          component: () => import('../components/Show/Worker'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/newworker',
          name: 'NewWorker',
          component: () => import('../components/Show/NewWorker'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/house',
          name: 'House',
          component: () => import('../components/Show/House'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/goodin',
          name: 'GoodIn',
          component: () => import('../components/Show/GoodIn'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/goodout',
          name: 'GoodOut',
          component: () => import('../components/Show/GoodOut'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/newgood',
          name: 'NewGood',
          component: () => import('../components/Show/NewGood'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login')
    },
    {
      path: '*',
      component: () => import('../components/pages/Error404')
    }
  ]
})

export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Catalogue',
      // redirect: '/home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login')
    },
    {
      path: '*',
      component: () => import('../components/pages/Error404')
    }
  ]
})
