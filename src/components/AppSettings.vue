<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid"> <!-- kontener przy zmniejszeniu lista -->
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
            <router-link class="nav-link" to="/video-list">Video List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/record-video">Record Video</router-link>
          </li>
          
        </ul>
      </div>
      <div > Settings </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: "AppSettings",
    // JavaScript
};
</script>

<style >

</style>
