const menuToggle = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".drawer");
const cookieButtons = document.querySelectorAll(".cookie-close");
const cookieBar = document.querySelector(".cookie-bar");
const modalTriggers = document.querySelectorAll("[data-open-modal]");
const typeSelect = document.querySelector("#type-select");
const preview = document.querySelector("#pseudo-product");
const widthInput = document.querySelector("#width-input");
const heightInput = document.querySelector("#height-input");
const widthLabel = document.querySelector("#width-label");
const heightLabel = document.querySelector("#height-label");
const priceOutput = document.querySelector("#price-output");
const summaryTitle = document.querySelector("#summary-title");
const summaryMaterial = document.querySelector("#summary-material");
const quoteMessage = document.querySelector("#quote-message");
const photoInput = document.querySelector("#photo-input");
const photoStatus = document.querySelector("#photo-status");
const productShortcuts = document.querySelectorAll("[data-product-shortcut]");

const productTypes = {
  ramen: ["Vast raam", "Draai-kiepraam", "Dubbel raam", "Raam met bovenlicht", "Panoramisch raam"],
  deuren: ["Voordeur", "Achterdeur", "Deur met glas", "Deur met zijlicht", "Moderne voordeur"],
  schuiframen: ["2-delig schuifraam", "3-delig schuifraam", "Hefschuifraam"]
};

const productLabels = {
  ramen: "Ramen",
  deuren: "Deuren",
  schuiframen: "Schuiframen"
};

const config = {
  product: "ramen",
  type: "Dubbel raam",
  material: "PVC",
  package: "Standaard",
  color: "#f6f7f8",
  colorLabel: "Wit",
  width: 160,
  height: 140,
  options: new Set(["placement"]),
  photoName: ""
};

function setDrawer(open) {
  drawer.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
}

function setActiveButton(group, value) {
  document.querySelectorAll(`[data-config-group="${group}"] button`).forEach((button) => {
    const isActive = button.dataset.value === value;
    button.classList.toggle("active", isActive);
  });
}

function setProduct(product) {
  config.product = product;
  config.type = productTypes[product][product === "ramen" ? 2 : 0];
  populateTypes();
  setActiveButton("product", product);
  productShortcuts.forEach((card) => {
    card.classList.toggle("active", card.dataset.productShortcut === product);
  });
  updateConfigurator();
}

function populateTypes() {
  typeSelect.innerHTML = productTypes[config.product]
    .map((type) => `<option value="${type}">${type}</option>`)
    .join("");
  typeSelect.value = config.type;
}

function darken(hex) {
  if (hex === "#f6f7f8") {
    return "#d1d8df";
  }
  if (hex === "#8b5f3f") {
    return "#5d3c27";
  }
  return "#111820";
}

function renderPreview() {
  preview.style.setProperty("--product-color", config.color);
  preview.style.setProperty("--product-dark", darken(config.color));
  preview.style.setProperty("--w", Math.min(Math.max(config.width / 160, .8), 1.55));
  preview.style.setProperty("--h", Math.min(Math.max(config.height / 140, .82), 1.38));

  if (config.product === "deuren") {
    preview.innerHTML = `
      <div class="pseudo-door">
        <div class="door-glass"></div>
        <div class="pseudo-handle"></div>
      </div>
    `;
    return;
  }

  if (config.product === "schuiframen") {
    preview.innerHTML = `
      <div class="pseudo-slider">
        <span></span>
        <span></span>
      </div>
      <div class="pseudo-handle"></div>
    `;
    return;
  }

  const hasTwoPanels = config.type.includes("Dubbel") || config.type.includes("Panoramisch");
  const topLight = config.type.includes("bovenlicht");

  preview.innerHTML = hasTwoPanels
    ? `
      <div class="pseudo-panel left"></div>
      <div class="pseudo-panel right"></div>
      <div class="pseudo-mullion"></div>
      <div class="pseudo-handle"></div>
      ${topLight ? '<div class="top-light"></div>' : ""}
    `
    : `
      <div class="pseudo-frame"></div>
      <div class="pseudo-handle"></div>
      ${topLight ? '<div class="top-light"></div>' : ""}
    `;
}

