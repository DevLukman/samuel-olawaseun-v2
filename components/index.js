gsap.registerPlugin(ScrollTrigger, SplitText);

document.fonts.ready.then(() => {
  SplitText.create(".des p", {
    type: "lines",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      return gsap.from(self.lines, {
        yPercent: 100,
        ease: "expo.inOut",
        stagger: 0.05,
        duration: 1.5,
        delay: 0.5,
        onComplete: () => self.revert(),
        scrollTrigger: {
          trigger: ".des p",
          start: "clamp(top center)",
          end: "clamp(center bottom)",
        },
      });
    },
  });
});

function hoverEffect() {
  // home section
  const previewBtn = document.querySelectorAll(
    ".preview-main-2-heading button"
  );
  previewBtn.forEach((btn) => btn.addEventListener("click", filterItem));
  function setActive(e) {
    previewBtn.forEach((btn) => btn.classList.remove("active-show-btn"));
    e.target.classList.add("active-show-btn");
  }

  function filterItem(e) {
    setActive(e);
    //archive and projects images display
    const none = document.querySelectorAll(".none");
    none.forEach((non) => {
      non.classList.remove("active-showcase");
      const data = e.target.getAttribute("data-show");
      const nonData = non.getAttribute("data-project");
      if (data === nonData) non.classList.add("active-showcase");
    });
    // archive and conent display
    const previewMainContent = document.querySelectorAll(
      ".preview-main-content"
    );
    previewMainContent.forEach((main) => {
      main.classList.remove("show-active");
      const data = e.target.getAttribute("data-show");
      const mainData = main.getAttribute("data-preview");
      if (data === mainData) main.classList.add("show-active");
    });
  }
}

// home section start
function changeActive1() {
  const previewImageName = document.querySelectorAll(
    "#project .preview-img-name p"
  );
  const justImage = document.querySelectorAll(
    ".just-image .preview-image-holder"
  );
  slideId = 0;
  slideId = 0;
  setInterval(updateActive, 3000);
  updateActive();
  function updateActive() {
    if (slideId > previewImageName.length - 1) {
      previewImageName.forEach((name) => name.classList.remove("active-p"));
      justImage.forEach((img) => img.classList.remove("active-holder"));
      slideId = 0;
    }
    previewImageName.forEach((name) => name.classList.remove("active-p"));
    justImage.forEach((img) => img.classList.remove("active-holder"));
    previewImageName[slideId].classList.add("active-p");
    justImage[slideId].classList.add("active-holder");
    slideId++;
  }
  updateActive();
}
function changeActive2() {
  const archiveName = document.querySelectorAll("#archive .preview-img-name p");
  const archiveImage = document.querySelectorAll(
    ".just-archive .preview-image-holder"
  );
  slide = 0;
  setInterval(updateSlide, 3000);
  updateSlide();

  function updateSlide() {
    if (slide > archiveName.length - 1) {
      archiveName.forEach((name) => name.classList.remove("active-p"));
      archiveImage.forEach((img) => img.classList.remove("active-holder"));
      slide = 0;
    }
    archiveName.forEach((name) => name.classList.remove("active-p"));
    archiveImage.forEach((img) => img.classList.remove("active-holder"));
    archiveName[slide].classList.add("active-p");
    archiveImage[slide].classList.add("active-holder");
    slide++;
  }
  updateSlide();
}

function changeHoverOn() {
  const previewHover = document.querySelectorAll(" #project .preview-img-name");
  const previewHoverImage = document.querySelector(
    ".just-image .active-holder"
  );
  const archiveHover = document.querySelectorAll(" #archive .preview-img-name");
  const archiveHoverImage = document.querySelector(
    ".just-archive .active-holder"
  );
  previewHover.forEach((hover) => {
    hover.addEventListener("mousemove", function () {
      const dataHover = hover.getAttribute("data-img");
      previewHoverImage.innerHTML = `<img src="assets/${dataHover}.jpg" alt="image">`;
    });
  });
  archiveHover.forEach((archive) => {
    archive.addEventListener("mousemove", function () {
      const archiveHover = archive.getAttribute("data-img");
      archiveHoverImage.innerHTML = `<img src="assets/${archiveHover}.jpg" alt="image">`;
    });
  });
}

function intro() {
  const timeline = gsap.timeline({
    onStart: () => {
      document.body.style.overflow = "hidden";
    },
    onComplete: () => {
      document.body.style.overflow = "";
      document.querySelector(".intro").style.display = "none";
    },
  });
  timeline.from(".bar", {
    width: 0,
    duration: 2.5,
    ease: "power4.inOut",
  });

  timeline.to(
    ".intro-img-3",
    {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.8,
      ease: "power4.inOut",
    },
    "<0.3"
  );
  timeline.to(
    ".intro-img-2",
    {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.8,
      ease: "power4.inOut",
    },
    "-=1"
  );
  timeline.to(
    ".intro-img-1",
    {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.8,
      ease: "power4.inOut",
    },
    "-=1"
  );
  timeline.to(
    ".bar-container",
    {
      x: "100vw",
      duration: 1.8,
      ease: "power4.inOut",
    },
    "-=2"
  );
  timeline.to(
    ".information-container",
    {
      yPercent: -100,
      ease: "power4.inOut",
      autoAlpha: 0,
    },
    "-=1.4"
  );
  timeline.to(".intro", {
    autoAlpha: 0,
    scale: 3,
    duration: 1,
    ease: "back(4)",
  });
}

function runCounter() {
  const counter = document.querySelector(".counter");
  let currentValue = 0;
  function startCounter() {
    currentValue += Math.floor(Math.random() * 10 + 1);
    if (currentValue > 100) currentValue = 100;

    counter.innerHTML = `${currentValue}%`;
    const delay = Math.floor(Math.random() * 100) + 100;
    setTimeout(startCounter, delay);
  }
  startCounter();
}

if (window.innerWidth < 800) {
  changeActive1();
  changeActive2();
}
document.addEventListener("DOMContentLoaded", function () {
  hoverEffect();
  changeHoverOn();
  runCounter();
  intro();
});
