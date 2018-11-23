import Vue from 'vue';
import Vuex from 'vuex';
import firebaseApp from '@/firebase';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    errorText: ''
  },
  getters: {
    isAuthenticated: state => state.loggedIn
  },
  mutations: {
    LOGIN: state => {
      state.loggedIn = true;
    },

    LOGOUT: state => {
      state.loggedIn = false;
    },
    REGISTER: state => {
      console.log(state);
    },
    ERROR_TEXT: (state, msg) => {
      state.errorText = msg;
    }
  },
  actions: {
    login({ commit }, user) {
      const { email, password } = user;

      if (email && password) {
        firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            if (res) {
              commit('LOGIN');
              router.push({
                name: 'home',
                params: { name: email }
              });
            }
          })
          .catch(error => {
            commit('ERROR_TEXT', error.message);
          });
      } else {
        commit('ERROR_TEXT', 'Required email and password.');
      }
    },
    logout({ commit }) {
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          commit('LOGOUT');
          router.push({ name: 'login' });
        })
        .catch(() => {
          router.push({ name: 'login' });
        });
    },
    signup({ commit }, user) {
      const { email, password } = user;

      if (email && password) {
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
            if (res.additionalUserInfo.isNewUser) {
              commit('REGISTER');
              router.push({ name: 'login' });
            }
          })
          .catch(error => {
            commit('ERROR_TEXT', error.message);
          });
      } else {
        commit('ERROR_TEXT', 'Required email and password.');
      }
    }
  }
});
