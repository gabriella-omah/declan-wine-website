/* ========================================
   GLOBAL UI CONTROLLER
======================================== */

const overlay = document.getElementById("overlay");
const body = document.body;
let scrollPosition = 0;

/* =========================
   SCROLL LOCK
========================= */
function lockScroll() {
  scrollPosition = window.scrollY;
  body.style.position = "fixed";
  body.style.top = `-${scrollPosition}px`;
  body.style.width = "100%";
  body.style.overflow = "hidden";
}

function unlockScroll() {
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  body.style.overflow = "";

  window.scrollTo(0, scrollPosition);
}

/* =========================
   OVERLAY
========================= */
function showOverlay() {
  overlay.classList.add("show");
}

function hideOverlay() {
  overlay.classList.remove("show");
}

/* =========================
   MOBILE MENU
========================= */
const menu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");

function openMenu() {
  // freeze scroll FIRST (before DOM changes)
  scrollPosition = window.scrollY;

  body.style.position = "fixed";
  body.style.top = `-${scrollPosition}px`;
  body.style.width = "100%";
  body.style.overflow = "hidden";

  menu.classList.add("open");
  showOverlay();
}

function closeMenu() {
  menu.classList.remove("open");
  hideOverlay();
  unlockScroll();
}

if (hamburger) {
  hamburger.addEventListener("click", openMenu);
}

/* Close mobile menu when clicking on overlay */
overlay.addEventListener("click", () => {
  closeMenu();
});

/* =========================
   NAVIGATION FROM MOBILE MENU
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    closeMenu();

    setTimeout(() => {
      smoothScrollTo(target);
    }, 200);
  });
});

function smoothScrollTo(target) {
  const headerOffset = 90;

  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });

  revealOnNavigate(target);
}

/* =========================
   WINE DATA
========================= */
const wines = [
  { id: 1, name: "Sweet Red", image: "image/drink8.png", badge: "BESTSELLER", tagline: "Juicy berry richness", details: "Smooth red with cherry and soft spice notes.", abv: "11–12%", sizes: ["75cl"], sweetness: "Sweet", origin: "Spain (Imported)", serving: "14–16°C", pairing: "Chicken, pizza, desserts", occasion: "Celebrations, dinners", price: "₦8,500 – ₦10,999" },
  { id: 2, name: "Sweet White", image: "image/drink4.png", badge: "", tagline: "Soft tropical freshness", details: "Light white wine with peach and citrus notes.", abv: "11%", sizes: ["75cl"], sweetness: "Sweet", origin: "Spain (Imported)", serving: "8–10°C", pairing: "Seafood, salads, pasta", occasion: "Brunch, light meals", price: "₦8,600 – ₦9,500" },
  { id: 3, name: "Moscato", image: "image/drink3.png", badge: "", tagline: "Light floral sparkle", details: "Sweet, floral Moscato with soft tropical finish.", abv: "7.5–9%", sizes: ["75cl"], sweetness: "Sweet", origin: "Italy (Style)", serving: "6–8°C", pairing: "Desserts, fruit, cakes", occasion: "Celebrations", price: "₦8,000 – ₦9,000" },
  { id: 4, name: "Cabernet", image: "image/drink7.png", badge: "PREMIUM", tagline: "Bold dark fruit depth", details: "Full-bodied red with blackcurrant and oak spice.", abv: "12–13%", sizes: ["75cl"], sweetness: "Medium Sweet", origin: "Spain (Imported)", serving: "16–18°C", pairing: "Steak, grilled meats, suya", occasion: "Premium dinners", price: "₦9,000 – ₦12,000" },
  { id: 5, name: "Ice Rosé", image: "image/drink6.png", badge: "", tagline: "Fresh pink sparkle", details: "Light rosé with berry and floral notes.", abv: "11%", sizes: ["75cl"], sweetness: "Semi-Sweet", origin: "Spain (Imported)", serving: "5–7°C", pairing: "Pastries, snacks, salads", occasion: "Celebrations", price: "₦9,800 – ₦11,500" },
  { id: 6, name: "Ice Brut", image: "image/drink6.png", badge: "PREMIUM", tagline: "Crisp elegant finish", details: "Dry sparkling with citrus and apple notes.", abv: "11%", sizes: ["75cl"], sweetness: "Dry", origin: "Spain (Imported)", serving: "5–6°C", pairing: "Seafood, oysters, sushi", occasion: "Formal events", price: "₦9,800 – ₦11,500" },
  { id: 7, name: "Sparkling Apple", image: "image/drink5.png", badge: "", tagline: "Crisp apple sparkle", details: "Refreshing non-alcoholic apple fizz.", abv: "0%", sizes: ["75cl"], sweetness: "Sweet", origin: "Fruit Blend", serving: "Chilled", pairing: "All occasions", occasion: "Family events", price: "₦6,500 – ₦7,500" },
  { id: 8, name: "Sparkling Grape", image: "image/drink2.png", badge: "", tagline: "Rich grape sparkle", details: "Fruity non-alcoholic sparkling grape drink.", abv: "0%", sizes: ["75cl"], sweetness: "Sweet", origin: "Fruit Blend", serving: "Chilled", pairing: "Parties and family gatherings", occasion: "All occasions", price: "₦6,500 – ₦7,500" },
  { id: 9, name: "Fruit Blend", image: "image/drink1.png", badge: "", tagline: "Balanced fruit sparkle", details: "Refreshing mix of grape and apple with light bubbles.", abv: "0%", sizes: ["75cl"], sweetness: "Sweet", origin: "Fruit Blend", serving: "Chilled", pairing: "Brunch and kids parties", occasion: "Everyday drinks", price: "₦6,500 – ₦7,500" }
];

