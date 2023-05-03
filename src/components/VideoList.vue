<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
    </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/app-settings">Settings</router-link>
          </li>
      </ul>
    </div>
  </nav>
      <div class="row">
        <div v-for="video in videos" :key="video.videoURL">
          <div class="video-wrapper"></div>
            <video controls :src="video.videoURL" autoplay="false"></video>
          <div>data</div>
        </div>
      </div>
</template>

<script>
import { listUserVideos } from "../lib/memoClipApiClient";
export default {
  name: "VideoList",
  data() {
    return {
      videos: [],
    };
  },
  async mounted() {
    this.videos = await listUserVideos();
  },
};
</script>

<style scoped>
.video-wrapper {
  position: static;
  max-width: 100%;
}

.video-wrapper video {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
}

@media (max-width: 767px) {
.row video {
max-width: 75%;
height: auto;
}
}

</style>
