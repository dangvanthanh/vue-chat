<template>
  <div>
    <form
      @submit.prevent="createMessage"
      class="flex border border-grey-ligher shadow-md px-3 py-2"
    >
      <div class="flex-grow">
        <input
          placeholder="Type a message..."
          v-model="newMessage"
          class="p-2 w-full border border-grey"
        />
      </div>
      <button @click.prevent="createMessage" class="px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          class="w-6 h-6 inline-block align-middle"
          fill="inherit"
        >
          <g data-name="Layer 2">
            <g data-name="navigation-2">
              <rect width="24" height="24" opacity="0"></rect>
              <path
                d="M13.67 22h-.06a1 1 0 0 1-.92-.8L11 13l-8.2-1.69a1 1 0 0 1-.12-1.93l16-5.33A1 1 0 0 1 20 5.32l-5.33 16a1 1 0 0 1-1 .68zm-6.8-11.9l5.19 1.06a1 1 0 0 1 .79.78l1.05 5.19 3.52-10.55z"
              ></path>
            </g>
          </g>
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import firebaseDb from '@/firebase/firestoredb';

export default {
  props: ['name'],
  data() {
    return {
      newMessage: ''
    };
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        firebaseDb
          .collection('messages')
          .add({
            message: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });

        this.newMessage = '';
      }
    }
  }
};
</script>
