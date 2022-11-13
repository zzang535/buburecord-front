export default ({ app, $axios, store, route }) => {

	$axios.interceptors.request.use(
    config => {
      console.log("AXIOS INTERCEPTORS REQUEST")
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
  )

	$axios.interceptors.response.use(
		response => {
			return response
		},
		error => {
      console.log("AXIOS INTERCEPTORS RESPONSE ERROR", error.response)
			let originalRequest = error.config

      if (error.response.data.code === 401) {
        // 액세스토큰 만료, 리프레시토큰 유효
        if (error.response.data.message === 'refresh_ok_access_error') {
          console.log("액세스토큰 만료, 리프레시토큰 유효")
          return $axios(originalRequest)
        }
        // 리프레시토큰 만료
        if (error.response.data.message === 'refresh_error_access_error') {
          console.log("리프레시토큰 만료")
          store.commit('logout')
          app.router.push('/')
        }
      }
			return Promise.reject(error)
		}
	)

}
