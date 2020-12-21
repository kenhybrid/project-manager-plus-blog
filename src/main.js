import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";

import { auth } from "./components/firebase";

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App),
      created() {
        this.$store.dispatch("loadBlogs");
        this.$store.dispatch("loadEmails");
        this.$store.dispatch("loadProjects");
      }
    }).$mount("#app");
  }
});
