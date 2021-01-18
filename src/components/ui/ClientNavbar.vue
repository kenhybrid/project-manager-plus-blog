<template>
  <nav>
    <v-app-bar app color="white" dense>
      <v-btn
        icon
        class="my-purple"
        v-if="$route.name == 'reset-password' || $route.name == 'view'|| $route.name == 'viewblog'"
        @click="go"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >

      <v-app-bar-nav-icon
        v-else
        class="hidden-sm-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
       <v-subheader v-if="$route.name == 'blogs-view'">BLOGS</v-subheader>
       <v-subheader v-if="$route.name == 'project-view'">PROJECTS</v-subheader>
       <v-subheader v-if="$route.name == 'about'">ABOUT</v-subheader>
       <v-subheader v-if="$route.name == 'contact'">CONTACT US</v-subheader>
      <v-spacer></v-spacer>
      <v-subheader class="hidden-sm-and-up">Client</v-subheader>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn text router to="/home">
          <span>home</span>
        </v-btn>
        <v-btn tile text router class="text--green" to="/about">
          <span>about</span>
        </v-btn>
        <v-btn tile text router to="/projects-view">
          <span>projects</span>
        </v-btn>
        <v-btn tile text router to="/blogs-view">
          <span>blogs</span>
        </v-btn>
        <v-btn tile text router to="/contact">
          <span>contact</span>
        </v-btn>

        <v-btn tile text router to="/login">
          <span>auth</span>
        </v-btn>
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

        <v-divider class="my-3 mx-2"></v-divider>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-home-outline",
          title: "Home",
          link: "/home",
        },
        { icon: "mdi-help-rhombus-outline", title: "About", link: "/about" },
        {
          icon: "mdi-folder-cog-outline",
          title: "Projects",
          link: "/projects-view",
        },{
          icon: "mdi-post-outline",
          title: "Blogs",
          link: "/blogs-view",
        },
        { icon: "mdi-phone-outline", title: "Contact Us", link: "/contact" },
        { icon: "mdi-cog-outline", title: "Admin", link: "/login" },
      ],
    };
  },
  methods: {
    go() {
      setTimeout(() => {
        this.$router.go(-1);
      }, 100);
    },
  },
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
}</style>
