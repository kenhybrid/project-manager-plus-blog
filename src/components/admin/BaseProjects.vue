<template>
  <div>
    <v-container grid-list-md>
      <v-list subheader two-line>
        <!-- <v-subheader>Projects</v-subheader> -->
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
          v-for="project in filtered"
          :key="project.id"
          link
          router
          :to="'/view-project/' + project.id"
        >
          <v-list-item-avatar>
            <v-avatar size="40">
              <img :src="project.image" :alt="project.title" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ project.title }}</v-list-item-title>

            <v-list-item-subtitle>{{
              project.description
            }}</v-list-item-subtitle>
            <small>{{ project.date | date }}</small>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon router>
              <v-icon color="grey lighten-1">mdi-folder-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>

    <v-btn class="my-purple" fab bottom fixed right router to="/create-project">
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
    projects() {
      return this.$store.getters.projects;
    },
    filtered() {
      if (this.search == "") {
        return this.projects;
      } else {
        let match = this.search.toLowerCase();
        return this.projects.filter(project => {
          return (
            project.title.toLowerCase().match(match) ||
            project.category.toLowerCase().match(match) ||
            project.description.toLowerCase().match(match)
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
