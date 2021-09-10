import Vuex from 'vuex';
import Cookie from "js-cookie";

// ** we use function instead of an object which represent the store because it should be callable by nuxt **
const createdStore = () => {
  // ****
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },

      authenticated(state) {
        return state.token != null
      }
    },

    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },

      addPost(state, post) {
        state.loadedPosts.push(post)
      },

      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost
      },

      saveToken(state, idToken) {
        state.token = idToken
      },

      clearToken(state) {
        state.token = null
      }
    },

    actions: {
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },

      nuxtServerInit(vuexContext, context) {
        return context.app.$axios.$get("/posts.json")
          .then(data => {
            const postArray = [];
            for (const key in data) {
              // ******
              postArray.push({ ...data[key], id: key })
              // ******
            }
            vuexContext.commit('setPosts', postArray)
          })
          .catch(error => context.error(error))

        // return new Promise((resolve, reject) => {
        //   setTimeout( ()=> {
        //     vuexContext.commit('setPosts', [
        //       {
        //         id: '1',
        //         title: 'first post',
        //         thumbnail: "https://www.renfe-sncf.com/rw-en/blog/PublishingImages/did-you-know-autumn-traditions/autumn_traditions.jpg",
        //         previewText: 'hellooooo'
        //       },
        //
        //       {
        //         id: '2',
        //         title: 'second post',
        //         thumbnail: "https://www.renfe-sncf.com/rw-en/blog/PublishingImages/did-you-know-autumn-traditions/autumn_traditions.jpg",
        //         previewText: 'hi'
        //       },
        //
        //       {
        //         id: '3',
        //         title: 'third post',
        //         thumbnail: "https://www.renfe-sncf.com/rw-en/blog/PublishingImages/did-you-know-autumn-traditions/autumn_traditions.jpg",
        //         previewText: 'say hello'
        //       },
        //     ]);
        //     resolve(
        //     )
        //   }, 1000);
        //   // reject(new Error)
        // })
      },

      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return this.$axios.$post("/posts.json?auth=" + vuexContext.state.token, createdPost)
          .then(data => {
            // res.data.name -> name is an **id** that created by *firebase* !!!
            vuexContext.commit('addPost', { ...createdPost, id: data.name })
          })
          .catch(error => console.log(error))
      },

      editPost(vuexContext, editedPost) {
        // editedPost.postId is came from _postId  ---  we gave id with loadedPost
        return this.$axios.$put("/posts/" + editedPost.id + ".json?auth=" + vuexContext.state.token, editedPost)
          .then(() => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(error => console.log(error))
      },

      authenticateUser(vuexContext, userData) {
        let authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.fbApiKey;
        if (!userData.isLogin) {
          authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.fbApiKey;
        }
        return this.$axios.$post(authUrl, {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true
        })
          .then(res => {
            // ********
            console.log(res);
            vuexContext.commit('saveToken', res.idToken);
            localStorage.setItem('token', res.idToken);
            localStorage.setItem('expirationDate', new Date().getTime() + Number.parseInt(res.expiresIn) * 1000);
            Cookie.set("jwt", res.idToken);
            Cookie.set("expirationDate", new Date().getTime() + Number.parseInt(res.expiresIn) * 1000);
            // ********
          })
          .catch(error => console.log(error))
      },

      // i dont ever know what is this
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else if (process.client) {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("expirationDate");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("saveToken", token);
      },

      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        // if its in the client side
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationDate");
        }
      }
    }
  })
};

export default createdStore
