document.addEventListener("DOMContentLoaded", () => {
  function createElement(type) {
    const el = document.createElement("div");

    switch (type) {
      case "button":
        el.innerHTML = `<button type="button" class="btn btn-primary">Button</button>`;
        break;
      case "progressbar":
        el.innerHTML = `
          <div class="progress" style="width: 150px;">
            <div class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar" style="width: 50%"
              aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>`;
        break;
      case "accordion":
        const id = Date.now();
        el.innerHTML = `
          <div class="accordion" id="accordion${id}">
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading${id}">
                <button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#collapse${id}"
                  aria-expanded="false" aria-controls="collapse${id}">
                  Accordion Item
                </button>
              </h2>
              <div id="collapse${id}" class="accordion-collapse collapse"
                aria-labelledby="heading${id}" data-bs-parent="#accordion${id}">
                <div class="accordion-body">
                  Content for the accordion goes here.
                </div>
              </div>
            </div>
          </div>`;
        break;
      case "placeholder":
        el.innerHTML = `
          <div class="placeholder-glow" style="width: 150px;">
            <span class="placeholder col-12"></span>
          </div>`;
        break;
      case "badge":
        el.innerHTML = `<span class="badge text-bg-success">Badge</span>`;
        break;
      default:
        return null;
    }

    return el;
  }

  const buttons = document.querySelectorAll(".button-group button");
  const canvas = document.getElementById("canvas");
  const deleteLastBtn = document.querySelector('[data-action="delete-last"]');
  const deleteAllBtn = document.querySelector('[data-action="delete-all"]');

  let selected = null;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  const placedTypes = {
    button: false,
    progressbar: false,
    accordion: false,
    placeholder: false,
    badge: false,
  };

  function allTypesPlaced() {
    return Object.values(placedTypes).every((val) => val === true);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", btn.getAttribute("data-type"));
    });
  });

  canvas.addEventListener("dragover", (e) => e.preventDefault());

  canvas.addEventListener("drop", (e) => {
    e.preventDefault();

    const type = e.dataTransfer.getData("text/plain");
    const newEl = createElement(type);

    if (!newEl) return;

    newEl.classList.add("draggable");
    newEl.style.left = `${e.offsetX}px`;
    newEl.style.top = `${e.offsetY}px`;
    newEl.setAttribute("tabindex", "0");
    newEl.style.position = "absolute";

    newEl.addEventListener("mousedown", (ev) => {
      ev.stopPropagation();
      selected = newEl;
      offsetX = ev.clientX - newEl.getBoundingClientRect().left;
      offsetY = ev.clientY - newEl.getBoundingClientRect().top;
      isDragging = true;

      canvas.querySelectorAll(".selected").forEach((el) =>
        el.classList.remove("selected")
      );
      newEl.classList.add("selected");
      newEl.focus();
    });

    newEl.addEventListener("click", (ev) => {
      ev.stopPropagation();
      canvas.querySelectorAll(".selected").forEach((el) =>
        el.classList.remove("selected")
      );
      newEl.classList.add("selected");
      selected = newEl;
      newEl.focus();
    });

    canvas.appendChild(newEl);

    if (placedTypes.hasOwnProperty(type)) {
      placedTypes[type] = true;

      if (allTypesPlaced()) {
        const popup = document.getElementById("popup-message");
        popup.classList.remove("d-none");

        setTimeout(() => {
          popup.classList.add("d-none");
        }, 4000);
      }
    }
  });

  canvas.addEventListener("click", () => {
    canvas.querySelectorAll(".selected").forEach((el) =>
      el.classList.remove("selected")
    );
    selected = null;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging || !selected) return;

    const canvasRect = canvas.getBoundingClientRect();
    let newLeft = e.clientX - canvasRect.left - offsetX;
    let newTop = e.clientY - canvasRect.top - offsetY;

    newLeft = Math.max(0, Math.min(newLeft, canvas.clientWidth - selected.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, canvas.clientHeight - selected.offsetHeight));

    selected.style.left = `${newLeft}px`;
    selected.style.top = `${newTop}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("keydown", (e) => {
    if (!selected) return;

    const step = 5;
    const left = parseInt(selected.style.left || 0);
    const top = parseInt(selected.style.top || 0);

    switch (e.key) {
      case "ArrowUp":
        selected.style.top = `${top - step}px`;
        e.preventDefault();
        break;
      case "ArrowDown":
        selected.style.top = `${top + step}px`;
        e.preventDefault();
        break;
      case "ArrowLeft":
        selected.style.left = `${left - step}px`;
        e.preventDefault();
        break;
      case "ArrowRight":
        selected.style.left = `${left + step}px`;
        e.preventDefault();
        break;
    }
  });

  deleteLastBtn.addEventListener("click", () => {
    const all = canvas.querySelectorAll(".draggable");
    if (all.length) {
      const last = all[all.length - 1];
      if (last === selected) selected = null;
      last.remove();
    }
  });

  deleteAllBtn.addEventListener("click", () => {
    canvas.innerHTML = "";
    selected = null;

    for (let key in placedTypes) {
      placedTypes[key] = false;
    }
  });
});
