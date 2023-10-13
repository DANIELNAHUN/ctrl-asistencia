import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token')

  if(token) return true;
  return false
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.meta.needsAuth){
    if (isUserLoggedIn()){
      next();
    }
    else{
      next("/login");
    }
  } else{
    next();
  }
} )

export default router
