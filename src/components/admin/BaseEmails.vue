<template>
  <div>
    <v-container grid-list-md>
      <v-list subheader two-line>
        <v-card
          flat
          v-for="email in filtered"
          :key="email.id"
          link
          router
          :to="'/view-email/' + email.id"
          :class="email.status"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="40">
                <v-icon color="error">mdi-email-outline</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ email.subject }}</v-list-item-title>

              <v-list-item-subtitle>{{ email.body }}</v-list-item-subtitle>
              <small>{{ email.date | date }}</small>
            </v-list-item-content>
            <v-list-item-action>
              <v-badge
                v-if="email.status == 'unread'"
                dot
                color="error"
                overlap
              >
                <v-icon color="grey lighten-1">mdi-page-next-outline</v-icon>
              </v-badge>
              <v-icon v-else class="my-purple-text">mdi-check</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </v-card>
        <!-- <v-subheader>emails</v-subheader> -->
        <!-- <v-layout row wrap>
          <v-flex xs12 sm12 md12>
             <v-text-field
              rounded
              v-model="search"
              persistent-hint
              hint="Email by subjectn"
              prepend-inner-icon="mdi-magnify"
              autocomplete="off"
            ></v-text-field> -->
        <!--  
          </v-flex>
        </v-layout> -->
        <!-- <v-divider></v-divider> -->
      </v-list>
    </v-container>
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
    emails() {
      return this.$store.getters.emails;
    },
    filtered() {
      if (this.search == "") {
        return this.emails;
      } else {
        let match = this.search.toLowerCase();
        return this.emails.filter(email => {
          return (
            email.subject.toLowerCase().match(match) ||
            email.body.toLowerCase().match(match)
          );
        });
      }
    }
  },
  filters: {
    date(value) {
      return formatDistanceToNowStrict(new Date(value)) + " ago";
    }
  }
};
</script>

<style scoped>
.read {
  background-color: rgb(237, 237, 248) !important;
}
.my-purple {
  background-color: #6c63ff !important;
}
.my-purple-text {
  color: #6c63ff !important;
}
</style>
