<template>
  <div>
    <v-container grid-list-md class="my-2">
      <v-form @submit.prevent>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 class="mx-2">
            <v-text-field
              autocomplete="off"
              label="Title"
              v-model="title"
              color="grey"
              prepend-inner-icon="mdi-book-plus-multiple-outline"
              :error-messages="titleErrors"
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 class="mx-2">
            <div>
              <input
                type="file"
                style="display: none"
                ref="imageinput"
                accept="image/*"
                @change="fileUpload"
              />

              <v-text-field
                autocomplete="off"
                v-model="name"
                label="Image"
                chips
                @click="$refs.imageinput.click()"
                prepend-inner-icon="mdi-image-outline"
                required
                color="grey"
                :error-messages="nameErrors"
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md12 class="pa-2" v-if="uploading">
            <v-progress-circular
              :value="progress"
              size="80"
              class="center my-purple-text"
              width="5"
            ></v-progress-circular>
          </v-flex>
          <v-flex xs12 sm12 md12 class="px-2" v-if="preview">
            <v-img
              :src="image"
              :alt="name"
              class="preview"
              @click="dialog = true"
            ></v-img>
          </v-flex>
          <v-flex xs12 sm12 md12 class="mx-2">
            <v-select
              v-model="category"
              autocomplete="off"
              prepend-inner-icon="mdi-list-status"
              label="Category"
              color="grey"
              :items="items"
              :error-messages="categoryErrors"
              @input="$v.category.$touch()"
              @blur="$v.category.$touch()"
            ></v-select>
          </v-flex>
          <v-flex xs12 sm12 md12 class="mx-2">
            <v-textarea
              clearable
              clear-icon="mdi-close"
              v-model="description"
              autocomplete="off"
              prepend-inner-icon="mdi-pencil-plus-outline"
              label="Description"
              color="grey"
              counter=""
              no-resize
              rows="5"
              :error-messages="descriptionErrors"
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
            ></v-textarea>
          </v-flex>
          <v-flex xs12 sm12 md12 class="ma-2">
            <v-btn
              color="my-purple white--text"
              block
              tile
              @click="upload"
              :loading="loading"
              >upload</v-btn
            >
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-img src="../../assets/delete.gif"></v-img>
        <v-card-actions>
          <v-btn color="primary darken-1" text @click="dialog = false">
            <span left>Ok</span>
            <v-icon right>mdi-window-close</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn color="error darken-1" text @click="deleteimage(image)">
            <v-icon left>mdi-delete-outline</v-icon>
            <span right>Remove</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog -->
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { storage } from "../firebase";
export default {
  name: "create-project",
  mixins: [validationMixin],
  validations: {
    title: { required },
    description: { required },
    category: { required },
    name: { required }
  },
  data() {
    return {
      name: "",
      category: "",
      description: "",
      image: "",
      title: "",
      likes: 0,
      date: new Date().toISOString(),
      //functional
      loading: false,
      dialog: false,
      uploading: false,
      progress: 0,
      preview: false,
      items: ["Fashion", "Beauty", "Celebrity", "Music"]
    };
  },
  methods: {
    upload() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        //invalid
      } else {
        this.loading = true;

        this.$store
          .dispatch("createproject", {
            title: this.title,
            category: this.category,
            description: this.description,
            date: this.date,
            likes: this.likes,
            image: this.image
          })
          .then(() => {
            this.loading = false;
            this.$router.push("/projects");
          }, 300);
      }
    },
    fileUpload(e) {
      // get file from imput
      this.uploading = true;
      let file = e.target.files[0];
      this.name = file.name;
      const filename = new Date().toISOString() + "-" + file.name;
      const bucket = storage.ref("projects/" + filename);
      let uploadTask = bucket.put(file);

      //upload event
      uploadTask.on(
        "state_change",
        //uplod progress
        snapshot => {
          let percentage = parseInt(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + percentage + "% done");
          this.progress = percentage;
        },
        //error on upload
        error => {
          console.log(error);
        },
        //sucess after upload
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            this.image = downloadURL;
            this.uploading = false;
          });
        }
      );
    },
    deleteimage(image) {
      this.image = "";
      this.dialog = false;
      const deleteImage = storage.refFromURL(image);
      deleteImage
        .delete()
        .then(() => {
          console.log("deleted");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Title is required!");
      return errors;
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.category.$dirty) return errors;
      !this.$v.category.required && errors.push("Category is required!");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Description is required!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("File is required!");
      return errors;
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
.preview {
  box-shadow: 0 1px 1px 0 #5a5a5c;
  border-radius: 3px;
}
.center {
  margin: 0;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
