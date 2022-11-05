export const strict = false


// initialized userData
const USER_DATA = () => {
    return {
        idx: null,
        role: null,
        user_id: '',
    }
} 

export const state = () => ({
    is_login: false,
    user: {
        idx: null,
        role: null,
        user_id: ''
    }
})

export const mutations = {
    // *** USER ***
    login(state, payload) {
        const user_data = payload
        state.user.role = user_data.role
        state.user.idx = user_data.idx
        state.user.user_id = user_data.user_id
        state.is_login = true
    },
    logout(state){
        state.user = USER_DATA()
        state.is_login = false
    }
}
