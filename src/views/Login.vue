<template>
  <div class="max-w-md m-auto">
    <h2 class="text-2xl mt-4">Login</h2>
    <form @submit.prevent="login" class="mt-6">
      <div class="mb-4">
        <input placeholder="Please enter your name" class="w-full p-3 border border-grey-lighter shadow-md" v-model="name">
        <p class="text-red-light mt-3" v-if="errorText" v-text="errorText"></p>
      </div>
      <button class="border border-blue-dark bg-blue-dark text-white p-3 w-full" @click.prevent="login">Enter Chat</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      errorText: ''
    };
  },
  methods: {
    login() {
      if (this.name) {
        this.$router.push({
          name: 'chat',
          params: {
            name: this.name
          }
        });
      } else {
        this.errorText = 'Please enter a name!';
      }
    }
  }
};
</script>
