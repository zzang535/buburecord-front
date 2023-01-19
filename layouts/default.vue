<template>
  <v-app>
    <div id="header">
        <div class="logo">
            <h3 @click="$router.push('/')">ALBUM.BIRD89</h3>
        </div>
        <div class="menu">
            <h3 v-if="$store.state.is_login" @click="logout()">LOGOUT</h3>
            <h3 v-if="!$store.state.is_login" @click="$router.push('/join')">JOIN</h3>
            <h3 v-if="!$store.state.is_login">|</h3>
            <h3 v-if="!$store.state.is_login" @click="$router.push('/login')">LOGIN</h3>
        </div>
    </div>
    <Nuxt />
    <CommonModal :modal="modal" @close="modal.state = false" />
  </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data () {
        return {
            modal: {
                title: '',
                state: false,
                type: 'single',
                func: () => {},
                alert_text: ''
            },    
        }
    },
    created() {
        this.$nuxt.$on("popup", this.handleAlert)
		this.$nuxt.$on("popup:close", this.handleAlertClose)
    },
    beforeDestroy() {
		this.$nuxt.$off("popup", this.handleAlert)
		this.$nuxt.$off("popup:close", this.handleAlertClose)
    },
    methods: {
        async logout() {
            try {
                await this.$axios.get(`/open/logout`)
                this.$store.commit('logout')
                this.$router.push('/')
            } catch(error) {
                console.log(error)
            }
        },
        handleAlert(props){
            this.modal = props
        },
        handleAlertClose(){
            this.modal.state = false
        },
    }
}
</script>

<style lang="scss" scoped>
    #header {
        border: 1px solid black;
        background-color: white;
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
        position: fixed;
        width: 100%;
        height: $header_height;
        z-index: 1000;
        .logo {
          /* border: 1px solid black; */
          padding-top: 5px;
          cursor: pointer;
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
    }
</style>