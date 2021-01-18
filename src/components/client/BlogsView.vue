<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex
          xs12
          sm4
          md4
          v-for="blog in blogs"
          :key="blog.id"
          class="pa-2 py-4"
        >
          <v-card  flat class="shadow">
            <div class="inner">
              <v-img
                :src="blog.image"
                :alt="blog.title"
                class="img"
                lazy-src="../../assets/spinner.gif"
              ></v-img>
            </div>
            <div class="pa-2">
              <p>{{ blog.body | snipet }} [<v-btn text small class="my-purple" tile router :to="'/viewblog/' + blog.id">read</v-btn>]</p>
              
            </div>
           
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
    blogs() {
      return this.$store.getters.blogs;
    },
  },
  filters: {
    date(value) {
      return formatDistanceToNowStrict(new Date(value)) + " ago";
    },
     snipet(value) {
      return value.substr(0,109)+"...";
    },
  },
};
</script>

<style scoped>
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
.my-purple {
  color: #6c63ff !important;
}
</style>
