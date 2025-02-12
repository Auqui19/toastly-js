class Toastly {
  constructor({
    text = "",
    type = "dark",
    duration = 3000,
    bgColor = null,
  } = {}) {
    this.createToastElement();
    this.timeoutId = null;

    if (text) {
      this.show({ text, type, duration, bgColor });
    }
  }

  createToastElement() {
    this.toast = document.createElement("div");
    this.toast.className = "toastly hidden";

    this.toastMessage = document.createElement("p");
    this.toastMessage.className = "toast-message";
    this.toast.appendChild(this.toastMessage);

    this.closeButton = document.createElement("button");
    this.closeButton.className = "toastly-close";
    this.closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12"/><path d="M6 6l12 12"/></svg>`;
    this.closeButton.addEventListener("click", () => this.hide());

    this.toast.appendChild(this.closeButton);

    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.style.position = "fixed";
      toastContainer.style.top = "20px";
      toastContainer.style.right = "20px";
      toastContainer.style.zIndex = "1000";
      toastContainer.style.display = "flex";
      toastContainer.style.flexDirection = "column";
      toastContainer.style.gap = "10px";
      document.body.appendChild(toastContainer);
    }

    toastContainer.appendChild(this.toast);
  }

  show({ text, type = "info", duration = 3000, bgColor = null }) {
    this.toast.classList.add(type, "show");

    if (bgColor) {
      this.toast.style.backgroundColor = bgColor;
      this.toast.style.boxShadow = `0 0px 10px ${bgColor}`;
    }

    this.toastMessage.textContent = text;
    this.toast.classList.remove("hidden");

    if (duration > 0) {
      this.timeoutId = setTimeout(() => this.hide(), duration);
    }
  }

  hide() {
    this.toast.classList.add("hide");
    this.toast.addEventListener(
      "animationend",
      () => {
        this.toast.remove();
      },
      { once: true }
    );
  }
}

window.Toastly = (options) => new Toastly(options);
