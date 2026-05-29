/* ========================================
   GLOBAL UI CONTROLLER (overlay + scroll lock)
======================================== */

/* ========================================
   GLOBAL UI CONTROLLER (Overlay + Scroll Lock)
======================================== */

const overlay = document.getElementById("overlay");
const body = document.body;

let scrollPosition = 0;

/* =========================
   LIGHTBOX SCROLL LOCK
========================= */

function lockScroll(){

  scrollPosition = window.scrollY;

  body.style.top = `-${scrollPosition}px`;
  body.classList.add("no-scroll");

}

function unlockScroll(){

  body.classList.remove("no-scroll");

  body.style.top = "";

  /* temporarily disable smooth scroll */
  document.documentElement.style.scrollBehavior = "auto";

  window.scrollTo(0, scrollPosition);

  /* restore smooth scroll */
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, 0);

}

/* =========================
   OVERLAY
========================= */

function showOverlay(){
  overlay.classList.add("show");
}

function hideOverlay(){
  overlay.classList.remove("show");
}


/* =========================
   CATEGORY TOGGLE + OUTSIDE CLOSE
========================= */
function toggleCategory(index){

  const allDropdowns = document.querySelectorAll('.hidden-wines');
  const buttons = document.querySelectorAll('.view-btn');

  allDropdowns.forEach((dropdown, i) => {

    if(i === index){

      const isOpen = dropdown.classList.contains("open");
      dropdown.classList.toggle("open");

      if(!isOpen){
        buttons[i].innerText = "HIDE COLLECTION →";
        openCategoryIndex = index;
      } else {
        buttons[i].innerText = "EXPLORE COLLECTION →";
        openCategoryIndex = null;
      }

    } else {
      dropdown.classList.remove("open");
      buttons[i].innerText = "EXPLORE COLLECTION →";
    }

  });

}

/* CLOSE CATEGORY WHEN CLICKING OUTSIDE */
document.addEventListener("click", function(e){

  const categories = document.querySelectorAll(".category");
  let inside = false;

  categories.forEach(cat => {
    if(cat.contains(e.target)) inside = true;
  });

  if(!inside){
    document.querySelectorAll(".hidden-wines").forEach(el => {
      el.classList.remove("open");
    });

    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.innerText = "EXPLORE COLLECTION →";
    });

    openCategoryIndex = null;
  }

});

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

/* Auto slide every 5 seconds */
setInterval(nextSlide, 5000);

/* Dot click navigation */
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

sections.forEach(section => observer.observe(section));

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function(e) {

    const href = this.getAttribute("href");

    /* Ignore empty or invalid hashes */
    if(href === "#" || href.length <= 1) return;

    const target = document.querySelector(href);

    if(target){

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      /* ONLY close menu if menu is open */
      if(menu.classList.contains("open")){
        closeMenu();
      }

    }

  });

});




/* =========================
   MOBILE MENU
========================= */


window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if(header){
    header.classList.toggle("scrolled", window.scrollY > 50);
  }
});

const scrollBtn = document.querySelector(".scroll-top-btn");

