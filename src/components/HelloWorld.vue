<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/video-list">Video List</router-link></li>
            <li><router-link to="/record-video">Record Video</router-link></li>
            <li><router-link to="/app-settings">Settings</router-link></li>
        </ul>
    </nav>
    <button id="btn-vibrate" @click="vibrate()">Wibracja</button>
</template>

<script>
export default {
    name: "app-menu",
    methods: {
        vibrate() {
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
            } else {
                alert("Twoja przeglądarka nie obsługuje wibracji.");
            }
        },
    },
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
