<template>
    <div id="main">
        <div class="title">
            <h1>부부레코드</h1>
            <h3>BUBU-RECORD</h3>
        </div>
    </div>
</template>
    
<script>    
    export default{
      data() {
        return{
          username: '',
          password: ''
        }
      },
      created() {

      },
      methods: {
       
      },
    }
</script>
    
<style lang="scss" scoped>
#main {
    padding: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
   .title {
        border: 10px solid black;
        padding: 100px;
        font-size: 100px;
   }
}
</style>
    