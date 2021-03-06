import Vue from "vue";
import Vuex from "vuex";
import { db } from "../components/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    blogs: [],
    emails: [],
  },
  getters: {
    projects(state) {
      return state.projects;
    },
    project(state) {
      return (id) => {
        return state.projects.find((project) => {
          return project.id === id;
        });
      };
    },
    blogs(state) {
      return state.blogs;
    },
    blog(state) {
      return (id) => {
        return state.blogs.find((blog) => {
          return blog.id === id;
        });
      };
    },
    emails(state) {
      return state.emails;
    },
    email(state) {
      return (id) => {
        return state.emails.find((email) => {
          return email.id === id;
        });
      };
    },
    emailnotification(state) {
      return state.emails.filter((email) => {
        if (email.status == "unread") {
          return true;
        }
      });
    },
  },
  /*
   * mutations*
   * that mutate the state*
   */
  mutations: {
    loadprojects(state, payload) {
      state.projects = payload;
    },
    createproject(state, projectdata) {
      state.projects.push(projectdata);
    },
    loadblogs(state, payload) {
      state.blogs = payload;
    },
    loademails(state, payload) {
      state.emails = payload;
    },
    createblog(state, blogdata) {
      state.blogs.push(blogdata);
    },
    createemail(state, emaildata) {
      state.emails.push(emaildata);
    },
    deleteproject(state, payload) {
      var index = state.projects.findIndex((project) => {
        return payload.id == project.id;
      });
      state.projects.splice(index, 1);
    },
    deleteblog(state, payload) {
      var index = state.blogs.findIndex((blog) => {
        return payload.id == blog.id;
      });
      state.blogs.splice(index, 1);
    },
    deletemail(state, payload) {
      var index = state.emails.findIndex((email) => {
        return payload.id == email.id;
      });
      state.emails.splice(index, 1);
    },
    likedproject(state, payload) {
      const project = state.projects.find((project) => {
        return project.id === payload.id;
      });
      if (payload.likes) {
        project.likes = payload.likes;
      }
    },
    updateproject(state, payload) {
      const project = state.projects.find((project) => {
        return project.id === payload.id;
      });
      if (payload.title) {
        project.title = payload.title;
      }
      if (payload.description) {
        project.description = payload.description;
      }
      if (payload.category) {
        project.category = payload.category;
      }
      if (payload.image) {
        project.image = payload.image;
      }
      if (payload.likes) {
        project.likes = payload.likes;
      }
      if (payload.date) {
        project.date = payload.date;
      }
    },
    updateblog(state, payload) {
      const blog = state.blogs.find((blog) => {
        return blog.id === payload.id;
      });
      if (payload.title) {
        blog.title = payload.title;
      }
      if (payload.body) {
        blog.body = payload.body;
      }
      if (payload.category) {
        blog.category = payload.category;
      }
      if (payload.image) {
        blog.image = payload.image;
      }
      if (payload.likes) {
        blog.likes = payload.likes;
      }
      if (payload.date) {
        blog.date = payload.date;
      }
    },
    isread(state, payload) {
      const email = state.emails.find((email) => {
        return email.id === payload.id;
      });
      if (payload.status) {
        email.status = payload.status;
      }
    },
  },
  /*
   * actions*
   * that assync the mutations*
   */
  actions: {
    loadProjects({ commit }) {
      db.collection("projects")
        .orderBy("date", "desc")
        .get()
        .then((querySnapshot) => {
          const projects = [];
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              category: doc.data().category,
              date: doc.data().date,
              likes: doc.data().likes,
              image: doc.data().image,
            };
            projects.push(data);
            console.log(doc.id, " => ", doc.data());
          });
          commit("loadprojects", projects);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    createproject({ commit }, payload) {
      const project = {
        title: payload.title,
        category: payload.category,
        description: payload.description,
        date: payload.date,
        likes: payload.likes,
        image: payload.image,
      };
      db.collection("projects")
        .add(project)
        .then((doc) => {
          const id = doc.id;
          console.log("Document successfully written!");
          console.log(id);
          const projectdata = {
            id: id,
            title: payload.title,
            category: payload.category,
            description: payload.description,
            date: payload.date,
            likes: payload.likes,
            image: payload.image,
          };
          commit("createproject", projectdata);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    like({ commit }, payload) {
      const likeproject = {};
      if (payload.likes) {
        likeproject.likes = payload.likes;
      }
      console.log(payload);
      db.collection("projects")
        .doc(payload.id)
        .update(likeproject)
        .then(() => {
          commit("likedproject", payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProject({ commit }, payload) {
      const updateproject = {};
      if (payload.title) {
        updateproject.title = payload.title;
      }
      if (payload.image) {
        updateproject.image = payload.image;
      }
      if (payload.category) {
        updateproject.category = payload.category;
      }
      if (payload.description) {
        updateproject.description = payload.description;
      }
      if (payload.date) {
        updateproject.date = payload.date;
      }
      if (payload.likes) {
        updateproject.likes = payload.likes;
      }
      db.collection("projects")
        .doc(payload.id)
        .update(updateproject)
        .then(() => {
          commit("updateproject", payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    projectDelete({ commit }, payload) {
      db.collection("blog")
        .doc(payload.id)
        .delete()
        .then(() => {
          console.log("successfully deleted");
          commit("deleteproject", payload);
        })
        .catch(() => {
          console.log("error while deleting");
        });
    },
    /*emails


    */
    loadBlogs({ commit }) {
      db.collection("blogs")
        .orderBy("date", "desc")
        .get()
        .then((querySnapshot) => {
          const blogs = [];
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              body: doc.data().body,
              category: doc.data().category,
              date: doc.data().date,
              likes: doc.data().likes,
              image: doc.data().image,
            };
            blogs.push(data);
            console.log(doc.id, " => ", doc.data());
          });
          commit("loadblogs", blogs);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    blogDelete({ commit }, payload) {
      db.collection("blogs")
        .doc(payload.id)
        .delete()
        .then(() => {
          console.log("successfully deleted");
          commit("deleteblog", payload);
        })
        .catch(() => {
          console.log("error while deleting");
        });
    },
    createblog({ commit }, payload) {
      const blog = {
        title: payload.title,
        category: payload.category,
        body: payload.body,
        date: payload.date,
        likes: payload.likes,
        image: payload.image,
      };
      db.collection("blogs")
        .add(blog)
        .then((doc) => {
          const id = doc.id;
          console.log("Document successfully written!");
          console.log(id);
          const blogdata = {
            id: id,
            title: payload.title,
            category: payload.category,
            body: payload.body,
            date: payload.date,
            likes: payload.likes,
            image: payload.image,
          };
          commit("createblog", blogdata);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    updateBlog({ commit }, payload) {
      const updateblog = {};
      if (payload.title) {
        updateblog.title = payload.title;
      }
      if (payload.image) {
        updateblog.image = payload.image;
      }
      if (payload.category) {
        updateblog.category = payload.category;
      }
      if (payload.body) {
        updateblog.body = payload.body;
      }
      if (payload.date) {
        updateblog.date = payload.date;
      }
      if (payload.likes) {
        updateblog.likes = payload.likes;
      }
      db.collection("blogs")
        .doc(payload.id)
        .update(updateblog)
        .then(() => {
          commit("updateblog", payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*emails


    */
    loadEmails({ commit }) {
      db.collection("emails")
        .orderBy("date", "desc")
        .get()
        .then((querySnapshot) => {
          const emails = [];
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              subject: doc.data().subject,
              name: doc.data().name,
              body: doc.data().body,
              email: doc.data().email,
              date: doc.data().date,
              status: doc.data().status,
            };
            emails.push(data);
            console.log(doc.id, " => ", doc.data());
          });
          commit("loademails", emails);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    emailDelete({ commit }, payload) {
      db.collection("emails")
        .doc(payload.id)
        .delete()
        .then(() => {
          console.log("successfully deleted");
          commit("deletemail", payload);
        })
        .catch(() => {
          console.log("error while deleting");
        });
    },
    createEmail({ commit }, payload) {
      const email = {
        email: payload.email,
        subject: payload.subject,
        body: payload.body,
        date: payload.date,
        name: payload.name,
        status: payload.status,
      };
      db.collection("emails")
        .add(email)
        .then((doc) => {
          const id = doc.id;
          console.log("Document successfully written!");
          console.log(id);
          const emaildata = {
            id: id,
            email: payload.email,
            subject: payload.subject,
            body: payload.body,
            name: payload.name,
            date: payload.date,
            status: payload.status,
          };
          commit("createemail", emaildata);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    isRead({ commit }, payload) {
      const updateblog = {};
      if (payload.status) {
        updateblog.status = payload.status;
      }

      db.collection("emails")
        .doc(payload.id)
        .update(updateblog)
        .then(() => {
          commit("isread", payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
