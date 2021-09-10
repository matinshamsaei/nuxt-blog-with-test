<template>
  <post-list :posts="posts"></post-list>
</template>

<script>
  export default {
    name: "index",

    computed: {
      posts() {
        return this.$store.getters.loadedPosts
      }
    }

    // created() {
    //   this.$store.dispatch('setPosts', this.posts)
    // }
  }
</script>

<style scoped>

</style>
