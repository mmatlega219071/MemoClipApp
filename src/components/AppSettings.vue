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
          <router-link to="/users-ranking" class="nav-link"
            >Users ranking</router-link
          >
        </li>
          </ul>
        </div>
      </div>
  </nav>
  <div class="box">
    <h3>Created by:</h3>
    <p>Kamila Cikowska-Matoga</p>
    <p>Karol Kozioł</p>
    <p>Mateusz Matlęga</p>
    <br>
    <br>
    <br>
    <span>Credits:</span>
    <a target="_blank" href="https://icons8.com">Icon by Icons8</a>
    <a target="_blank" href="https://www.flaticon.com/free-icons/camera" title="camera icons">Camera icons created by Fathema Khanom - Flaticon</a>
  </div>
</template>

<script>
export default {
    name: "AppSettings",
    // JavaScript
};
</script>

<style scoped>
.box {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box > a {
  text-decoration: none;
  color: white;
}
.container-fluid img {
  max-height: 45px;
  max-width: 45px;
}
.logo {
  width: 35px;
  height: 35px;
}
</style>