/* =========================
   LIGHTBOX
========================= */
function openWine(i) {
  const wine = wines[i - 1];
  if (!wine) return;

  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("open");

  showOverlay();
  lockScroll();

  document.getElementById("wineImage").src = wine.image;
  document.getElementById("wineTitle").innerText = wine.name;
  document.getElementById("wineBadge").innerText = wine.badge || "";

  document.getElementById("wineDesc").innerHTML = `
    <p><strong>${wine.tagline}</strong></p>
    <p>${wine.details}</p>
  `;

  document.getElementById("wineInfo").innerHTML = `
    <div class="spec-grid">
      <div><b>ABV:</b> ${wine.abv}</div>
      <div><b>Sizes:</b> ${wine.sizes ? wine.sizes.join(", ") : "75cl"}</div>
      <div><b>Sweetness:</b> ${wine.sweetness}</div>
      <div><b>Origin:</b> ${wine.origin}</div>
      <div><b>Serving:</b> ${wine.serving}</div>
      <div><b>Pairing:</b> ${wine.pairing}</div>
      <div><b>Occasion:</b> ${wine.occasion}</div>
      <div><b>Price:</b> ${wine.price}</div>
    </div>
  `;

  const whatsappBtn = document.getElementById("whatsappBtn");
  whatsappBtn.href = `https://wa.me/2348065819721?text=${encodeURIComponent("Hi, I want to buy " + wine.name + ". Please send details.")}`;
}

function closeBox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("open");
  hideOverlay();
  unlockScroll();
}

/* Close lightbox by clicking outside */
const lightboxElement = document.getElementById("lightbox");
lightboxElement.addEventListener("click", function(e) {
  if (e.target === lightboxElement) closeBox();
});

/* =========================
   CATEGORY TOGGLE
========================= */
function toggleCategory(index) {
  const allDropdowns = document.querySelectorAll('.hidden-wines');
  const buttons = document.querySelectorAll('.view-btn');

  allDropdowns.forEach((dropdown, i) => {
    if (i === index) {
      const isOpen = dropdown.classList.contains("open");
      dropdown.classList.toggle("open");
      buttons[i].innerText = isOpen ? "EXPLORE COLLECTION →" : "HIDE COLLECTION →";
    } else {
      dropdown.classList.remove("open");
      buttons[i].innerText = "EXPLORE COLLECTION →";
    }
  });
}

/* Click outside to close all hidden wines */
document.addEventListener("click", function(e) {
  const isInsideCategory = e.target.closest(".category");

  if (!isInsideCategory) {
    document.querySelectorAll(".hidden-wines").forEach(dropdown => {
      dropdown.classList.remove("open");
    });

    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.innerText = "EXPLORE COLLECTION →";
    });
  }
});

/* =========================
   TESTIMONIALS SLIDER
========================= */
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

/* =========================
   OTHER FEATURES
========================= */
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 50);
});

const scrollBtn = document.querySelector(".scroll-top-btn");
if (scrollBtn) scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// FAQ
const faqCards = document.querySelectorAll(".faq-card");
const toggleBtn = document.getElementById("faqToggleBtn");
const hiddenCards = document.querySelectorAll(".faq-card.hidden");
let faqExpanded = false;

faqCards.forEach(card => {
  const question = card.querySelector(".faq-question");
  question.addEventListener("click", () => {
    faqCards.forEach(c => { if (c !== card) c.classList.remove("active"); });
    card.classList.toggle("active");
  });
});

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    faqExpanded = !faqExpanded;
    hiddenCards.forEach(card => card.classList.toggle("show", faqExpanded));
    toggleBtn.textContent = faqExpanded ? "Show Fewer Questions" : "Show More Questions";
  });
}

function closeAllFaqs() {
  faqCards.forEach(card => card.classList.remove("active"));
}

/* Click outside FAQ to close all open items */
document.addEventListener("click", function(e) {
  if (!e.target.closest(".faq-card") && !e.target.closest("#faqToggleBtn")) {
    closeAllFaqs();
  }
});

// Age Gate & Cookie Banner
// Age Gate & Cookie Banner
const ageGate = document.getElementById("ageGate");
const enterSite = document.getElementById("enterSite");

let ageGateScrollPosition = 0;

function lockAgeGate() {
  ageGateScrollPosition = window.scrollY;
  body.style.position = "fixed";
  body.style.top = `-${ageGateScrollPosition}px`;
  body.style.width = "100%";
  body.style.overflow = "hidden";
}

function unlockAgeGate() {
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  body.style.overflow = "";
  window.scrollTo(0, ageGateScrollPosition);
}

if (ageGate) {
  if (localStorage.getItem("declan-age-confirmed")) {
    ageGate.classList.add("hide");
  } else {
    ageGate.classList.remove("hide");
    lockAgeGate();           // Lock scroll when age gate shows
  }
}

if (enterSite) {
  enterSite.addEventListener("click", () => {
    localStorage.setItem("declan-age-confirmed", "true");
    ageGate.classList.add("hide");
    unlockAgeGate();         // Unlock when user enters
  });
}

const cookieBanner = document.getElementById("cookieBanner");
if (cookieBanner && !localStorage.getItem("declanCookieConsent")) {
  setTimeout(() => cookieBanner.classList.add("show"), 3000);
}

document.getElementById("acceptCookies")?.addEventListener("click", () => {
  localStorage.setItem("declanCookieConsent", "accepted");
  cookieBanner.classList.remove("show");
});
