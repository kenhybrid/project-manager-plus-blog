<template>
  <div>
    <!-- mobile -->
    <v-card flat class="hidden-sm-and-up">
      <v-img :src="blog.image" alt="" lazy-src="../../assets/spinner.gif"></v-img>
      <v-card-actions>
        <v-subheader class="heading-1">{{ blog.title }}.</v-subheader>
        <v-spacer></v-spacer>
        <v-btn icon color="error" class="px-1">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <div class="px-1 heading-1">{{ blog.likes }}</div>
      </v-card-actions>
      <v-card-text>
        <p>
          {{ blog.body }}
        </p>

        <p>{{ blog.category }}</p>
        <p>{{ blog.date }}</p>
      </v-card-text>
    </v-card>

    <!-- desktop -->
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-card class="hidden-xs-only" flat>
          <v-img :src="blog.image" alt="" lazy-src="../../assets/spinner.gif"></v-img>
          <v-card-actions>
            <h4>{{ blog.title }}.</h4>
            <v-spacer></v-spacer>
            <v-btn icon color="error" class="px-1">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <div class="px-1">{{ blog.likes }}</div>
          </v-card-actions>
          <v-card-text>
            <p>
              {{ blog.body }}
            </p>
            <p>{{ blog.category }}</p>
            <p>{{ blog.date }}</p>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>

    <div>
      <v-btn color="error" @click="dialog = true" fab fixed bottom left
        ><v-icon>mdi-delete-empty-outline</v-icon></v-btn
      >
    </div>
    <edit :blog="blog" />
    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-img src="../../assets/delete.gif"></v-img>
        <v-card-actions>
          <v-btn color="primary darken-1" text @click="dialog = false">
            <span left>Close</span>
            <v-icon right>mdi-window-close</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn color="error darken-1" text @click="deleteimage(blog.image)">
            <v-icon left>mdi-delete-outline</v-icon>
            <span right>Delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog -->
  </div>
</template>
<script>
import edit from "./Editblog";

import { storage } from "../firebase";
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    edit,
  },
  computed: {
    blog() {
      return this.$store.getters.blog(this.id);
    },
  },
  methods: {
    deleteimage(image) {
      const deleteImage = storage.refFromURL(image);
      deleteImage
        .delete()
        .then(() => {
          console.log("deleted");
          this.deletepost();
          this.dialog = false;

          setTimeout(() => {
            this.$router.push("/blogs");
          }, 300);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletepost() {
      this.$store.dispatch("blogDelete", {
        id: this.id,
      });
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
