<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
        </ul>
      </div>
    </div>
  </nav>
  <div>Created by:</div>
  <li>Mateusz Matlega</li>
  <li>Kamila Cikowska-Matoga</li>
  <li>Karol Kozioł</li>
  <div>Credits:</div>
    <li><a target="_blank" href="https://icons8.com/icon/3483/return">Return</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></li>
    <li><a target="_blank" href="https://www.flaticon.com/free-icons/camera" title="camera icons"></a>Camera icons created by Fathema Khanom - Flaticon</li>
</template>

<script>
export default {
    name: "AppSettings",
    // JavaScript
};
</script>

<style scoped>

</style>
