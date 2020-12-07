import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  { path: '/book',
    name: '图书管理',
    component: Layout,
    meta: { title: '图书管理', icon: 'documentation', roles: ['admin'] },
    redirect: '/book/create',
    children: [
      { path: '/book/create',
        component: () => import('@/views/book/create'),
        meta: { title: '上传图书', icon: 'edit', roles: ['admin'], activeMenu: '/book/create' }
      },
      {
        path: '/book/list',
        component: () => import('@/views/book/list'),
        meta: { title: '图书列表', icon: 'edit', roles: ['admin'] }
      },
      {
        path: '/book/aComponent',
        component: () => import('@/views/book/aComponent'),
        meta: { title: '测试', icon: 'skill', roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '/reviews',
    name: '简历管理',
    component: Layout,
    redirect: '/reviews/aModle',
    meta: { title: '简历管理', icon: 'documentation', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/reviews/aModle',
        component: () => import('@/views/reviews/aModle'),
        meta: { title: '简历', icon: 'example', roles: ['admin', 'editor'], activeMenu: '/reviews/aModle' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
