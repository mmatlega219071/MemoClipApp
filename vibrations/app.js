 // Sprawdzenie czy przeglądarka obsługuje wibracje
 if ("vibrate" in navigator) {
  console.log("Twoja przeglądarka obsługuje wibracje!");
}

// Funkcja wywołująca wibracje
function vibrateDevice() {
  // Sprawdzenie czy wibracje są dostępne
  if ("vibrate" in navigator) {
    // Ustawienie czasu trwania wibracji
    navigator.vibrate([100, 100, 200]);
  }
}