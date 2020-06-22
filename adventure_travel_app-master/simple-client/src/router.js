import Vue from "vue";
import Router from "vue-router";
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: "/pages/edit",
      name: "page-edit",
      component: () => import("./components/create")
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./components/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./components/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./components/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./components/BoardUser.vue')
    },
    {
      path: "/pages",
      alias: "/pages",
      name: "pages",
      component: () => import("./components/PagesList")
    },
    {
      path: "/pages/:id",
      name: "page-details",
      component: () => import("./components/Page")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddPage")
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });