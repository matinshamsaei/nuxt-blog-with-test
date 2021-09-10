<template>
  <div>
    <ul>
      <message v-for="message in messages" :key="message">
        {{ message }}
      </message>
    </ul>
    <div class="matin">
      <span>content</span>
    </div>
  </div>
</template>

<script>
import Message from "@/components/TestBook/Message.vue";

export default {
  name: "list",
  props: ["messages"],
  components: {
    Message
  }
};
</script>
