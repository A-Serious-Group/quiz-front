import { createRouter, createWebHistory } from 'vue-router'
// import LoginView from '../views/LoginView.vue'
import QuezzyView from '../views/QuezzyView.vue'


const routes = [
  {
    path: '/',
    name: 'QuezzyView',
    component: QuezzyView,
    meta: {
      title: 'Quezzy'
    }
  },
  // {
  //   path: '/login',
  //   name: 'LoginView',
  //   component: LoginView,
  //   meta: {
  //     title: 'Login'
  //   }
  // },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})


export default router