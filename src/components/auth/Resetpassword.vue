<template>
  <div>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12 sm6 md6>
          <img src="../../assets/person.svg" class="img" />
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-container grid-list-xs>
            <v-layout column wrap>
              <v-flex sm8 offset-sm2>
                <v-form @submit.prevent="" class="form">
                  <img src="../../assets/avatar.svg" class="avatar" alt="" />
                  <v-subheader class="center">RESET PASSWORD</v-subheader>
                  <v-text-field
                    label="email"
                    :error-messages="emailErrors"
                    prepend-inner-icon="mdi-email-outline"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    color="grey"
                    v-model="email"
                  ></v-text-field>

                  <v-btn
                    class="my-purple mt-5"
                    block
                    large
                    @click="reset"
                    :loading="loading"
                  >
                    <span left class="white--text">Reset</span>
                    <v-icon small right color="white">mdi-lock-reset</v-icon>
                  </v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

import { auth } from "../firebase";
export default {
  name: "Auth",
  mixins: [validationMixin],
  validations: {
    email: { required, email }
  },
  data() {
    return {
      email: "",
      loading: false
    };
  },
  methods: {
    reset() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        //invalid
      } else {
        //valid
        this.loading = true;

        auth
          .sendPasswordResetEmail(this.email, {
            url: "http://localhost:4200/auth"
          })
          .then(() => {
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          })
          .catch(() => {
            console.log("email is not registered");
          });
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
    }
  }
};
</script>

<style scoped>
.center {
  margin: 0;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.my-purple {
  background-color: #6c63ff !important;
}
.my-purple-text {
  color: #6c63ff !important;
}
.avatar {
  width: 80px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}
.form {
  margin-top: 80px;
  margin-bottom: 100px;
}
.img {
  display: flex;
  margin-top: 60px;
  margin-bottom: 60px;
  justify-content: flex-end;
  align-items: center;
  vertical-align: middle;
  width: 520px;
}

@media screen and (max-width: 1050px) {
  .img {
    width: 400px;
    margin-top: 160px;
    margin-bottom: 160px;
  }
}

@media screen and (max-width: 900px) {
  .img {
    width: 300px;
  }
}

@media screen and (max-width: 570px) {
  .img {
    display: none;
  }

  .wave {
    display: none;
  }

  .login-content {
    justify-content: center;
  }
}
</style>
