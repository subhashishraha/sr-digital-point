(function () {
  "use strict";

  /* ============ CONFIG ============
     1. Create a free key at https://web3forms.com (enter the email that should receive enquiries)
     2. Paste it below. The key is safe to expose publicly. */
  var WEB3FORMS_KEY = "6cf1577f-df46-42b5-b612-36af7d30a0ca";
  var WA = "919635361534";

  // [icon, colour class, title, description]
  var services = [
    ["bi-file-earmark-text-fill", "c-blue", "Online Form Fill-up", "Government ও private বিভিন্ন online form fill-up করা হয়।"],
    ["bi-fingerprint", "c-orange", "Aadhaar Services", "Aadhaar card-এর address/document update ও অন্যান্য online assistance।"],
    ["bi-person-badge-fill", "c-navy", "Voter Card Services", "Voter card সম্পর্কিত online service ও assistance।"],
    ["bi-file-earmark-ruled-fill", "c-purple", "Ration Card Services", "Ration card সম্পর্কিত বিভিন্ন online service।"],
    ["bi-mortarboard-fill", "c-navy", "Scholarship Form", "বিভিন্ন scholarship-এর online form fill-up ও application assistance।"],
    ["bi-house-door-fill", "c-green", "Land & Property Services", "ROR, Plot & other land-related online services।"],
    ["bi-printer-fill", "c-blue", "Printing & Xerox", "B/W ও colour printing এবং Xerox service।"],
    ["bi-person-square", "c-navy", "Photo Service", "Passport photo ও প্রয়োজনীয় photo-related service।"],
    ["bi-train-front-fill", "c-blue", "Train Ticket Booking", "Train ticket booking-এর online assistance।"],
    ["bi-airplane-fill", "c-sky", "Flight Ticket Booking", "Flight ticket booking-এর online assistance।"],
    ["bi-easel2-fill", "c-navy", "Flex / Banner Design", "Business, shop ও promotional use-এর জন্য Flex ও Banner design।"],
    ["bi-postcard-fill", "c-blue", "Business Card Design", "Professional business card / visiting card design।"],
    ["bi-vector-pen", "c-purple", "Logo Design", "Business ও brand-এর জন্য professional logo design।"],
    ["bi-display", "c-navy", "Website Design", "Business ও personal use-এর জন্য modern website design।"],
    ["bi-grid-fill", "c-blue", "Other Online Services", "প্রয়োজন অনুযায়ী অন্যান্য online ও digital service।"],
  ];
  // [icon, colour class, title, description, service it maps to]
  var quick = [
    ["bi-file-earmark-text-fill", "c-blue", "Form Fill-up", "Government ও private বিভিন্ন online form fill-up করা হয়।", "Online Form Fill-up"],
    ["bi-printer-fill", "c-navy", "Print Services", "B/W ও colour printing-এর সুবিধা পাওয়া যায়।", "Printing & Xerox"],
    ["bi-fingerprint", "c-orange", "Aadhaar Services", "Aadhaar card-এর বিভিন্ন update ও document-related online service।", "Aadhaar Services"],
    ["bi-person-badge-fill", "c-navy", "Voter Services", "Voter card সম্পর্কিত বিভিন্ন online service ও assistance।", "Voter Card Services"],
  ];

  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  };
  function card(icon, color, title, desc, service) {
    return (
      '<a class="svc" href="#enquiry" data-service="' + esc(service) + '">' +
      '<span class="ico ' + color + '"><i class="bi ' + icon + '" aria-hidden="true"></i></span>' +
      '<div><h3>' + esc(title) + '</h3><p class="bn" lang="bn">' + esc(desc) + "</p></div>" +
      '<i class="bi bi-chevron-right arr" aria-hidden="true"></i></a>'
    );
  }

  document.getElementById("quickGrid").innerHTML = quick
    .map(function (q) { return card(q[0], q[1], q[2], q[3], q[4]); })
    .join("");
  document.getElementById("serviceGrid").innerHTML = services
    .map(function (s, i) { return card(s[0], s[1], i + 1 + ". " + s[2], s[3], s[2]); })
    .join("");

  var form = document.getElementById("enquiryForm");
  var sel = document.getElementById("service");
  sel.insertAdjacentHTML("beforeend", services.map(function (s) {
    return '<option value="' + esc(s[2]) + '">' + esc(s[2]) + "</option>";
  }).join(""));

  // Clicking any service card pre-selects it in the enquiry form
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".svc[data-service]");
    if (!a) return;
    sel.value = a.dataset.service;
    if (sel.classList.contains("is-invalid")) check("service");
  });

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.querySelector(".nav-toggle");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("open") && !e.target.closest(".site-header")) setMenu(false);
  });
  window.matchMedia("(min-width: 992px)").addEventListener("change", function () { setMenu(false); });

  /* ---------- Active nav link on scroll ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var sections = links.map(function (l) { return document.querySelector(l.getAttribute("href")); });
  function spy() {
    var y = window.scrollY + window.innerHeight * 0.35, idx = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) idx = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) idx = sections.length - 1;
    links.forEach(function (l, i) {
      l.classList.toggle("active", i === idx);
      if (i === idx) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { spy(); ticking = false; }); }
  }, { passive: true });
  spy();


  /* ---------- Date: today or later (local time) ---------- */
  var d = new Date(), pad = function (n) { return String(n).padStart(2, "0"); };
  form.date.min = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());

  /* ---------- Validation ---------- */
  var status = document.getElementById("formStatus");
  function normMobile(v) {
    return v.replace(/[\s\-()]/g, "").replace(/^(\+91|0091|91|0)(?=\d{10}$)/, "");
  }
  var rules = {
    name: function (f) {
      var v = f.name.value.trim();
      return !v ? "অনুগ্রহ করে আপনার নাম লিখুন।" : v.length < 2 ? "নাম কমপক্ষে ২ অক্ষরের হতে হবে।" : "";
    },
    mobile: function (f) {
      var v = f.mobile.value.trim();
      if (!v) return "অনুগ্রহ করে মোবাইল নম্বর লিখুন।";
      return /^[6-9]\d{9}$/.test(normMobile(v)) ? "" : "সঠিক ১০ সংখ্যার ভারতীয় মোবাইল নম্বর লিখুন (৬, ৭, ৮ বা ৯ দিয়ে শুরু)।";
    },
    email: function (f) {
      var v = f.email.value.trim();
      if (!v) return ""; // optional
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "সঠিক email address লিখুন (যেমন: name@gmail.com)।";
    },
    service: function (f) { return f.service.value ? "" : "একটি service বেছে নিন।"; },
    message: function (f) {
      var v = f.message.value.trim();
      return !v ? "আপনার প্রয়োজনীয়তা লিখুন।" : v.length < 5 ? "আরও একটু বিস্তারিত লিখুন।" : "";
    },
    consent: function (f) { return f.consent.checked ? "" : "এগিয়ে যেতে সম্মতি দিন।"; },
  };
  function check(k) {
    var msg = rules[k](form), el = form[k];
    document.getElementById(k + "-err").textContent = msg;
    el.classList.toggle("is-invalid", !!msg);
    // green border only for filled fields that pass (not the checkbox)
    el.classList.toggle("is-valid", !msg && el.type !== "checkbox" && !!String(el.value).trim());
    if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
    return !msg;
  }
  function clearState() {
    Object.keys(rules).forEach(function (k) {
      form[k].classList.remove("is-invalid", "is-valid");
      form[k].removeAttribute("aria-invalid");
      document.getElementById(k + "-err").textContent = "";
    });
  }
  function validate() {
    var firstBad = null;
    Object.keys(rules).forEach(function (k) { if (!check(k) && !firstBad) firstBad = form[k]; });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  Object.keys(rules).forEach(function (k) {
    form[k].addEventListener("blur", function () { if (form[k].value || k === "consent") check(k); });
    form[k].addEventListener(k === "consent" || k === "service" ? "change" : "input", function () {
      if (form[k].classList.contains("is-invalid") || form[k].classList.contains("is-valid")) check(k);
      if (!status.hidden && status.classList.contains("bad")) status.hidden = true;
    });
  });

  var hideTimer;
  function showStatus(type, title, text) {
    clearTimeout(hideTimer);
    var icon = type === "ok" ? "bi-check-circle-fill" : type === "info" ? "bi-whatsapp" : "bi-exclamation-triangle-fill";
    status.className = "status bn " + type;
    status.innerHTML = '<i class="bi ' + icon + ' status-ico" aria-hidden="true"></i><div><strong>' + title +
      "</strong><span>" + text + "</span></div>" +
      '<button type="button" class="status-close" aria-label="Close message"><i class="bi bi-x-lg" aria-hidden="true"></i></button>';
    status.hidden = false;
    status.scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (type === "ok") hideTimer = setTimeout(function () { status.hidden = true; }, 15000);
  }
  status.addEventListener("click", function (e) {
    if (e.target.closest(".status-close")) status.hidden = true;
  });
  function visitDate() {
    return form.date.value ? form.date.value.split("-").reverse().join("/") : "Not specified";
  }

  /* ---------- WhatsApp enquiry ---------- */
  function waText() {
    return "Hello SR Digital Point! 👋\n" +
      "I'd like to make an enquiry from your website.\n\n" +
      "*New Customer Enquiry*\n" +
      "Name: " + form.name.value.trim() + "\n" +
      "Mobile: " + normMobile(form.mobile.value.trim()) + "\n" +
      (form.email.value.trim() ? "Email: " + form.email.value.trim() + "\n" : "") +
      "Service: " + form.service.value + "\n" +
      "Preferred Contact: " + form.contact.value + "\n" +
      "Preferred Visit Date: " + visitDate() + "\n" +
      "Requirement: " + form.message.value.trim();
  }
  document.getElementById("waBtn").addEventListener("click", function () {
    if (!validate()) return;
    var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(waText());
    // Open synchronously (inside the click) so popup blockers allow it.
    // Note: window.open(..., "noopener") always returns null, so we can't use its return value as a fallback check.
    var w = window.open(url, "_blank");
    if (w) { try { w.opener = null; } catch (err) { } } else { window.location.href = url; }
    showStatus("info", "WhatsApp খোলা হয়েছে", "Message টি তৈরি আছে — পাঠাতে WhatsApp-এ <b>Send</b> চাপুন।");
  });

  /* ---------- Email enquiry via Web3Forms (AJAX) ---------- */
  var submitBtn = document.getElementById("submitBtn");
  var sending = false;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sending) return;
    status.hidden = true;
    if (!validate()) {
      showStatus("bad", "Form-টি সম্পূর্ণ করুন", "লাল চিহ্নিত ঘরগুলো ঠিক করে আবার Submit করুন।");
      form.querySelector(".is-invalid").focus();
      return;
    }
    if (form.botcheck.checked) return; // spam bot
    if (!navigator.onLine) {
      showStatus("bad", "Internet সংযোগ নেই", "Internet চালু করে আবার চেষ্টা করুন, অথবা <b>WhatsApp Enquiry</b> ব্যবহার করুন।");
      return;
    }

    // Same request format as the working reference form (multipart FormData)
    var fd = new FormData();
    var email = form.email.value.trim();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", "New Enquiry: " + form.service.value + " — " + form.name.value.trim());
    fd.append("from_name", "SR Digital Point Website");
    fd.append("name", form.name.value.trim());
    if (email) { fd.append("email", email); fd.append("replyto", email); }
    fd.append("Mobile", normMobile(form.mobile.value.trim()));
    fd.append("Service", form.service.value);
    fd.append("Preferred Contact", form.contact.value);
    fd.append("Preferred Visit Date", visitDate());
    fd.append("message", form.message.value.trim());
    fd.append("Consent", "Yes");
    fd.append("botcheck", "");

    sending = true;
    submitBtn.disabled = true;
    var label = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Sending…';
    form.setAttribute("aria-busy", "true");

    var ctrl = "AbortController" in window ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: fd,
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (data) {
          if (!r.ok || !data.success) throw new Error(data.message || "HTTP " + r.status);
          return data;
        });
      })
      .then(function () {
        var who = form.name.value.trim().split(" ")[0];
        var via = form.contact.value === "Call" ? "Call" : "WhatsApp";
        form.reset();
        clearState();
        form.contact.value = "WhatsApp";
        showStatus("ok", "ধন্যবাদ " + esc(who) + "! আপনার enquiry পাঠানো হয়েছে।",
          "আমরা খুব শীঘ্রই আপনার সাথে " + via + "-এ যোগাযোগ করব।");
        status.focus({ preventScroll: true });
      })
      .catch(function (err) {
        console.error("Enquiry failed:", err);
        var timeout = err && err.name === "AbortError";
        showStatus("bad", timeout ? "সময় শেষ হয়ে গেছে" : "দুঃখিত, enquiry পাঠানো যায়নি",
          (timeout ? "Server সাড়া দিচ্ছে না। " : "") +
          "একটু পরে আবার চেষ্টা করুন, অথবা <b>WhatsApp Enquiry</b> ব্যবহার করুন।");
      })
      .finally(function () {
        clearTimeout(timer);
        sending = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = label;
        form.removeAttribute("aria-busy");
      });
  });

  /* ---------- PWA install button (service worker is registered in common.js) ---------- */
  var installLi = document.querySelector(".install-li");
  var deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); // show our own button instead of the mini-infobar
    deferredPrompt = e;
    installLi.hidden = false;
  });
  installLi.querySelector("button").addEventListener("click", function () {
    if (!deferredPrompt) return;
    setMenu(false);
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () {
      deferredPrompt = null;
      installLi.hidden = true;
    });
  });
  window.addEventListener("appinstalled", function () {
    installLi.hidden = true;
  });
})();
