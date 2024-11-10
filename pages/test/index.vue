<template>
    <div class="top">
        <button @click="handleLogin">로그인</button>
    </div>
</template>

  
  <script>
  export default {
    data() {
      return {
        clientId: process.env.VUE_APP_GCP_OAUTH_CLIENT_ID,
        redirectUri: `${process.env.VUE_APP_SERVICE_URL}/test/`
      };
    },
    created() {
        const url = this.getUrl();
        console.log('url', url);
    },
    methods: {

        getUrl() {
            const params = new URLSearchParams({
                client_id: this.clientId,
                redirect_uri: this.redirectUri,
                response_type: 'code',
                scope: 'email profile',

            });
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
            return authUrl;
        },  

        handleLogin() {
            const url = this.getUrl();
            console.log('url', url);
            window.location.href = url;
        }
    },
  };
  </script>

  <style>
  .top {
    margin-top: 100px;
    height: 100px;
    width: 1000px;
    border: 1px solid red;
  }
</style>