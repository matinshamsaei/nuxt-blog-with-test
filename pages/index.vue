<template>
  <div class="container">
    <section class="intro">
      <h1>Posts</h1>
    </section>

    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters.loadedPosts;
    },
  },
};
</script>

<style scoped>
.intro {
  padding: 30px;
  box-sizing: border-box;
  background-color: #f6f6f6;
  background-position: center;
  background-size: cover;
}

.intro h1 {
  font-size: 1.5rem;
  color: black;
  margin: 0;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>
