(function () {
  "use strict";

  /* ============ CONFIG ============
     1. Create a free key at https://web3forms.com (enter the email that should receive enquiries)
     2. Paste it below. The key is safe to expose publicly. */
  var WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";
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

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Date: today or later (local time) ---------- */
  var d = new Date(), pad = function (n) { return String(n).padStart(2, "0"); };
  form.date.min = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());

  /* ---------- Validation ---------- */
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
    if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
    return !msg;
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
      if (form[k].classList.contains("is-invalid")) check(k);
    });
  });

  var status = document.getElementById("formStatus");
  function showStatus(type, html) {
    status.className = "status bn " + type;
    status.innerHTML = html;
    status.hidden = false;
    status.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
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
    showStatus("ok", "<strong>ধন্যবাদ!</strong> WhatsApp খোলা হয়েছে — message টি পাঠাতে <b>Send</b> চাপুন।");
  });

  /* ---------- Email enquiry via Web3Forms ---------- */
  var submitBtn = document.getElementById("submitBtn");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    if (form.botcheck.checked) return; // spam bot

    if (!WEB3FORMS_KEY || WEB3FORMS_KEY.indexOf("YOUR_") === 0) {
      console.warn("Web3Forms access key not set in assets/js/script.js");
      showStatus("bad", "দুঃখিত, email enquiry এখনো চালু হয়নি। অনুগ্রহ করে <b>WhatsApp Enquiry</b> ব্যবহার করুন বা call করুন।");
      return;
    }

    var data = {
      access_key: WEB3FORMS_KEY,
      subject: form.subject.value + " — " + form.service.value,
      from_name: form.from_name.value,
      Name: form.name.value.trim(),
      Mobile: normMobile(form.mobile.value.trim()),
      Service: form.service.value,
      "Preferred Contact": form.contact.value,
      "Preferred Visit Date": visitDate(),
      Message: form.message.value.trim(),
      Consent: "Yes",
      botcheck: "",
    };

    submitBtn.disabled = true;
    var label = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (r) { return r.json().catch(function () { return { success: false }; }); })
      .then(function (res) {
        if (!res.success) throw new Error(res.message || "Submit failed");
        showStatus("ok", "<strong>ধন্যবাদ!</strong> আপনার enquiry পাঠানো হয়েছে। আমরা শীঘ্রই " +
          (form.contact.value === "Call" ? "call" : "WhatsApp") + "-এ যোগাযোগ করব।");
        form.reset();
        form.contact.value = "WhatsApp";
      })
      .catch(function (err) {
        console.error(err);
        showStatus("bad", "দুঃখিত, enquiry পাঠানো যায়নি। Internet connection দেখে আবার চেষ্টা করুন অথবা <b>WhatsApp Enquiry</b> ব্যবহার করুন।");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = label;
      });
  });

  /* ---------- PWA: offline support + install button ---------- */
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function (err) {
        console.warn("Service worker registration failed:", err);
      });
    });
  }

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
