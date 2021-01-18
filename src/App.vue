<template >
  <v-app class="bg">
    <AdminNavbar v-if="isadmin" />
    <ClientNavbar v-else />

    <transition :name="transition">
      <v-main>
        <router-view ></router-view>
      </v-main>
    </transition>
  </v-app>
</template>

<script>
//import navbars
import AdminNavbar from "@/components/ui/AdminNavbar.vue";
import ClientNavbar from "@/components/ui/ClientNavbar.vue";
import { auth } from "./components/firebase";
export default {
  name: "App",
  data() {
    return {
      isadmin: false,
      transition: "slide-left"
    };
  },
  components: {
    AdminNavbar,
    ClientNavbar
  },

  methods: {
    admin() {
      const user = auth.currentUser;
      if (user) {
        return (this.isadmin = true);
      }
    }
  },
  watch: {
    $route() {
      this.admin();
    }
  }
};
</script>

<style>
.bg{
  background-color:#ECF0F1 !important;
  min-height: 100vh;
}
</style>
