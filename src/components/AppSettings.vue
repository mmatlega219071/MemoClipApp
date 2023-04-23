<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/video-list">Video List</router-link></li>
            <li><router-link to="/record-video">Record Video</router-link></li>
            <li><router-link to="/app-settings">Settings</router-link></li>
        </ul>
    </nav>
    <div>
        <!-- Settings component -->
        Settings
    </div>
</template>

<script>
export default {
    name: "AppSettings",
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
