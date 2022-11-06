<template>
  <v-app>
    <div id="header">
        <div>
            <h3 @click="$router.push('/')">ALBUM.BIRD89</h3>
        </div>
        <div>
            <span @click="$router.push('/join')">JOIN</span> | 
            <span @click="$router.push('/login')">LOGIN</span>
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
        display: flex;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 20px;
        position: fixed;
        z-index: 1000;
        background-color: white;
        width: 100%;
    }
</style>