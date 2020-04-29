import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login"
import Profile from "@/components/Profile"
import Register from "@/components/Register"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
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
