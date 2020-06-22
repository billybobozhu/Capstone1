import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/pages",
      name: "pages",
      component: () => import("./components/PagesList")
    },
    {
      path: "/pages/edit",
      name: "page-edit",
      component: () => import("./components/create")
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