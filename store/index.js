export const strict = false;

const USER_DATA = () => {
  return {
    id: null,
    username: "",
  };
};

export const state = () => ({
  is_login: false,
  user: {
    id: null,
    username: "",
  },
});

export const mutations = {
  login(state, payload) {
    console.log("payload", payload);
    const user_data = payload;
    state.user.id = user_data.id;
    state.user.username = user_data.username;
    state.is_login = true;
  },
  logout(state) {
    state.user = USER_DATA();
    state.is_login = false;
  },
};
