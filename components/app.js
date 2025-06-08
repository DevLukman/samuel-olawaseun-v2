// For the functionality that are shared between pages.
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);
function smoothScroll() {
  const lenis = new Lenis({
    lerp: 0.1,
    easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  const backToTop = document.querySelector(".backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      lenis.scrollTo(0, {
        offset: 0,
        duration: 1.5,
        easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
      });
    });
  }
}

//Show the current Time
function currentTime() {
  const timeElement = document.querySelectorAll(".time");
  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return ` (${hours}:${minutes.toString().padStart(2, "0")} ${ampm})`;
  }

  function updateTime() {
    const now = new Date();
    timeElement.forEach((item) => (item.textContent = formatTime(now)));
    // .textContent = formatTime(now);
  }
  updateTime();
  setInterval(updateTime, 1000);
}
function runNavbar() {
  gsap.set(".links", { yPercent: 100 });
  const tl = gsap.timeline({
    paused: true,
  });
  const toggleBtn = document.querySelector(".toggle");
  const overlayMenu = document.querySelector(".menu-overlay");
  let isOpen = false;
  tl.to(overlayMenu, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "power1.inOut",
  });
  tl.to(
    ".links",
    { yPercent: 0, stagger: 0.05, ease: "power4.inOut", duration: 1 },
    "-=1"
  );
  function displayMenu() {
    const links = document.querySelectorAll(".links");
    function hidden(hide) {
      document.body.style.overflow = hide ? "hidden" : "";
    }
    toggleBtn.classList.toggle("active-toggle");
    if (isOpen) {
      tl.reverse();
      hidden(false);
    } else {
      tl.play();
      hidden(true);
    }
    isOpen = !isOpen;
    links.forEach((link) =>
      link.addEventListener("click", () => {
        toggleBtn.classList.toggle("active-toggle");
        if (isOpen) {
          tl.reverse();

          hidden(false);
        } else {
          tl.play();
          hidden(true);
        }
        isOpen = !isOpen;
      })
    );
  }
  toggleBtn.addEventListener("click", displayMenu);
}

function activeLink() {
  //Active link
  let currentPath = window.location.pathname;
  if (currentPath === "/") currentPath = "/index.html";
  const links = document.querySelectorAll(".links");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    // Skip links that start with "#" (for #contact)
    if (href.startsWith("#")) return;
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add("active-links");
    } else {
      link.classList.remove("active-links");
    }
  });
}

//Navbar

//Dark theme
function lightDarkTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = document.querySelectorAll(".dark");
  const light = document.querySelectorAll(".light");
  const currentTheme =
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  if (currentTheme) setTheme(currentTheme);
  function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  }
  if (dark)
    dark.forEach((dark) =>
      dark.addEventListener("click", () => setTheme("dark"))
    );

  if (light)
    light.forEach((dark) =>
      dark.addEventListener("click", () => setTheme("light"))
    );
}

function smoothScrollTo() {
  const scroll = document.getElementById("to-contact");
  scroll.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: "#contact",
      ease: "expo.inOut",
    });
  });
  function main() {
    gsap.to(window, {
      duration: 1,
      scrollTo: "#contact",
      ease: "power2.inOut",
    });
  }
  scroll.addEventListener("click", main);
}

document.addEventListener("DOMContentLoaded", function () {
  ScrollTrigger.create({
    animation: gsap.to(".contact-content-2 i", {
      rotate: 360,
      ease: "power4.inOut",
      duration: 2,
    }),
    trigger: ".contact-content",
    scrub: 1,
  });
  document.fonts.ready.then(() => {
    SplitText.create(".contact-content-1 p", {
      type: "lines",
      autoSplit: true,
      mask: "lines",
      onSplit: (self) => {
        return gsap.from(self.lines, {
          yPercent: 100,
          ease: "expo.inOut",
          stagger: 0.05,
          duration: 1,
          delay: 0.4,
          onComplete: () => self.revert(),
          scrollTrigger: {
            trigger: ".contact-content-1 p",
            start: "clamp(top 60%)",
            end: "clamp(center bottom)",
          },
        });
      },
    });

    //For Footer
    SplitText.create(".footer-content-1 h3", {
      type: "chars",
      mask: "chars",
      smartWrap: true,
      onSplit: (self) => {
        return gsap.from(self.chars, {
          yPercent: 100,
          ease: "power4.inOut",
          duration: 1,
          stagger: 0.05,
          delay: 0.4,
          onComplete: () => self.revert(),
          scrollTrigger: {
            trigger: ".footer-content-1 h3",
            start: "clamp(top 90%)",
            end: "clamp(center bottom)",
          },
        });
      },
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  smoothScroll();
  currentTime();
  activeLink();
  runNavbar();
  lightDarkTheme();
  smoothScrollTo();
});
