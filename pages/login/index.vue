<template>
  <div id="login">
    <div class="login_box" @keyup.enter="login">
      <div class="logo">
        <h1>BUBU-RECORD LOGIN</h1>
      </div>

      <div class="input">
        <input type="text" placeholder="ID" v-model="username" />
      </div>

      <div class="input">
        <input type="password" placeholder="PASSWORD" v-model="password" />
      </div>

      <div class="button">
        <button class="mainBtn1" @click="login">LOGIN</button>
      </div>

      <div class="find">
        <p>find ID</p>
        <span>|</span>
        <p>find password</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {},
  methods: {
    async login() {
      try {
        const payload = { username: this.username, password: this.password };
        const response = await this.$axios.post(`/open/login`, payload);
        const user_data = response.data.data;
        this.$store.commit("login", user_data);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  margin-top: $header_height;
  background: gray;
  height: calc(100vh - 40px);
  padding: 10px;
  display: flex;
  justify-content: center;

  .login_box {
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
    max-width: 600px;
    padding: 20px;
    background-color: #fff;
    .logo {
      text-align: center;
      margin-bottom: 10px;
    }
    .input {
      margin-bottom: 10px;
      input {
        border: 1px solid black;
        background-color: #fff;
        color: #00070d;
        width: 100%;
        padding: 10px;
      }
      input:focus {
        outline: none;
      }
    }
    .button {
      margin-bottom: 10px;
      button {
        width: 100%;
        height: 46px;
        background-color: black;
        color: white;
        background: $color_green;
      }
    }
    .find {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
      p {
        color: black;
      }
      span {
        padding: 0px 8px;
        color: black;
      }
    }
  }
}
</style>
