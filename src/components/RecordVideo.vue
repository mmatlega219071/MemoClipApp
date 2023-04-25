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
            <router-link class="nav-link" to="/app-settings">Settings</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/video-list" class="nav-link">Video List</router-link>
          </li>
          
        </ul>
      </div>
        <div> Record Video </div>
    </div>
  </nav>
    <div>
        <!-- RecordVideo component -->
        RecordVideo
    </div>
</template>

<script>
export default {
    name: "PustyKomponent",
    // JavaScript
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