function calculatePrice() {
  const area = Math.max(config.width * config.height / 10000, .8);
  const base = {
    ramen: 620,
    deuren: 1150,
    schuiframen: 1380
  }[config.product];

  const materialMultiplier = {
    PVC: 1,
    Aluminium: 1.28,
    Hout: 1.18
  }[config.material];

  const packageMultiplier = {
    Economisch: .88,
    Standaard: 1,
    Premium: 1.28
  }[config.package];

  let options = 0;
  if (config.options.has("triple")) options += 260;
  if (config.options.has("ventilation")) options += 95;
  if (config.options.has("placement")) options += 420;

  return Math.round((base * area * materialMultiplier * packageMultiplier + options) / 10) * 10;
}

function updateQuoteMessage(price) {
  const optionLabels = {
    triple: "Driedubbel glas",
    ventilation: "Ventilatierooster",
    placement: "Plaatsing door Bluepen"
  };
  const options = Array.from(config.options).map((option) => optionLabels[option]).join(", ") || "Geen extra opties";

  quoteMessage.value = [
    `Product: ${productLabels[config.product]}`,
    `Type: ${config.type}`,
    `Materiaal: ${config.material}`,
    `Pakket: ${config.package}`,
    `Kleur: ${config.colorLabel}`,
    `Afmetingen: ${config.width} x ${config.height} cm`,
    `Opties: ${options}`,
    `Voorlopige richtprijs: vanaf €${price.toLocaleString("nl-BE")}`,
    config.photoName ? `Foto toegevoegd: ${config.photoName}` : "Foto toegevoegd: nee"
  ].join("\n");
}

function updateConfigurator() {
  config.width = Number(widthInput.value) || 160;
  config.height = Number(heightInput.value) || 140;
  widthLabel.textContent = `${config.width} cm`;
  heightLabel.textContent = `${config.height} cm`;

  renderPreview();

  const price = calculatePrice();
  priceOutput.textContent = `vanaf €${price.toLocaleString("nl-BE")}`;
  summaryTitle.textContent = `${productLabels[config.product]} - ${config.type}`;
  summaryMaterial.textContent = `${config.material} / ${config.package} / ${config.colorLabel}`;
  updateQuoteMessage(price);
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
      updateConfigurator();
      modal.showModal();
    }
  });
});

document.querySelectorAll("[data-config-group]").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button) return;

    const groupName = group.dataset.configGroup;
    const value = button.dataset.value;

    if (groupName === "product") {
      setProduct(value);
      return;
    }

    if (groupName === "material") config.material = value;
    if (groupName === "package") config.package = value;
    if (groupName === "color") {
      config.color = value;
      config.colorLabel = button.dataset.label;
    }

    setActiveButton(groupName, value);
    updateConfigurator();
  });
});

typeSelect.addEventListener("change", () => {
  config.type = typeSelect.value;
  updateConfigurator();
});

[widthInput, heightInput].forEach((input) => {
  input.addEventListener("input", updateConfigurator);
});

document.querySelectorAll(".check-list input").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      config.options.add(checkbox.value);
    } else {
      config.options.delete(checkbox.value);
    }
    updateConfigurator();
  });
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  config.photoName = file ? file.name : "";
  photoStatus.textContent = file ? `${file.name} geselecteerd.` : "Sleep of kies een foto voor betere inschatting.";
  updateConfigurator();
});

productShortcuts.forEach((card) => {
  card.addEventListener("click", () => {
    setProduct(card.dataset.productShortcut);
    document.querySelector("#configurator").scrollIntoView({ behavior: "smooth" });
  });
});

populateTypes();
updateConfigurator();
