<template>
  <div class="max-w-sm m-auto mt-24">
    <div class="bg-white border border-grey-ligher rounded">
      <div class="bg-grey-lighter border-b border-grey-ligher p-3">
        <h2 class="text-md mb-0 mt-0">Signup</h2>
      </div>
      <form @submit.prevent="signup({ email, password });" class="p-3 mb-4">
        <p
          class="text-red-light mt-3 mb-3"
          v-if="errorText"
          v-text="errorText"
        ></p>
        <div class="mb-4">
          <label for="email" class="block mb-3">Email</label>
          <input placeholder="Email" class="input" v-model="email" />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-3">Password</label>
          <input
            placeholder="Password"
            type="password"
            class="input"
            v-model="password"
          />
        </div>
        <button class="btn" @click.prevent="signup({ email, password });">
          Signup
        </button>
      </form>
      <div class="bg-grey-lighter px-3 py-4">
        <p class="mb-0 text-grey-darker">
          Already signed up?
          <router-link
            tag="a"
            :to="{ name: 'login' }"
            class="no-underline text-black font-semibold hover:underline"
            >Login here</router-link
          >
          instead.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapState({
      errorText: state => state.errorText
    })
  },
  methods: {
    ...mapActions(['signup'])
  }
};
</script>

<style scoped>
.input {
  @apply .w-full .p-3 .border .border-grey .rounded;
}

.btn {
  @apply .p-3 .w-full .bg-grey-darkest .text-white .rounded;
}
</style>
