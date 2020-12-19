<template>
  <div>
    <!-- mobile -->
    <v-card flat class="hidden-sm-and-up">
      <v-img :src="project.image" alt=""></v-img>
      <v-card-actions>
        <v-subheader class="heading-1">{{ project.title }}.</v-subheader>
        <v-spacer></v-spacer>
        <v-btn icon color="error" class="px-1">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <div class="px-1 heading-1">{{ project.likes }}</div>
      </v-card-actions>
      <v-card-text>
        <p>
          {{ project.description }}
        </p>

        <p>{{ project.category }}</p>
        <p>{{ project.date }}</p>
      </v-card-text>
    </v-card>

    <!-- desktop -->
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-card class="hidden-xs-only" flat>
          <v-img :src="project.image" alt=""></v-img>
          <v-card-actions>
            <h4>{{ project.title }}.</h4>
            <v-spacer></v-spacer>
            <v-btn icon color="error" class="px-1">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <div class="px-1">{{ project.likes }}</div>
          </v-card-actions>
          <v-card-text>
            <p>
              {{ project.description }}
            </p>
            <p>{{ project.category }}</p>
            <p>{{ project.date }}</p>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>

    <div>
      <v-btn color="error" @click="dialog = true" fab fixed bottom left
        ><v-icon>mdi-delete-empty-outline</v-icon></v-btn
      >
    </div>
    <edit :project="project" />
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

          <v-btn
            color="error darken-1"
            text
            @click="deleteimage(project.image)"
          >
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
import edit from "./Editproject";
import { storage } from "../firebase";
export default {
  props: ["id"],
  data() {
    return {
      dialog: false
    };
  },
  components: {
    edit
  },
  computed: {
    project() {
      return this.$store.getters.project(this.id);
    }
  },
  methods: {
    deleteimage(image) {
      const deleteImage = storage.refFromURL(image);
      deleteImage
        .delete()
        .then(() => {
          console.log("deleted");
          this.deletepost();
          setTimeout(() => {
            this.dialog = false;
            this.$router.push("/projects");
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletepost() {
      this.$store.dispatch("projectDelete", {
        id: this.id
      });
    }
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
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
