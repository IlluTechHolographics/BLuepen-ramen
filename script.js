const menuToggle = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".drawer");
const cookieButtons = document.querySelectorAll(".cookie-close");
const cookieBar = document.querySelector(".cookie-bar");
const modalTriggers = document.querySelectorAll("[data-open-modal]");
const typeSelect = document.querySelector("#type-select");
const preview = document.querySelector("#pseudo-product");
const widthInput = document.querySelector("#width-input");
const heightInput = document.querySelector("#height-input");
const depthInput = document.querySelector("#depth-input");
const lengthField = document.querySelector(".length-field");
const widthLabel = document.querySelector("#width-label");
const heightLabel = document.querySelector("#height-label");
const priceOutput = document.querySelector("#price-output");
const summaryTitle = document.querySelector("#summary-title");
const summaryMaterial = document.querySelector("#summary-material");
const quoteMessage = document.querySelector("#quote-message");
const photoInput = document.querySelector("#photo-input");
const photoStatus = document.querySelector("#photo-status");
const productRender = document.querySelector("#product-render");
const renderLabel = document.querySelector("#render-label");
const productShortcuts = document.querySelectorAll("[data-product-shortcut]");
const footerProductLinks = document.querySelectorAll("[data-footer-product]");

const products = {
  ramen: {
    label: "Ramen",
    image: "https://d3go3e0145fp2e.cloudfront.net/img/all-in-one/okna.png",
    types: ["Vast raam", "Draai-kiepraam", "Dubbel raam", "Raam met bovenlicht", "Panoramisch raam", "3-delig raam"],
    materials: ["PVC", "Aluminium", "Hout"],
    defaultType: "Dubbel raam",
    base: 620,
    width: [50, 420, 160],
    height: [50, 280, 140]
  },
  deuren: {
    label: "Deuren",
    image: "https://d3go3e0145fp2e.cloudfront.net/img/all-in-one/drzwi-wejsciowe.png",
    types: ["Voordeur vlak", "Voordeur met glasstrook", "Deur met zijlicht", "Dubbele deur", "Achterdeur", "Moderne paneeldeur"],
    materials: ["PVC", "Aluminium", "Hout"],
    defaultType: "Voordeur met glasstrook",
    base: 1150,
    width: [90, 180, 100],
    height: [200, 240, 215]
  },
  schuiframen: {
    label: "Schuiframen",
    image: "https://d3go3e0145fp2e.cloudfront.net/img/all-in-one/systemy-przesuwne.png",
    types: ["2-delig schuifraam", "3-delig schuifraam", "Hefschuifraam", "Panoramisch schuifraam"],
    materials: ["PVC", "Aluminium", "Hout"],
    defaultType: "2-delig schuifraam",
    base: 1380,
    width: [210, 500, 300],
    height: [180, 260, 220]
  },
  horren: {
    label: "Horren",
    image: "https://d3go3e0145fp2e.cloudfront.net/img/all-in-one/moskitiery.png",
    types: ["Vaste raamhor", "Inzethor", "Rolhor", "Schuifhor", "Deurhor"],
    materials: ["Aluminium"],
    defaultType: "Vaste raamhor",
    base: 180,
    width: [50, 220, 100],
    height: [50, 240, 140]
  },
  rolluiken: {
    label: "Rolluiken",
    image: "https://d3go3e0145fp2e.cloudfront.net/img/all-in-one/rolety.png",
    types: ["Opbouwrolluik", "Voorzetrolluik", "Inbouwrolluik", "Screens", "Gevelzonwering"],
    materials: ["Aluminium", "PVC"],
    defaultType: "Opbouwrolluik",
    base: 420,
    width: [70, 320, 160],
    height: [60, 300, 180]
  },
  garagepoorten: {
    label: "Garagepoorten",
    image: "https://d3go3e0145fp2e.cloudfront.net/img/all-in-one/bramy-conf.png",
    types: ["Sectionaalpoort", "Rolpoort", "Poort met vlak paneel", "Poort met belijning", "Automatische garagepoort"],
    materials: ["Aluminium", "Staal"],
    defaultType: "Sectionaalpoort",
    base: 1550,
    width: [200, 500, 300],
    height: [200, 320, 240]
  },
  afsluitingen: {
    label: "Afsluitingen",
    image: "https://d3go3e0145fp2e.cloudfront.net/img/all-in-one/ogrodzenia.png",
    types: ["Tuinpoort", "Schuifpoort", "Draaipoort", "Moderne afsluiting", "Spijlenhek"],
    materials: ["Aluminium", "Staal"],
    defaultType: "Moderne afsluiting",
    base: 520,
    width: [120, 600, 300],
    height: [80, 220, 140]
  },
  pergolas: {
    label: "Pergola's",
    image: "https://d3go3e0145fp2e.cloudfront.net/img/all-in-one/pergole.png",
    types: ["Vrijstaande pergola", "Pergola aan gevel", "Lamellendak", "Pergola met screen", "Terrasoverkapping"],
    materials: ["Aluminium"],
    defaultType: "Pergola aan gevel",
    base: 1850,
    width: [120, 500, 320],
    height: [160, 320, 240],
    depth: [128, 686, 350]
  }
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
  depth: 250,
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
  const productData = products[product];
  config.type = productData.defaultType;
  config.material = productData.materials[0];
  config.width = productData.width[2];
  config.height = productData.height[2];
  config.depth = productData.depth ? productData.depth[2] : 250;
  widthInput.min = productData.width[0];
  widthInput.max = productData.width[1];
  widthInput.value = config.width;
  heightInput.min = productData.height[0];
  heightInput.max = productData.height[1];
  heightInput.value = config.height;
  if (productData.depth) {
    depthInput.min = productData.depth[0];
    depthInput.max = productData.depth[1];
    depthInput.value = config.depth;
    lengthField.classList.add("show");
  } else {
    lengthField.classList.remove("show");
  }
  populateTypes();
  updateMaterialButtons();
  setActiveButton("product", product);
  productShortcuts.forEach((card) => {
    card.classList.toggle("active", card.dataset.productShortcut === product);
  });
  updateConfigurator();
}

