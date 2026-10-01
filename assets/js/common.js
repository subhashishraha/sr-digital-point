/* Shared by every page: offline support, footer year, back-to-top button */
(function () {
  "use strict";

  /* ---------- PWA: register the service worker ---------- */
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function (err) {
        console.warn("Service worker registration failed:", err);
      });
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Privacy page contents: expanded on desktop, collapsed on phones */
  var toc = document.querySelector(".legal-toc details");
  if (toc) {
    var mq = window.matchMedia("(min-width: 992px)");
    var syncToc = function () { toc.open = mq.matches; };
    syncToc();
    mq.addEventListener("change", syncToc);
    toc.addEventListener("click", function (e) { if (e.target.tagName === "A" && !mq.matches) toc.open = false; });
  }

  /* ---------- Back to top (with scroll-progress ring) ---------- */
  var btn = document.querySelector(".to-top");
  if (!btn) return;
  var ring = btn.querySelector(".to-top-ring");
  var len = ring ? ring.getTotalLength() : 0;
  if (ring) ring.style.strokeDasharray = ring.style.strokeDashoffset = len;

  var copy = document.querySelector(".f-copy");
  var baseGap = 0;
  function measure() {
    // distance from the viewport bottom to the button's bottom edge, without any lift
    baseGap = parseFloat(getComputedStyle(btn).bottom) || 0;
  }

  var ticking = false;
  function update() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.scrollY;
    btn.classList.toggle("show", y > Math.min(600, max * 0.5));
    // lift the button above the footer copyright line so they never overlap
    var lift = 0;
    if (copy) {
      var top = copy.getBoundingClientRect().top;
      var btnBottom = window.innerHeight - baseGap;
      if (top < btnBottom) lift = Math.min(btnBottom - top + 12, 220);
    }
    btn.style.setProperty("--lift", lift + "px");
    if (ring && max > 0) ring.style.strokeDashoffset = len * (1 - Math.min(y / max, 1));
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", function () { measure(); update(); });
  measure();
  update();

  btn.addEventListener("click", function (e) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // keyboard users (Enter/Space give detail 0): move focus to the top of the page too
    if (e.detail === 0) {
      var brand = document.querySelector(".brand");
      if (brand) brand.focus({ preventScroll: true });
    }
  });
})();
