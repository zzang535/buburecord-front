<template>
    <div id="main">
        <div class="title">
            <h1>부부</h1>
            <h1>레코드</h1>
            <h3>BUBU-</h3>
            <h3>RECORD</h3>
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
    padding-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    height: 100vh;
   .title {
        width: 200px;
        height: 200px;
        border: 10px solid black;
        padding: 20px;
        font-size: 100px;
        background-color: white;

        h1 {
            margin-bottom: 8px;
        }
   }
}
</style>
    