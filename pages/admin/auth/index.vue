<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput typeof="text" v-model="email">
          E-Mail Address
        </AppControlInput>

        <AppControlInput type="password" v-model="password"
          >Password</AppControlInput
        >
        <AppButton class="submit-btn" type="submit" @click="onSubmit">{{ isLogin ? "Login" : "Sign Up" }}</AppButton>
        <AppButton
          type="button"
          class="switch-btn"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
        >
          Switch to {{ isLogin ? "Signup" : "Login" }}
        </AppButton>
      </form>
    </div>

    <div class="backHome">
      <AppButton type="button" btn-style="inverted" class="back-to-home-btn" @click="backToHome">
        Back To Home
      </AppButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminAuthPage",

  layout: "admin",

  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
    };
  },

  methods: {
    onSubmit() {
      this.$store
        .dispatch("authenticateUser", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push("/admin"))
        .catch((e) => console.log(e));
    },
    backToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}

.backHome {
  margin-top: 30px;
  text-align: center;
}
</style>
