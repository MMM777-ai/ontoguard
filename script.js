(function () {
  "use strict";
  function track(name, props) {
    if (typeof window.plausible === "function") {
      try { window.plausible(name, { props: props || {} }); } catch (e) {}
    }
  }
  window.ontoguardTrackEvent = track;
  window.ontoguardViewportClass = function () {
    var width = window.innerWidth || document.documentElement.clientWidth || 0;
    return width < 700 ? "mobile" : width < 1100 ? "tablet" : "desktop";
  };
  function installNav() {
    var toggle = document.querySelector(".nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!(t instanceof Element)) return;
      document.querySelectorAll(".nav-drop[open]").forEach(function (d) {
        if (!d.contains(t)) d.removeAttribute("open");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".nav-drop[open]").forEach(function (d) { d.removeAttribute("open"); });
        document.body.classList.remove("nav-open");
      }
    });
  }
  function installDemo() {
    var btn = document.getElementById("mutate-amount");
    var panel = document.getElementById("demo-state-b");
    var amount = document.getElementById("demo-amount");
    var decision = document.getElementById("demo-decision");
    var commit = document.getElementById("demo-commit");
    var trace = document.getElementById("demo-trace");
    var release = document.getElementById("demo-release");
    if (!btn || !decision) return;
    var mutated = false;
    btn.addEventListener("click", function () {
      mutated = !mutated;
      if (mutated) {
        if (amount) amount.textContent = "$250,000 \u2192 $260,000";
        decision.textContent = "BLOCK";
        decision.className = "decision-chip chip-block";
        if (commit) commit.textContent = "0";
        if (trace) trace.textContent = "NOT EMITTED";
        if (release) release.textContent = "WITHHELD";
        if (panel) panel.hidden = false;
        btn.textContent = "Reset authorized amount";
        track("homepage_demo_mutate", { state: "block" });
      } else {
        if (amount) amount.textContent = "$250,000";
        decision.textContent = "ALLOW";
        decision.className = "decision-chip chip-allow";
        if (commit) commit.textContent = "1";
        if (trace) trace.textContent = "EMITTED";
        if (release) release.textContent = "AUTHORIZED";
        if (panel) panel.hidden = true;
        btn.textContent = "Change amount";
        track("homepage_demo_mutate", { state: "allow" });
      }
    });
  }
  function installTracking() {
    document.addEventListener("click", function (e) {
      var el = e.target instanceof Element ? e.target.closest("[data-track-event]") : null;
      if (!el) return;
      track(el.getAttribute("data-track-event"), { label: (el.getAttribute("data-track-label") || el.textContent).trim().slice(0, 80) });
    });
    document.querySelectorAll("video").forEach(function (video) {
      var started = false;
      video.addEventListener("play", function () {
        if (started) return;
        started = true;
        track("video_play", { src: video.currentSrc || "" });
      });
      video.addEventListener("ended", function () {
        track("video_complete", { src: video.currentSrc || "" });
      });
    });
    document.querySelectorAll("form").forEach(function (form) {
      form.addEventListener("submit", function () {
        track("contact_conversion", { form: form.getAttribute("id") || "form" });
      });
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    installNav();
    installDemo();
    installTracking();
  });
})();
