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
          <div class="col">data</div>
          <div class="video-wrapper"><video controls :src="video.videoURL"></video>
            <div class="col"><button class="btn btn-secondary" @click="deleteThisVideo(video.docId)">delete</button>
              <div class="w-100"></div>
              </div>
          </div>
        </div>
      </div>
</template>

<script>
import { listUserVideos, deleteVideo } from "../lib/memoClipApiClient";
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
  methods: {
    async deleteThisVideo(docId) {
      return deleteVideo(docId);
    },
  },
};
</script>

<style scoped>
.video-wrapper {
  position: static;
  max-width: 100%;
}
.w-100 {
    border: 1px solid black;
    margin: 10px 0;
}

.video-wrapper video {
  height: auto;
  max-height: 400px;
  object-fit: contain;
}

@media (min-width: 576px){
.row video {
  min-width: 20%;
  height: auto;
}

}
@media (max-width: 992px) {
.row video {
  max-width: 80%;
  height: auto;
}
}

</style>
