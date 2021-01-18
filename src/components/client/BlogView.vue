<template>
  <div>
    <!-- mobile -->
    <v-card flat class="hidden-sm-and-up">
      <v-img
        :src="blog.image"
        alt=""
        lazy-src="../../assets/spinner.gif"
      ></v-img>
      <v-card-actions>
        <v-subheader class="heading-1">{{ blog.title }}.</v-subheader>
        <v-spacer></v-spacer>
        <v-btn icon color="error" class="px-1" @click.once="like">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <div class="px-1 heading-1">{{ blog.likes }}</div>
      </v-card-actions>
      <v-card-text>
        <p>
          {{ blog.body }}
        </p>

        <p>{{ blog.category }}</p>
        <p>{{ blog.date | date }}</p>
      </v-card-text>
    </v-card>

    <!-- desktop -->
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-card class="hidden-xs-only" flat>
          <v-img
            :src="blog.image"
            alt=""
           
            lazy-src="../../assets/spinner.gif"
          >
          </v-img>
          <v-card-actions>
            <h4>{{ blog.title }}.</h4>
            <v-spacer></v-spacer>
            <v-btn icon color="error" class="px-1" @click.once="like">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <div class="px-1">{{ blog.likes }}</div>
          </v-card-actions>
          <v-card-text>
            <p>
              {{ blog.body }}
            </p>
            <p>{{ blog.category }}</p>
            <p>{{ blog.date | date }}</p>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { formatDistanceToNowStrict } from "date-fns";

export default {
  props: ["id"],

  computed: {
    blog() {
      return this.$store.getters.blog(this.id);
    },
  },
  filters: {
    date(value) {
      return formatDistanceToNowStrict(new Date(value)) + " ago";
    },
  },
};
</script>

<style scoped>
.heading-1 {
  font-size: 18px !important;
  font-weight: 600;
}
.my-purple {
  background-color: #6c63ff !important;
}
.my-purple-text {
  color: #6c63ff !important;
}
p {
  font-size: 18px !important;
}
</style>
