<template>
  <v-app>
    <div id="header">
      <div class="hamburger">
        <div class="hamburger_icon" @click="menuLeftStatus = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <line
              x1="3"
              y1="10"
              x2="25"
              y2="10"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="3"
              y1="19"
              x2="25"
              y2="19"
              stroke="black"
              stroke-width="1"
            />
          </svg>
        </div>
      </div>
      <div class="logo">
        <span @click="$router.push('/')">BUBU-RECORD v1.2</span>
      </div>
      <div class="menu_left" v-if="menuLeftStatus">
        <div class="close pointer" @click="menuLeftStatus = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <line
              x1="6"
              y1="6"
              x2="22"
              y2="22"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="6"
              y1="22"
              x2="22"
              y2="6"
              stroke="black"
              stroke-width="1"
            />
          </svg>
        </div>
        <h3
          class="menu_item pointer"
          v-if="$store.state.is_login"
          @click="
            $router.push('/album');
            menuLeftStatus = false;
          "
        >
          ALBUM
        </h3>
        <h3
          class="menu_item pointer"
          v-if="$store.state.is_login"
          @click="
            $router.push('/health');
            menuLeftStatus = false;
          "
        >
          HEALTH
        </h3>
        <h3
          class="menu_item pointer"
          v-if="$store.state.is_login"
          @click="
            $router.push('/history');
            menuLeftStatus = false;
          "
        >
          HISTORY
        </h3>
        <h3
          class="menu_item pointer"
          v-if="$store.state.is_login"
          @click="
            $router.push('/note');
            menuLeftStatus = false;
          "
        >
          NOTE
        </h3>
        <h3
          class="menu_item pointer"
          v-if="$store.state.is_login"
          @click="
            logout();
            menuLeftStatus = false;
          "
        >
          LOGOUT
        </h3>
        <h3
          class="menu_item pointer"
          v-if="!$store.state.is_login"
          @click="
            $router.push('/login');
            menuLeftStatus = false;
          "
        >
          LOGIN
        </h3>
        <h3
          class="menu_item pointer"
          v-if="!$store.state.is_login"
          @click="
            $router.push('/join');
            menuLeftStatus = false;
          "
        >
          JOIN
        </h3>
      </div>
    </div>
    <Nuxt />
    <CommonModal :modal="modal" @close="modal.state = false" />
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      modal: {
        title: "",
        state: false,
        type: "single",
        func: () => {},
        alert_text: "",
      },
      menuLeftStatus: false,
    };
  },
  created() {
    this.$nuxt.$on("popup", this.handleAlert);
    this.$nuxt.$on("popup:close", this.handleAlertClose);
  },
  beforeDestroy() {
    this.$nuxt.$off("popup", this.handleAlert);
    this.$nuxt.$off("popup:close", this.handleAlertClose);
  },
  methods: {
    async logout() {
      try {
        await this.$axios.get(`/open/logout`);
        this.$store.commit("logout");
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    handleAlert(props) {
      this.modal = props;
    },
    handleAlertClose() {
      this.modal.state = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  border: 1px solid black;
  background-color: white;
  display: flex;
  justify-content: space-between;
  /* padding-left: 10px; */
  padding-right: 10px;
  position: fixed;
  width: 100%;
  height: $header_height;
  z-index: 1000;

  .hamburger {
    width: $header_height;
    height: $header_height;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    .hamburger_icon {
      border: 1px solid black;
      border-radius: 5px;
      width: 30px;
      height: 30px;
    }
  }
  .logo {
    /* border: 1px solid black; */
    padding-top: 5px;
    width: 100%;
    text-align: center;

    span {
      cursor: pointer;
      font-size: 20px;
    }
  }
  .menu {
    /* border: 1px solid black; */
    display: flex;
    padding-top: 5px;
    h3 {
      cursor: pointer;
      margin-right: 3px;
      margin-left: 3px;
    }
  }

  .menu_left {
    width: 200px;
    height: 100vh;
    border: 1px solid black;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: white;
    padding: 6px;
    padding-top: 40px;

    .close {
      position: absolute;
      width: 30px;
      height: 30px;
      border: 1px solid black;
      border-radius: 5px;
      top: 6px;
    }

    .menu_item {
      margin: 6px;
    }

    .pointer {
      cursor: pointer;
    }
  }
}
</style>
