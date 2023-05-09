<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid"> <!-- kontener przy zmniejszeniu lista -->
      <router-link class="navbar-brand" to="/">Home</router-link>
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
</style>
