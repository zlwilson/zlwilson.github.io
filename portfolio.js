document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".portfolio-item");
  const overlay = document.getElementById("portfolioOverlay");
  const closeModal = document.getElementById("closeModal");

  const modalImage = document.getElementById("modalImage");
  const modalImageGhost = document.getElementById("modalImageGhost");
  const modalTitle = document.getElementById("modalTitle");
  const modalYear = document.getElementById("modalYear");
  const modalDescription = document.getElementById("modalDescription");
  const modalDetails = document.querySelector(".portfolio-details");
  const modalClient = document.getElementById("modalClient");
  const modalRole = document.getElementById("modalRole");
  const modalTools = document.getElementById("modalTools");

  let activeThumb = null;

  function openOverlay(item) {
    const thumb = item.querySelector("img");
    const thumbRect = thumb.getBoundingClientRect();

    activeThumb = thumb;

    modalImage.src = item.dataset.image;
    modalImage.alt = item.dataset.title;
    modalTitle.textContent = item.dataset.title;
    modalYear.textContent = item.dataset.year;
    modalClient.textContent = item.dataset.client || "";
    modalRole.textContent = item.dataset.role || "";
    modalTools.textContent = item.dataset.tools || "";
    modalDescription.innerHTML = item.dataset.description;

    modalImage.classList.remove("visible");
    modalDetails.classList.remove("visible");

    modalImageGhost.src = item.dataset.image;
    modalImageGhost.alt = item.dataset.title;
    modalImageGhost.style.top = `${thumbRect.top}px`;
    modalImageGhost.style.left = `${thumbRect.left}px`;
    modalImageGhost.style.width = `${thumbRect.width}px`;
    modalImageGhost.style.height = `${thumbRect.height}px`;
    modalImageGhost.style.opacity = "1";
    modalImageGhost.style.transition = "none";

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const finalRect = modalImage.getBoundingClientRect();

      modalImageGhost.style.transition =
      "top 320ms ease, left 320ms ease, width 320ms ease, height 320ms ease, opacity 180ms ease";

      modalImageGhost.style.top = `${finalRect.top}px`;
      modalImageGhost.style.left = `${finalRect.left}px`;
      modalImageGhost.style.width = `${finalRect.width}px`;
      modalImageGhost.style.height = `${finalRect.height}px`;

      setTimeout(() => {
        modalImage.classList.add("visible");
        modalDetails.classList.add("visible");
        modalImageGhost.style.opacity = "0";
      }, 280);

      setTimeout(() => {
        modalImageGhost.style.transition = "none";
      }, 360);
    });
  }

  function closeOverlay() {
    if (!overlay.classList.contains("active")) return;

    const detailsWereVisible = modalDetails.classList.contains("visible");
    modalImage.classList.remove("visible");
    modalDetails.classList.remove("visible");

    if (!activeThumb) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      return;
    }

    const finalRect = modalImage.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();

    modalImageGhost.src = modalImage.src;
    modalImageGhost.alt = modalImage.alt;
    modalImageGhost.style.opacity = "1";
    modalImageGhost.style.top = `${finalRect.top}px`;
    modalImageGhost.style.left = `${finalRect.left}px`;
    modalImageGhost.style.width = `${finalRect.width}px`;
    modalImageGhost.style.height = `${finalRect.height}px`;
    modalImageGhost.style.transition = "none";

    requestAnimationFrame(() => {
      modalImageGhost.style.transition =
      "top 280ms ease, left 280ms ease, width 280ms ease, height 280ms ease, opacity 180ms ease";

      modalImageGhost.style.top = `${thumbRect.top}px`;
      modalImageGhost.style.left = `${thumbRect.left}px`;
      modalImageGhost.style.width = `${thumbRect.width}px`;
      modalImageGhost.style.height = `${thumbRect.height}px`;

      setTimeout(() => {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        modalImageGhost.style.opacity = "0";
      }, 260);

      setTimeout(() => {
        modalImageGhost.style.transition = "none";
        modalImageGhost.src = "";
      }, 320);
    });
  }

  items.forEach((item) => {
    item.addEventListener("click", () => openOverlay(item));
  });

  closeModal.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay();
    }
  });

  const track = document.querySelector(".portfolio-track");

  if (track && window.innerWidth > 768) {
    document.addEventListener(
      "wheel",
      (event) => {
        if (overlay.classList.contains("active")) return;

        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          event.preventDefault();
          track.scrollLeft += event.deltaY;
        }
      },
      { passive: false }
    );
  }
});
