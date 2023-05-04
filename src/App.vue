<template>
  <router-view></router-view>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/messaging';

export default {
  name: 'App',
  mounted() {
    const messaging = firebase.messaging();

    messaging.onMessage((payload) => {
      console.log('Received foreground message:', payload);

      const vibrationDuration = parseInt(payload.data.vibration);

      if (navigator && navigator.vibrate) {
        navigator.vibrate(vibrationDuration);
      }
    });
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(to right, #232526, #414345);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}
</style>
