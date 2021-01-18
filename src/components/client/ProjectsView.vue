<template>
  <div>
    <v-container >
      <v-layout row wrap>
        <v-flex
          xs12
          sm4
          md3
          v-for="project in projects"
          :key="project.id"
          class="pa-2 py-4"
        >
          <v-card router :to="'/view/' + project.id" flat class="shadow">
            <div class="inner">
              <v-img
                :src="project.image"
                :alt="project.title"
                class="img"
                lazy-src="../../assets/spinner.gif"
              ></v-img>
            </div>
            <v-card-actions>
              <div>
                <v-icon left color="error">mdi-heart</v-icon>
                <small right>{{ project.likes }}</small>
              </div>
              <v-spacer></v-spacer>
              <small>{{ project.date | date }}</small>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { formatDistanceToNowStrict } from "date-fns";
export default {
  data() {
    return {};
  },
  computed: {
    projects() {
      return this.$store.getters.projects;
    },
  },
  filters: {
    date(value) {
      return formatDistanceToNowStrict(new Date(value)) + " ago";
    },
  },
};
</script>

<style>
.inner {
  overflow: hidden;
}
.shadow {
  box-shadow: 0 1px 1px 0 rgb(233, 230, 230) !important;
}
.img {
  transition: 1.5s ease-in-out;
  min-height: 30vh !important;
  max-height: 30vh !important;
}

.img:hover {
  transform: scale(1.2);
}
</style>
