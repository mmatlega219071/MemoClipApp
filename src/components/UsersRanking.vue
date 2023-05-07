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
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/video-list" class="nav-link"
                >Video list</router-link
              >
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/user-ranking" class="nav-link"
                >Users raning </router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/app-settings" class="nav-link"
                >Settings App - test</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/welcome"
                >Welcome Site</router-link
              >
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/login">Log in</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/register">Sign up</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link btn btn-link" @click="handleSignOut">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <h2>Ranking list:</h2>
        <table>
          <tr>
            <th>User</th>
            <th>Number of recorded videos</th>
          </tr>
          <tr>
            <td>Jan Kowalski</td>
            <td>10 videos</td>
          </tr>
          <tr>
            <td>Piotr Nowak</td>
            <td>5 videos</td>
          </tr>
          <tr>
            <td>Julia Lis</td>
            <td>3 videos</td>
          </tr>
        </table>
      </div>
    </div>
  </template>

<script>
export default {
    name: "WelcomeScreen",
    // JavaScript
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
</style>