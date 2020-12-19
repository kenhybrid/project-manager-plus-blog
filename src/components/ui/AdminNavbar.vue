<template>
  <nav>
    <v-app-bar app color="white" dense>
      <v-btn
        icon
        class="my-purple"
        v-if="
          $route.name == 'create-project' ||
            $route.name == 'view-project' ||
            $route.name == 'create-blog' ||
            $route.name == 'view-blog'
        "
        @click="$router.go(-1)"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >

      <v-app-bar-nav-icon v-else @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-subheader v-if="$route.name == 'create-project'">
        NEW PROJECT</v-subheader
      >
      <v-subheader v-if="$route.name == 'view-project'">VIEW</v-subheader>
      <v-subheader v-if="$route.name == 'view-blog'">VIEW</v-subheader>
      <v-subheader v-if="$route.name == 'create-blog'">NEW BLOG</v-subheader>
      <v-subheader v-if="$route.name == 'projects'"> PROJECTS</v-subheader>
      <v-subheader v-if="$route.name == 'blogs'"> BLOGS</v-subheader>
      <v-subheader v-if="$route.name == 'dashboard'"> DASHBOARD</v-subheader>
      <v-subheader v-if="$route.name == 'emails'"> EMAILS</v-subheader>

      <v-spacer></v-spacer>
      <!-- <v-subheader class="hidden-sm-and-up">Admin</v-subheader> -->

      <v-toolbar-items class="">
        <v-avatar
          color="grey lighten-4"
          size="48"
          v-if="$route.name == 'dashboard'"
          ><v-icon>mdi-account</v-icon>
        </v-avatar>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app color="white">
      <v-list class="top">
        <v-img src="../../assets/b.svg"></v-img>
      </v-list>
      <v-list dense link class="top2">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          router
          :to="item.link"
          active-class="my-purple"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link router active-class="primary--text" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-3 mx-2"></v-divider>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          link: "/"
        },
        {
          icon: "mdi-folder-cog-outline",
          title: "Projects",
          link: "/projects"
        },
        { icon: "mdi-pencil-plus-outline", title: "Blogs", link: "/blogs" },
        { icon: "mdi-email-outline", title: "Emails", link: "/emails" }
      ]
    };
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace("/home");
        this.$router.go(0);
      });
    }
  }
};
</script>

<style scoped>
.my-purple {
  color: #6c63ff !important;
}
.top {
  margin-top: -8px !important;
}
.top2 {
  margin-top: -16px !important;
}
</style>
