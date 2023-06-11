<template>
  <form @submit.prevent="onSave">
    <app-control-input class="author-input" v-model="editedPost.author">
      Author Name
    </app-control-input>
    <app-control-input class="title-input" v-model="editedPost.title"> Title </app-control-input>
    <app-control-input v-model="editedPost.thumbnail">
      Thumbnail link
    </app-control-input>
    <app-control-input class="content-input" controlType="textarea" v-model="editedPost.content">
      Content
    </app-control-input>
    <app-control-input class="preview-text-input" controlType="textarea" v-model="editedPost.previewText">
      Preview Text
    </app-control-input>
    <div class="app-buttons">
      <app-button class="save-btn" type="submit" @click="onSave">Save</app-button>
      <app-button
        type="button"
        btn-style="cancel"
        class="cancel-btn"
        style="margin-left: 10px"
        @click="onCancel"
      >
        Cancel
      </app-button>
    </div>
  </form>
</template>

<script>
import AppButton from "../UI/AppButton";
import AppControlInput from "../UI/AppControlInput";

export default {
  name: "AdminPostForm",

  components: {
    AppButton,
    AppControlInput,
  },

  props: {
    post: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            content: "",
            previewText: "",
          },
    };
  },

  methods: {
    onSave() {
      this.$emit("submit", this.editedPost);
    },

    onCancel() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.app-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
