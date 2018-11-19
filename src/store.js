import Vue from 'vue';
import Vuex from 'vuex';
import firebaseApp from '@/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false
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
    }
  },
  actions: {
    login({ commit }, user) {
      const { email, password } = user;

      return new Promise((resolve, reject) => {
        firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            commit('LOGIN');
            resolve(res);
          })
          .catch(error => {
            reject(error.message);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        firebaseApp
          .auth()
          .signOut()
          .then(function() {
            commit('LOGOUT');
            resolve();
          })
          .catch(function(error) {
            reject(error.message);
          });
      });
    },
    signup({ commit }, user) {
      const { email, password } = user;

      return new Promise((resolve, reject) => {
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
            commit('REGISTER');
            resolve(res);
          })
          .catch(error => {
            reject(error.message);
          });
      });
    }
  }
});
