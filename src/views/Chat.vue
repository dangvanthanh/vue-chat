<template>
  <div class="max-w-md m-auto">
    <h2 class="text-3xl mt-4 relative">
      Real Time Chat
      <a
        href="#"
        class="px-2 py-1 rounded border border-blue no-underline text-blue text-sm inline-block font-normal align-middle absolute pin-r pin-t hover:bg-blue hover:text-white"
        @click.prevent="handlerLogout"
      >
        Logout
      </a>
    </h2>
    <div class="mt-4 mb-4 overflow-x-auto messages" v-chat-scroll>
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex items-start mb-4 text-sm"
      >
        <img
          src="https://avatars2.githubusercontent.com/u/2674850?v=3&s=100"
          alt=""
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div class="mb-1">
            <span class="font-bold capitalize inline-block mr-2">{{
              message.name
            }}</span>
            <span class="text-grey text-xs">{{
              format(message.timestamp, 'HH:MM A')
            }}</span>
          </div>
          <p class="leading-normal">{{ message.message }}</p>
        </div>
      </div>
      <div class="absolute pin-b w-full max-w-md">
        <CreateMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import CreateMessage from './CreateMessage.vue';
import firebaseDb from '@/firebase/firestoredb';
import { mapActions } from 'vuex';

export default {
  props: ['name'],
  components: { CreateMessage },
  data() {
    return {
      messages: [],
      format
    };
  },
  created() {
    let ref = firebaseDb.collection('messages').orderBy('timestamp');

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: doc.data().timestamp
          });
        }
      });
    });
  },
  methods: {
    ...mapActions(['logout']),
    handlerLogout() {
      this.logout()
        .then(() => {
          this.$router.push({ name: 'login' });
        })
        .catch(() => {
          this.$router.push({ name: 'login' });
        });
    }
  }
};
</script>

<style scoped>
.messages {
  height: calc(100vh - 150px);
}
</style>