function populateTypes() {
  typeSelect.innerHTML = products[config.product].types
    .map((type) => `<option value="${type}">${type}</option>`)
    .join("");
  typeSelect.value = config.type;
}

function updateMaterialButtons() {
  const available = products[config.product].materials;
  document.querySelectorAll('[data-config-group="material"] button').forEach((button) => {
    const enabled = available.includes(button.dataset.value);
    button.disabled = !enabled;
    button.classList.toggle("hidden-choice", !enabled);
    button.classList.toggle("active", button.dataset.value === config.material);
  });
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

function edgeColor(hex) {
  if (hex === "#f6f7f8" || hex === "#ede7dc") {
    return "#2b3641";
  }
  if (hex === "#d8c4a0" || hex === "#b98b4b") {
    return "#6f4a24";
  }
  return hex;
}

function renderPreview() {
  preview.style.setProperty("--product-color", config.color);
  preview.style.setProperty("--product-dark", darken(config.color));
  preview.style.setProperty("--product-edge", edgeColor(config.color));
  preview.style.setProperty("--w", Math.min(Math.max(config.width / 160, .8), 1.55));
  preview.style.setProperty("--h", Math.min(Math.max(config.height / 140, .82), 1.38));
  productRender.src = products[config.product].image;
  productRender.alt = `${products[config.product].label} voorbeeld`;
  renderLabel.textContent = products[config.product].label;

  if (config.product === "deuren") {
    const glass = config.type.includes("glas") || config.type.includes("zijlicht");
    const sideLight = config.type.includes("zijlicht");
    preview.innerHTML = `
      <div class="pseudo-door">
        ${glass ? '<div class="door-glass"></div>' : ""}
        ${sideLight ? '<div class="side-light"></div>' : ""}
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
        ${config.type.includes("3-delig") ? "<span></span>" : ""}
      </div>
      <div class="pseudo-handle"></div>
    `;
    return;
  }

  if (config.product === "horren") {
    preview.innerHTML = '<div class="pseudo-screen"></div>';
    return;
  }

  if (config.product === "rolluiken") {
    preview.innerHTML = '<div class="pseudo-shutter"></div>';
    return;
  }

  if (config.product === "garagepoorten") {
    preview.innerHTML = '<div class="pseudo-garage"></div>';
    return;
  }

  if (config.product === "afsluitingen") {
    preview.innerHTML = '<div class="pseudo-fence"><span></span><span></span><span></span><span></span><span></span></div>';
    return;
  }

  if (config.product === "pergolas") {
    preview.innerHTML = '<div class="pseudo-pergola"></div>';
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
  const depthFactor = config.product === "pergolas" ? Math.max(config.depth / 250, 1) : 1;
  const base = products[config.product].base;

  const materialMultiplier = {
    PVC: 1,
    Aluminium: 1.28,
    Hout: 1.18,
    Staal: 1.12
  }[config.material] || 1;

  const packageMultiplier = {
    Economisch: .88,
    Standaard: 1,
    Premium: 1.28
  }[config.package];

  let options = 0;
  if (config.options.has("triple")) options += 260;
  if (config.options.has("ventilation")) options += 95;
  if (config.options.has("placement")) options += 420;

  return Math.round((base * area * depthFactor * materialMultiplier * packageMultiplier + options) / 10) * 10;
}

function updateQuoteMessage(price) {
  const optionLabels = {
    triple: "Driedubbel glas",
    ventilation: "Ventilatierooster",
    placement: "Plaatsing door Bluepen"
  };
  const options = Array.from(config.options).map((option) => optionLabels[option]).join(", ") || "Geen extra opties";

  quoteMessage.value = [
    `Product: ${products[config.product].label}`,
    `Type: ${config.type}`,
    `Materiaal: ${config.material}`,
    `Pakket: ${config.package}`,
    `Kleur: ${config.colorLabel}`,
    `Afmetingen: ${config.width} x ${config.height} cm`,
    config.product === "pergolas" ? `Diepte/lengte: ${config.depth} cm` : "",
    `Opties: ${options}`,
    `Voorlopige richtprijs: vanaf EUR ${price.toLocaleString("nl-BE")}`,
    config.photoName ? `Foto toegevoegd: ${config.photoName}` : "Foto toegevoegd: nee"
  ].filter(Boolean).join("\n");
}

function updateConfigurator() {
  config.width = Number(widthInput.value) || 160;
  config.height = Number(heightInput.value) || 140;
  config.depth = Number(depthInput.value) || 250;
  widthLabel.textContent = `${config.width} cm`;
  heightLabel.textContent = `${config.height} cm`;

  renderPreview();

  const price = calculatePrice();
  priceOutput.textContent = `vanaf EUR ${price.toLocaleString("nl-BE")}`;
  summaryTitle.textContent = `${products[config.product].label} - ${config.type}`;
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

[widthInput, heightInput, depthInput].forEach((input) => {
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

footerProductLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setProduct(link.dataset.footerProduct);
  });
});

populateTypes();
updateMaterialButtons();
updateConfigurator();
