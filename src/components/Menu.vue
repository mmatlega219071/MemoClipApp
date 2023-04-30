<template>
  <nav>
    <ul>
      <li><router-link to="/video-list">Video Listt</router-link></li>
      <li><router-link to="/record-video">Record Video</router-link></li>
      <li><router-link to="/app-settings">Settingsss</router-link></li>
    </ul>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  // Your component properties

  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/api/home');
        // Use response data in your component
      } catch (error) {
        // Handle errors
      }
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
nav {
  background-color: #2d2d2d;
  color: #fff;
  display: flex;
}

ul {
  list-style: none;
  display: flex;
}

li {
  margin: 0 10px;
}

a {
  color: #fff;
  text-decoration: none;
}
</style>
