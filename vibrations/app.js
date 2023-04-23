class VibrationApp {
  constructor() {
    this.vibrateBtn = document.getElementById("vibrate-btn");
    this.addEventListeners();
  }

  addEventListeners() {
    this.vibrateBtn.addEventListener("click", this.handleVibrateBtnClick.bind(this));
  }

  handleVibrateBtnClick() {
    if (navigator.vibrate) {
      // Vibrate for 500ms
      navigator.vibrate(500,200,100);
    } else {
      alert("Vibration is not supported in your browser.");
    }
  }
}

// Initialize the app
const app = new VibrationApp();