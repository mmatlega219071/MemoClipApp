<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand"
          ><img
            src="../../public/img/icons/AppIcon.png"
            alt="AppIcon"
            class="logo"
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/video-list" class="nav-link"
                >Video list</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/app-settings" class="nav-link"
                >Credits</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div>
        <h3>Top 5 użytkowników z największą ilością nagrań z ostatniego dnia</h3>
        <ul>
          <li v-for="(video, index) in videos" :key="index">
            {{ video.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>

<script>
import { getAllVideos } from "../lib/memoClipApiClient";
export default {
  name: "RankingComponent",
  data() {
    return {
      videos: [],
    };
  },
  async mounted() {
    this.videos = await getAllVideos();
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #fff;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #fff;
  color: #000;
}

.logo {
  width: 35px;
  height: 35px;
}
.container-fluid img {
  max-height: 45px;
  max-width: 45px;
}
</style>