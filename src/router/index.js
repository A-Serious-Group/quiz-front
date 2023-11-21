import { createRouter, createWebHistory } from 'vue-router'
import ManageQuiz from '../views/ManageQuiz.vue'
import AllGames from '../views/AllGames.vue'
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
    },
    beforeEnter: (to, from, next) => {
      
      const token = localStorage.getItem('access_token');
      const user  = localStorage.getItem('userInfo');

      if (token && user) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/all-games',
    name: 'AllGames',
    component: AllGames,
    meta: {
      title: 'Todos os Games'
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