import { createRouter, createWebHistory } from 'vue-router'
import ManageQuiz from '../views/ManageQuiz.vue'
import QuezzyView from '../views/QuezzyView.vue'
import NotFound from '../views/NotFound'


const routes = [
  {
    path: '/',
    name: 'QuezzyView',
    component: QuezzyView,
    meta: {
      title: 'Quezzy'
    }
  },
  {
    path: '/manage-quiz',
    name: 'ManageQuiz',
    component: ManageQuiz,
    meta: {
      title: 'Gerenciar Quiz'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: 'Não Encontrado'
    }
  }
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