if(scrollBtn){
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// accordion (only one open at a time)
const faqCards = document.querySelectorAll(".faq-card");

faqCards.forEach(card => {
  const btn = card.querySelector(".faq-question");

  btn.addEventListener("click", () => {
    faqCards.forEach(c => {
      if(c !== card) c.classList.remove("active");
    });
    card.classList.toggle("active");
  });
});

function closeAllFaqs(){
  faqCards.forEach(card => card.classList.remove("active"));
}

/* CLOSE FAQ WHEN CLICKING OUTSIDE */
document.addEventListener("click", function(e){

  const isFaqClick = e.target.closest(".faq-card");

  if(!isFaqClick){
    closeAllFaqs();
  }

});


// show more questions
const toggleBtn = document.getElementById("faqToggleBtn");
const hiddenCards = document.querySelectorAll(".faq-card.hidden");

let open = false;

toggleBtn.addEventListener("click", () => {
  open = !open;
  hiddenCards.forEach(card => card.classList.toggle("show"));
  toggleBtn.textContent = open ? "Show Fewer Questions" : "Show More Questions";
});


/* =========================
   MOBILE MENU
========================= */


const menu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");

function openMenu(){

  menu.classList.add("open");

  overlay.classList.add("show");

  body.style.overflow = "hidden";

}

function closeMenu(){

  menu.classList.remove("open");

  overlay.classList.remove("show");

  body.style.overflow = "";

}

if(hamburger){
  hamburger.addEventListener("click", openMenu);
}

/* =========================
   WINE DATA
========================= */
/* =========================
   WINE DATA
========================= */
const wines = [
  {
    id: 1,
    name: "Sweet Red",
    image: "image/drink8.png",
    badge: "BESTSELLER",
    tagline: "Juicy berry richness",
    details: "Smooth red with cherry and soft spice notes.",
    abv: "11–12%",
    sizes: ["75cl"],
    sweetness: "Sweet",
    origin: "Spain (Imported)",
    serving: "14–16°C",
    pairing: "Chicken, pizza, desserts",
    occasion: "Celebrations, dinners",
    cooking: "Rich sauces, stews",
    price: "₦8,500 – ₦10,999"
  },
  {
    id: 2,
    name: "Sweet White",
    image: "image/drink4.png",
    badge: "",
    tagline: "Soft tropical freshness",
    details: "Light white wine with peach and citrus notes.",
    abv: "11%",
    sizes: ["75cl"],
    sweetness: "Sweet",
    origin: "Spain (Imported)",
    serving: "8–10°C",
    pairing: "Seafood, salads, pasta",
    occasion: "Brunch, light meals",
    cooking: "Cream sauces",
    price: "₦8,600 – ₦9,500"
  },
  {
    id: 3,
    name: "Moscato",
    image: "image/drink3.png",
    badge: "",
    tagline: "Light floral sparkle",
    details: "Sweet, floral Moscato with soft tropical finish.",
    abv: "7.5–9%",
    sizes: ["75cl"],
    sweetness: "Sweet",
    origin: "Italy (Style)",
    serving: "6–8°C",
    pairing: "Desserts, fruit, cakes",
    occasion: "Celebrations",
    cooking: "Not commonly used",
    price: "₦8,000 – ₦9,000"
  },
  {
    id: 4,
    name: "Cabernet",
    image: "image/drink7.png",
    badge: "PREMIUM",
    tagline: "Bold dark fruit depth",
    details: "Full-bodied red with blackcurrant and oak spice.",
    abv: "12–13%",
    sizes: ["75cl"],
    sweetness: "Medium Sweet",
    origin: "Spain (Imported)",
    serving: "16–18°C",
    pairing: "Steak, grilled meats, suya",
    occasion: "Premium dinners",
    cooking: "Excellent for reductions",
    price: "₦9,000 – ₦12,000"
  },
  // Add the rest similarly (Sparkling & Non-Alcoholic)
  {
    id: 5,
    name: "Ice Rosé",
    image: "image/drink6.png",
    badge: "",
    tagline: "Fresh pink sparkle",
    details: "Light rosé with berry and floral notes.",
    abv: "11%",
    sizes: ["75cl"],
    sweetness: "Semi-Sweet",
    origin: "Spain (Imported)",
    serving: "5–7°C",
    pairing: "Pastries, snacks, salads",
    occasion: "Celebrations",
    cooking: "",
    price: "₦9,800 – ₦11,500"
  },
  {
    id: 6,
    name: "Ice Brut",
    image: "image/drink6.png",
    badge: "PREMIUM",
    tagline: "Crisp elegant finish",
    details: "Dry sparkling with citrus and apple notes.",
    abv: "11%",
    sizes: ["75cl"],
    sweetness: "Dry",
    origin: "Spain (Imported)",
    serving: "5–6°C",
    pairing: "Seafood, oysters, sushi",
    occasion: "Formal events",
    cooking: "Gourmet reductions",
    price: "₦9,800 – ₦11,500"
  },
  {
    id: 7,
    name: "Sparkling Apple",
    image: "image/drink5.png",
    badge: "",
    tagline: "Crisp apple sparkle",
    details: "Refreshing non-alcoholic apple fizz.",
    abv: "0%",
    sizes: ["75cl"],
    sweetness: "Sweet",
    origin: "Fruit Blend",
    serving: "Chilled",
    pairing: "All occasions",
    occasion: "Family events",
    cooking: "",
    price: "₦6,500 – ₦7,500"
  }
];


/* =========================
   LIGHTBOX
========================= */

function openWine(i){

  const wine = wines[i - 1];

  const lightbox = document.getElementById("lightbox");

  lightbox.classList.add("open");

  showOverlay();

  lockScroll();

  document.getElementById("wineImage").src = wine.image;
  document.getElementById("wineTitle").innerText = wine.name;
  document.getElementById("wineBadge").innerText = wine.badge || "";

  document.getElementById("wineDesc").innerHTML =
    `<p>${wine.tagline}</p><p>${wine.details}</p>`;

  document.getElementById("wineInfo").innerHTML = `
    <div class="spec-grid">
      <div><b>ABV:</b> ${wine.abv}</div>
      <div><b>Sizes:</b> ${wine.sizes.join(", ")}</div>
      <div><b>Sweetness:</b> ${wine.sweetness}</div>
      <div><b>Origin:</b> ${wine.origin}</div>
      <div><b>Serving:</b> ${wine.serving}</div>
      <div><b>Pairing:</b> ${wine.pairing}</div>
      <div><b>Occasion:</b> ${wine.occasion}</div>
      <div><b>Cooking:</b> ${wine.cooking}</div>
      <div><b>Price:</b> ${wine.price}</div>
    </div>
  `;

}

function closeBox(){

  document.getElementById("lightbox").classList.remove("open");

  hideOverlay();

  unlockScroll();

}

/* =========================
   GLOBAL OVERLAY CLICK
========================= */

/* CLOSE EVERYTHING WHEN CLICKING OVERLAY */
overlay.addEventListener("click", () => {
  closeMenu();
  closeBox();
  closeAllFaqs();
});

document.addEventListener("keydown", e=>{
  if(e.key === "Escape"){
    closeMenu();
    closeBox();
    closeAllFaqs();
  }
});

const ageGate = document.getElementById("ageGate");
const enterSite = document.getElementById("enterSite");

if(localStorage.getItem("declan-age-confirmed")){
  ageGate.classList.add("hide");
}

enterSite.addEventListener("click", () => {
  localStorage.setItem("declan-age-confirmed", "true");
  ageGate.classList.add("hide");
});

const cookieBanner = document.getElementById("cookieBanner");
const acceptBtn = document.getElementById("acceptCookies");
const declineBtn = document.getElementById("declineCookies");

let cookieShown = false;
let scrollTriggered = false;

/* =========================
   SHOW COOKIE BANNER
========================= */
function showCookieBanner() {

  if (cookieShown) return;
  if (localStorage.getItem("declanCookieConsent")) return;

  cookieShown = true;

  setTimeout(() => {
    cookieBanner.classList.add("show");
  }, 2000); // small animation delay for smooth UX
}

/* =========================
   SCROLL TRIGGER (FIRST SCROLL ONLY)
========================= */
window.addEventListener("scroll", () => {

  if (scrollTriggered) return;

  scrollTriggered = true;

  // wait 20 seconds AFTER first scroll
  setTimeout(() => {
    showCookieBanner();
  }, 20000);

});

/* =========================
   ACCEPT COOKIES
========================= */
if (acceptBtn) {
  acceptBtn.addEventListener("click", () => {

    localStorage.setItem("declanCookieConsent", "accepted");

    cookieBanner.classList.remove("show");

  });
}

/* =========================
   DECLINE COOKIES
========================= */
if (declineBtn) {
  declineBtn.addEventListener("click", () => {

    localStorage.setItem("declanCookieConsent", "declined");

    cookieBanner.classList.remove("show");

  });
}

/* =========================
   OPTIONAL: SHOW ON LOAD IF NO CONSENT (fallback safety)
========================= */
window.addEventListener("load", () => {

  const saved = localStorage.getItem("declanCookieConsent");

  if (!saved) {
    // fallback: ensures it still appears even if user doesn't scroll
    setTimeout(() => {
      showCookieBanner();
    }, 5000);
  }

});
