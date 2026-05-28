const menuToggle = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".drawer");
const cookieButtons = document.querySelectorAll(".cookie-close");
const cookieBar = document.querySelector(".cookie-bar");
const modalTriggers = document.querySelectorAll("[data-open-modal]");

function setDrawer(open) {
  drawer.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setDrawer(!drawer.classList.contains("open"));
});

drawer.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setDrawer(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawer(false);
  }
});

cookieButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cookieBar.classList.add("hide");
  });
});

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    const modalName = trigger.dataset.openModal;
    const modal = document.querySelector(`#${modalName}-modal`);
    if (modal) {
      event.preventDefault();
      modal.showModal();
    }
  });
});
