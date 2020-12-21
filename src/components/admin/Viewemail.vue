<template>
  <div>
    <!-- mobile -->
    <v-card flat class="hidden-sm-and-up">
      <v-card-actions>
        <v-subheader class="heading-1">{{ email.subject }}.</v-subheader>
      </v-card-actions>
      <v-card-text>
        <p>
          {{ email.body }}
        </p>
        <p>{{ email.email }} || {{ email.name }}</p>
        <p>{{ email.date }}</p>
      </v-card-text>
    </v-card>

    <!-- desktop -->
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-card class="hidden-xs-only" flat>
          <v-card-actions>
            <h4>{{ email.subject }}</h4>
          </v-card-actions>
          <v-card-text>
            <p>
              {{ email.body }}
            </p>

            <p>{{ email.date }}</p>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>

    <div>
      <v-btn color="error" @click="dialog = true" fab fixed bottom right
        ><v-icon>mdi-delete-empty-outline</v-icon></v-btn
      >
    </div>

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

          <v-btn color="error darken-1" text @click="deleteemail">
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
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
      status: "read"
    };
  },

  computed: {
    email() {
      return this.$store.getters.email(this.id);
    }
  },
  methods: {
    deleteemail() {
      this.$store
        .dispatch("emailDelete", {
          id: this.id
        })
        .then(() => {
          this.dialog = false;
          setTimeout(() => {
            this.$router.push("/emails");
          }, 300);
        });
    }
  },
  created() {
    this.$store.dispatch("isRead", {
      id: this.id,
      status: this.status
    });
  }
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
