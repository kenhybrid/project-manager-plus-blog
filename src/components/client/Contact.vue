<template>
  <div>
    <v-container grid-list-md class="my-2">
      <v-form @submit.prevent>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 class="mx-2">
            <v-text-field
              autocomplete="off"
              v-model="name"
              label="Name"
              prepend-inner-icon="mdi-face-outline"
              required
              color="grey"
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 class="mx-2">
            <v-text-field
              autocomplete="off"
              label="Email"
              v-model="email"
              color="grey"
              prepend-inner-icon="mdi-email-plus-outline"
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md12 class="mx-2">
            <v-text-field
              v-model="subject"
              autocomplete="off"
              prepend-inner-icon="mdi-text-subject"
              label="Subject"
              color="grey"
              :error-messages="subjectErrors"
              @input="$v.subject.$touch()"
              @blur="$v.subject.$touch()"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 class="mx-2">
            <v-textarea
              clearable
              clear-icon="mdi-close"
              v-model="body"
              autocomplete="off"
              prepend-inner-icon="mdi-pencil-plus-outline"
              label="Body"
              color="grey"
              counter=""
              no-resize
              rows="5"
              :error-messages="bodyErrors"
              @input="$v.body.$touch()"
              @blur="$v.body.$touch()"
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
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "contact",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    body: { required },
    subject: { required },
    name: { required }
  },
  data() {
    return {
      name: "",
      subject: "",
      body: "",
      status: "unread",
      email: "",
      date: new Date().toISOString(),
      //functional
      loading: false
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
          .dispatch("createEmail", {
            email: this.email,
            name: this.name,
            subject: this.subject,
            body: this.body,
            date: this.date,
            status: this.status
          })
          .then(() => {
            this.loading = false;
            // this.$router.push("/projects");
          }, 300);
      }
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required!");
      return errors;
    },
    subjectErrors() {
      const errors = [];
      if (!this.$v.subject.$dirty) return errors;
      !this.$v.subject.required && errors.push("subject is required!");
      return errors;
    },
    bodyErrors() {
      const errors = [];
      if (!this.$v.body.$dirty) return errors;
      !this.$v.body.required && errors.push("body is required!");
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
</style>
