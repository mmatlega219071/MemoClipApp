/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("Aplikacja jest gotowa do działania offline.");
    },
    registered() {
      console.log("Service worker zarejestrowany.");
    },
    cached() {
      console.log("Zasoby zostały załadowane z pamięci podręcznej.");
    },
    updatefound() {
      console.log("Aktualizacja dostępna.");
    },
    updated() {
      console.log(
        "Nowa wersja aplikacji jest dostępna. Proszę załadować ponownie."
      );
    },
    offline() {
      console.log(
        "Brak połączenia z internetem. Aplikacja działa w trybie offline."
      );
    },
    error(error) {
      console.error("Błąd service worker:", error);
    },
  });
}

// Create Vue instance and mount to DOM
const app = createApp(App);
app.use(router);
app.mount("#app");
