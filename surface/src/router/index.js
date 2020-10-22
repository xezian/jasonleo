import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/blog",
    name: "Blog",
    props: true,
    component: () => import(/* webpackChunkName: "blog" */ "../pages/Blog.vue"),
  },
  {
    path: "/blog/:postId",
    name: "BlogPost",
    props: true,
    component: () => import(/* webpackChunkName: "blog" */ "../pages/Blog.vue"),
  },
  {
    path: "/about",
    name: "About",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/About.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    props: true,
    component: () =>
      import(/* webpackChunkName: "manage" */ "../pages/Contact.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    props: true,
    component: () =>
      import(/* webpackChunkName: "manage" */ "../pages/Admin.vue"),
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: '404' */ "../components/Landing.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
