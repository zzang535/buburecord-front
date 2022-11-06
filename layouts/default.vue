<template>
  <v-app>
    <div id="header">
        <div class="logo">
            <h3 @click="$router.push('/')">ALBUM.BIRD89</h3>
        </div>
        <div class="menu">
            <h3 @click="$router.push('/join')">JOIN</h3>
            <h3>|</h3>
            <h3 @click="$router.push('/login')">LOGIN</h3>
        </div>
    </div>
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {

    }
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
        }
        .menu {
          /* border: 1px solid black; */
          display: flex;
          padding-top: 5px;
          h3 {
            margin-right: 3px;
            margin-left: 3px;
          }
        }
    }
</style>