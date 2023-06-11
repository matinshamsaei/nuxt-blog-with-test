<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <admin-post-form @submit="onSubmit"></admin-post-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "index",

  layout: "admin",

  middleware: ["check-auth", "authenticate"],

  methods: {
    onSubmit(postData) {
      this.$store.dispatch("addPost", postData).then(() => {
        this.$router.push("/admin");
      });
    },
  },
};
</script>
