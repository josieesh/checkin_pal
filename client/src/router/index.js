import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login"
import Profile from "@/components/Profile"
import Register from "@/components/Register"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: "Profile",
      component: Profile
    },
    {
      path: '/profile',
      name: "Profile",
      component: Profile
    },
    {
      path: '/register',
      name: "Register",
      component: Register
    }
  ]
})
