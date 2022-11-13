<template>
  <div id="join">
      <div class="com_contain">
        <div class="login_box" @keyup.enter="login">

          <div class="logo">
            <h1>ALBUM.BIRD89</h1>
          </div>
          <div class="input">
              <input type="text" placeholder="ID" v-model="username">
          </div>
          <div class="input">
              <input type="password" placeholder="password" v-model="password">
          </div>
          <div class="input">
              <input type="password" placeholder="password confirm" v-model="password_confirm">
          </div>

          <div class="button">
              <button class="mainBtn1" @click="join">JOIN</button>
          </div>

      </div>

      </div>
  </div>
  </template>
  
  <script>    
  export default{
    data() {
      return{
        username: '',
        password: '',
        password_confirm: '',
      }
    },
    created() {

    },
    methods: {
      async join() {
          try {
              const payload = { username : this.username, password : this.password }
              const response = await this.$axios.post(`/free/join`, payload)
              const user_data = response.data.data
              this.$store.commit('login', user_data)
              this.$router.push('/')
          } catch (error) {
              console.log(error)
          }
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  #join {
    margin-top: $header_height;

    p {
      margin-bottom: 0;
    }
  .com_contain{
      max-width: 600px;
      height: calc(100vh - 40px); // 헤더 제외
      display: flex;
      align-items:center;
      .login_box{
          display: flex;
          flex-direction: column;
          width: 100%;
          .logo{
              text-align: center;
              margin-bottom: 10px;
          }
          .input {
              margin-bottom: 10px;
              input {
                  border: 1px solid black;
                  background-color: #fff;
                  color: #00070D;
                  width: 100%;
                  padding: 10px;
              }
              input:focus{
                  outline: none;
              }
          }
          .button {
              margin-bottom: 10px;
              button {
                  border: 1px solid black;
                  width: 100%;
                  height: 46px;
                  background-color: black;
                  color: white;
              }
          }
         
      }
  }
  }
  </style>
  