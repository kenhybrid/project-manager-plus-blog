<template>
  <div>
    <v-container grid-list-md>
      <v-list subheader two-line>
        <!-- <v-subheader>blogs</v-subheader> -->
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-text-field
              rounded
              v-model="search"
              persistent-hint
              hint="For example, fashion or used cotton"
              prepend-inner-icon="mdi-magnify"
              autocomplete="off"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-list-item
          v-for="blog in filtered"
          :key="blog.id"
          link
          router
          :to="'/view-blog/' + blog.id"
        >
          <v-list-item-avatar>
            <v-avatar size="40">
              <img :src="blog.image" :alt="blog.title" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ blog.title }}</v-list-item-title>

            <v-list-item-subtitle>{{ blog.body }}</v-list-item-subtitle>
            <small>{{ blog.date | date }}</small>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon router>
              <v-icon color="grey lighten-1">mdi-post-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>

    <v-btn class="my-purple" fab bottom fixed right router to="/create-blog">
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { formatDistanceToNowStrict } from "date-fns";
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    blogs() {
      return this.$store.getters.blogs;
    },
    filtered() {
      if (this.search == "") {
        return this.blogs;
      } else {
        let match = this.search.toLowerCase();
        return this.blogs.filter(blog => {
          return (
            blog.title.toLowerCase().match(match) ||
            blog.category.toLowerCase().match(match) ||
            blog.body.toLowerCase().match(match)
          );
        });
      }
    }
  },
  filters: {
    date(value) {
      return formatDistanceToNowStrict(new Date(value));
    }
  }
};
</script>

<style scoped>
.my-purple {
  background-color: #6c63ff !important;
}
.my-purple-text {
  color: #6c63ff !important;
}
</style>
