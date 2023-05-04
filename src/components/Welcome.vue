<template>
    <header>
      <nav class="nav-site">
        <div class="div-class">
          <h1 class="header-1">
            <li class="nav-item-LogIn"><router-link to="/" class="navbar-brand">
                <img src="../../public/img/icons/MemoClip-128x128.png" alt="App Logo" class="logo"/></router-link>
            </li>
            <li class="appName">Memoclip</li>
            <li class="nav-item-LogIn">Welcome!</li>
            <li class="nav-item-LogIn"><router-link class="nav-link" to="/login">Log in</router-link></li>
            <li class="nav-item-LogIn"><router-link class="nav-link" to="/register">Sign on</router-link></li>
            </h1>
        </div>
      </nav>
    </header>
  </template>

<script>
export default {
    name: "WelcomeScreen",
    // JavaScript
};
</script>

<style scoped>
.div-class {
    height: 1000vh;
    min-height: 00px; /* Change the value as needed */
    margin: 0;
    padding: 0;
    color: #ffffff;

}

.header-1 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.nav-site {
    background-color: #343a40;/* Kolor tła  */
}
.appName {
  list-style-type: none;
  margin: 0 0.5rem;
}
.nav-item-LogIn {
  list-style-type: none;
  margin: 0 0.5rem;
}

.nav-link {
  color: #ffffff;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.nav-link:hover {
  color: #343a40;
  background-color: #ffffff;
}

@media screen and (max-width: 768px) {
  .header-1 {
    top: 50%;
  }

}

@media screen and (min-width: 768px) {
  .header-1 {
    top: 50%;
  }

}
</style>