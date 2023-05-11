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
        <h3>Top 5 users</h3>
        <div class="box">
          <p v-for="(topUser, index) in topFiveUsers" :key="index">
            {{ topUser.userFirstName }} {{ topUser.userLastName }} | Number of video: {{ topUser.liczbaWideo }}
          </p>
        </div>
      </div>
    </div>
  </template>

<script>
import { getAllVideos } from "../lib/memoClipApiClient";
export default {
  name: "RankingComponent",
  data() {
    return {
      userVideosList: [],
      topFiveUsers: [],
    };
  },
  async mounted() {
    this.userVideosList = await getAllVideos();

    this.userVideosList.sort((a, b) => b.videoNumber - a.videoNumber);
    this.topFiveUsers = this.userVideosList.slice(0, 5);
    console.log("przyjąłem dane");
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

.box {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

h3 {
  margin-top: 60px;
}

.logo {
  width: 35px;
  height: 35px;
}
</style>