class Toastly {
  constructor() {
    this.toast = document.getElementById("toastly");
    if (!this.toast) {
      this.toast = document.createElement("div");
      this.toast.id = "toastly";
      this.toast.className = "toastly hidden";
      document.body.appendChild(this.toast);
    }

    this.toastMessage = document.getElementById("toast-message");
    if (!this.toastMessage) {
      this.toastMessage = document.createElement("p");
      this.toastMessage.id = "toast-message";
      this.toast.appendChild(this.toastMessage);
    }

    this.closeButton = document.getElementById("toast-close");
    if (!this.closeButton) {
      this.closeButton = document.createElement("button");
      this.closeButton.id = "toast-close";
      this.closeButton.className = "toastly-close";
      this.closeButton.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`;
      this.closeButton.addEventListener("click", () => this.hide());
      this.toast.appendChild(this.closeButton);
    }

    this.timeouId = null;
  }

  show(message, type = "info", duration = 3000, bgColor = null) {
    if (this.timeouId) {
      clearTimeout(this.timeouId);
    }

    this.toast.classList.remove(
      "success",
      "error",
      "info",
      "warning",
      "show",
      "hide"
    );

    this.toast.classList.add(type);

    if (bgColor) {
      this.toast.style.backgroundColor = bgColor;
      this.toast.style.boxShadow = `0 0px 10px ${bgColor}`;
    } else {
      this.toast.style.backgroundColor = "";
      this.toast.style.boxShadow = "";
    }

    this.toastMessage.textContent = message;

    // Mostrar el toast
    this.toast.classList.remove("hidden");
    this.toast.classList.add("show");

    if (duration > 0) {
      this.timeouId = setTimeout(() => this.hide(), duration);
    }
  }
  hide() {
    // Ocultar el toast
    this.toast.classList.remove("show");
    this.toast.classList.add("hide");

    this.toast.addEventListener(
      "animationend",
      () => {
        this.toast.classList.remove("hide");
        this.toast.classList.add("hidden");
        this.toastMessage.textContent = "";
        this.toast.style.backgroundColor = "";
        this.toast.style.boxShadow = "";
      },
      { once: true }
    );
  }
}

window.Toastly = Toastly;
