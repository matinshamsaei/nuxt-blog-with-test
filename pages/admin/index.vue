<template>
  <div class="admin-page">
    <section class="new-post">
      <app-button @click="$router.push('/admin/new-post')">
        Create Post
      </app-button>
      <AppButton style="margin-left: 10px" @click="onLogout">
        Logout
      </AppButton>
    </section>

    <section class="existing-post">
      <h1>Existing Posts</h1>
      <post-list :posts="posts" isAdmin></post-list>
    </section>
  </div>
</template>

<script>
export default {
  name: "index",

  layout: "admin",

  middleware: ["check-auth", "authenticate"],

  computed: {
    posts() {
      return this.$store.getters.loadedPosts;
    },
  },

  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/admin/auth");
    },
  },
};
</script>

<style scoped>
.admin-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
}

.existing-post {
  margin-top: 50px;
}

h1 {
  text-align: center;
}
</style>
