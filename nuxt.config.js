const axios = require("axios");

export default {
  target: "server",

  head: {
    title: "Nuxt Blog" || process.env.npm_package_name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Grandstander:wght@200;400&display=swap"
      }
    ]
  },

  css: ["~assets/styles/main.css"],

  plugins: ["~plugins/app-plugins.js", "~plugins/date-filter.js"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa"],

  axios: {
    baseURL: process.env.BASE_URL || "https://nuxt-blog-a8c37.firebaseio.com",
    credentials: false
  },

  components: true,

  buildModules: [],

  build: {
    publicPath: process.env.NODE_ENV === "production" ? "/nuxt-blog/" :  "/"
  },

  env: {
    baseUrl: process.env.BASE_URL || "https://nuxt-blog-a8c37.firebaseio.com",
    fbApiKey: "AIzaSyAwkm3s33cvprdNHi29b4z73bCsEzPuzpY"
  },

  transition: {
    name: "fade",
    mode: "out-in"
  },

  router: {
    middleware: "log"
  },

  generate: {
    routes: function() {
      return axios
        .get("https://nuxt-blog-a8c37.firebaseio.com/posts.json")
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: "/posts/" + key,
              payload: {
                postData: res.data[key]
              }
            });
          }
          return routes;
        });
    }
  }
};
