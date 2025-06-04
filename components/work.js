function runIntro() {
  const mm = gsap.matchMedia();
  mm.add("(min-width:900px)", () => {
    gsap.set(".work-images-preview img", { scale: 1.3 });
    gsap.from(".line", {
      width: 0,
      ease: "power4.inOut",
      duration: 1,
      stagger: 0.03,
    });
    gsap.to(".work-images-preview img", {
      scale: 1,
      ease: "power2.inOut",
      duration: 1.3,
    });
  });
}

function previewImage() {
  const imgNames = document.querySelectorAll(".img-name");
  const workImagePreview = document.querySelector(".work-images-preview");
  const overlayImage = document.querySelector(".overlay-img");
  const overlayName = document.querySelector(".overlay-name");
  const closeBtn = document.querySelector(".overlay-btn");
  const previewOverlay = document.querySelector(".preview-overlay");
  imgNames.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      const dataImg = img.getAttribute("data-img");
      workImagePreview.innerHTML = `<img src="assets/${dataImg}.jpg" alt=${dataImg}/>`;
    });
  });

  imgNames.forEach((img) => {
    img.addEventListener("click", () => {
      const dataImg = img.getAttribute("data-img");
      overlayImage.innerHTML = `<img src="assets/${dataImg}.jpg" alt="preview-image"/>`;
      const name = img.querySelectorAll("h4")[1].textContent;
      overlayName.textContent = name;
      previewOverlay.classList.add("overlay-active");
      if (img) document.body.style.overflow = "hidden";
    });
  });
  function closeOverlay() {
    previewOverlay.classList.remove("overlay-active");
    if (closeBtn) document.body.style.overflow = "";
  }
  closeBtn.addEventListener("click", closeOverlay);
}

document.addEventListener("DOMContentLoaded", function () {
  previewImage();
  runIntro();
});
