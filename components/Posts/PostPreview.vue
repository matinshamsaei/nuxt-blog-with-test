<template>
  <nuxt-link :to="postLink" class="post-preview">
    <article>
      <div
        class="post-thumbnail"
        :style="{ backgroundImage: 'url(' + thumbnail + ')' }"
      ></div>

      <div class="post-content">
        <h2>{{ title }}</h2>
        <p>{{ previewText }}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: "PostPreview",
  props: {
    isAdmin: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    previewText: {
      type: String,
      required: true,
    },
  },

  computed: {
    postLink() {
      return this.isAdmin ? "/admin/" + this.id : "/posts/" + this.id;
    },
  },
};
</script>

<style scoped>
.post-preview {
  box-shadow: 0 2px 6px #e8e8e8;
  background-color: white;
  width: 90%;
  border-radius: 10px;
}

h2 {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  border-radius: 0 0 10px 10px;
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #f4f4f4;
}
</style>
