gsap.registerPlugin(SplitText);
function runIntro() {
  gsap.from(" .archive-img-container img", {
    opacity: 0,
    ease: "power2.inOut",
    duration: 2,
    stagger: {
      amount: 1,
      from: "random",
    },
  });
}

function archive() {
  const archiveImages = document.querySelectorAll(
    ".archive-img-container div img"
  );
  const archiveContent = document.querySelector(".hover-content");
  archiveImages.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      const data = img.getAttribute("data-content");
      archiveContent.textContent = data;
      document.fonts.ready.then(() => {
        SplitText.create(archiveContent, {
          type: "chars",
          mask: "chars",
          smartWrap: true,
          onSplit: (self) => {
            return gsap.from(self.chars, {
              yPercent: 100,
              ease: "back(2)",
              duration: 0.7,
              stagger: {
                each: 0.05,
                from: "random",
              },
            });
          },
        });
      });
      img.addEventListener("mouseleave", () => {
        archiveContent.textContent = "";
      });
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  archive();
  runIntro();
});
