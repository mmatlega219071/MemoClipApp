<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>
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
            <router-link class="nav-link" to="/app-settings"
              >Settings</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/record-video"
              >Record Video</router-link
            >
          </li>
        </ul>
      </div>
      <div>Video List</div>
    </div>
  </nav>
</template>

<script>
import { listUserVideos } from "../lib/memoClipApiClient";
export default {
  name: "VideoList",
  // JavaScript
  async mounted() {
    const list = await listUserVideos();
    console.log(list);
  },
};
</script>

<style scoped></style>
