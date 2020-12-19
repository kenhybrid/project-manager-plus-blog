import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../components/firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../components/admin/Dashboard.vue"
      )
  },
  {
    path: "/projects",
    name: "projects",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: " projects" */ "../components/admin/BaseProjects.vue"
      )
  },
  {
    path: "/create-project",
    name: "create-project",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "create-project" */ "../components/admin/Createproject.vue"
      )
  },
  {
    path: "/view-project/:id",
    name: "view-project",
    props: true,
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "view-project" */ "../components/admin/Viewproject.vue"
      )
  },

  {
    path: "/blogs",
    name: "blogs",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: " blogs" */ "../components/admin/BaseBlogs.vue"
      )
  },
  {
    path: "/create-blog",
    name: "create-blog",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: " create-blog" */ "../components/admin/Createblog.vue"
      )
  },
  {
    path: "/view-blog/:id",
    name: "view-blog",
    props: true,
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: " view-blog" */ "../components/admin/Viewblog.vue"
      )
  },

  {
    path: "/emails",
    name: "emails",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: " email" */ "../components/admin/BaseEmails.vue"
      )
  },
  {
    path: "/settings",
    name: "settings",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: " settings" */ "../components/admin/Settings.vue"
      )
  },
  {
    path: "/login",
    name: "login",
    meta: { requiresGuest: true },
    component: () =>
      import(/* webpackChunkName: " login" */ "../components/auth/Login.vue")
  },
  {
    path: "/reset-password",
    name: "reset-password",
    meta: { requiresGuest: true },
    component: () =>
      import(
        /* webpackChunkName: " reset-password" */ "../components/auth/Resetpassword.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //check for requiresauthguard
    if (!auth.currentUser) {
      //go to login
      next({
        path: "/home",
        query: {
          redirect: to.fullpath
        }
      });
    } else {
      //proced to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //if logged in
    if (auth.currentUser) {
      //go to login
      next({
        path: "/",
        query: {
          redirect: to.fullpath
        }
      });
    } else {
      //proced to route
      next();
    }
  } else {
    //proced to route
    next();
  }
});
export default router;
