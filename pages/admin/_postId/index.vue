<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form :post="loadedPost" @submit="onSubmit"></admin-post-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "index",

  middleware: ["check-auth", "authenticate"],

  layout: "admin",

  asyncData(context) {
    return context.app.$axios
      .$get("/posts/" + context.params.postId + ".json")
      .then((data) => {
        return {
          loadedPost: { ...data, id: context.params.postId },
        };
      })
      .catch((error) => context.error(error));
  },

  methods: {
    onSubmit(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    },
  },
};
</script>
