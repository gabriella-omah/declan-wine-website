/* ========================================
   GLOBAL UI CONTROLLER (overlay + scroll lock)
======================================== */

/* ========================================
   GLOBAL UI CONTROLLER (Overlay + Scroll Lock)
======================================== */

const overlay = document.getElementById("overlay");
const body = document.body;

function showOverlay(){
  overlay.classList.add("show");
  body.classList.add("no-scroll");
}

function hideOverlay(){
  overlay.classList.remove("show");
  body.classList.remove("no-scroll");
}


let openCategoryIndex = null;

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

sections.forEach(section => observer.observe(section));document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

const links = document.querySelectorAll("a[href^='#']");


links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").replace("#", "");

    // fade out current
    const current = document.querySelector(".section.active");
    if (current) current.classList.remove("active");

    // fade in new
    const next = document.getElementById(targetId);
    if (next) {
      setTimeout(() => {
        next.classList.add("active");
      }, 250); // gives fade-out feel first
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

/* =========================
   MOBILE MENU (FINAL)
========================= */

const menu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");

function openMenu(){
  menu.classList.add("open");
  showOverlay();
}

function closeMenu(){
  menu.classList.remove("open");
  hideOverlay();
}

if(hamburger){
  hamburger.addEventListener("click", openMenu);
}

/* =========================
   WINE DATA
========================= */
const wines = [
{
name: "Declan Sweet Red",
image: "image/drink.png",
tagline: "Juicy sweet red bursting with berry & cherry flavours.",
details: "Smooth and vibrant red wine crafted for joyful moments with lush cherry, strawberry and soft spice notes.",
abv: "11–12%",
sizes: ["75cl", "37.5cl", "25cl"],
sweetness: "Sweet",
origin: "Spain (Tempranillo blend)",
pairing: "Grilled chicken, pizza, shawarma, desserts",
serving: "14–16°C (slightly chilled)",
occasion: "Celebrations, dinners",
cooking: "Rich sauces, stews",
price: "₦7,500 – ₦10,999",
badge: "BESTSELLER"
},
{
name: "Declan Sweet White",
image: "image/drink.png",
tagline: "Silky white wine with peach & tropical fruit notes.",
details: "Refreshing white wine with peach, pineapple and citrus blossom.",
abv: "11%",
sizes: ["75cl", "37.5cl"],
sweetness: "Sweet",
origin: "Spain",
pairing: "Seafood, pasta, salads",
serving: "8–10°C (chilled)",
occasion: "Brunch, light meals",
cooking: "Cream sauces",
price: "₦8,600 – ₦9,500",
badge: ""
},
{
name: "Declan Moscato",
image: "image/drink.png",
tagline: "Light, refreshing and beautifully fruity Moscato.",
details: "Floral, sweet and tropical with soft aromatic finish.",
abv: "7.5–11%",
sizes: ["75cl"],
sweetness: "Sweet",
origin: "Italy style",
pairing: "Desserts, fruit, cupcakes",
serving: "6–8°C (very cold)",
occasion: "Celebrations",
cooking: "Not commonly used",
price: "₦8,000 – ₦9,000",
badge: ""
},
{
name: "Cabernet Sauvignon",
image: "image/drink.png",
tagline: "Bold red wine with dark berry richness.",
details: "Full-bodied wine with blackcurrant, plum and oak spice.",
abv: "12–13%",
sizes: ["75cl"],
sweetness: "Dry",
origin: "France/European style",
pairing: "Steak, grilled meats",
serving: "16–18°C",
occasion: "Premium dinners",
cooking: "Excellent for reductions",
price: "₦9,000 – ₦12,000",
badge: "PREMIUM"
},
{
name: "Ice Rosé",
image: "image/drink.png",
tagline: "Sweet sparkling rosé made for celebration.",
details: "Pink bubbly with strawberry, raspberry and floral notes.",
abv: "11–12%",
sizes: ["75cl"],
sweetness: "Semi-sweet",
origin: "Sparkling blend",
pairing: "Seafood, brunch, desserts",
serving: "5–7°C (ice cold)",
occasion: "Parties, weddings",
cooking: "Not used in cooking",
price: "₦10,655 – ₦13,623",
badge: "PREMIUM"
},
{
name: "Rosé Sparkling",
image: "image/drink.png",
tagline: "Fresh celebratory bubbly rosé.",
details: "Light sparkling wine with fruity aroma and lively bubbles.",
abv: "11–12%",
sizes: ["75cl"],
sweetness: "Semi-sweet",
origin: "Spain sparkling",
pairing: "Pastries, finger foods",
serving: "5–7°C",
occasion: "Celebrations",
cooking: "No",
price: "₦10k – ₦13k",
badge: ""
},
{
name: "Ice Brut",
image: "image/drink.png",
tagline: "Crisp elegant sparkling wine.",
details: "Dry sparkling wine with citrus and green apple notes.",
abv: "11–12%",
sizes: ["75cl"],
sweetness: "Dry",
origin: "Brut style",
pairing: "Seafood, oysters",
serving: "5°C",
occasion: "Formal events",
cooking: "Gourmet reductions",
price: "₦10k – ₦13k",
badge: "PREMIUM"
},
{
name: "Sparkling Apple",
image: "image/drink.png",
tagline: "Alcohol-free crisp apple bubbly.",
details: "Refreshing non-alcoholic sparkling apple drink.",
abv: "0%",
sizes: ["75cl", "25cl"],
sweetness: "Sweet",
origin: "Fruit blend",
pairing: "All occasions",
serving: "Chilled",
occasion: "Family events",
cooking: "No",
price: "₦7k – ₦10k",
badge: ""
},
{
name: "Sparkling Red Grape",
image: "image/drink.png",
tagline: "Rich alcohol-free red grape bubbles.",
details: "Fruity grape sparkling juice with wine-like feel.",
abv: "0%",
sizes: ["75cl", "25cl"],
sweetness: "Sweet",
origin: "Fruit blend",
pairing: "Events, parties",
serving: "Chilled",
occasion: "Family gatherings",
cooking: "No",
price: "₦9k – ₦10k",
badge: ""
},
{
name: "Grape & Apple Blend",
image: "image/drink.png",
tagline: "Balanced sparkling fruit blend.",
details: "Mix of apple and grape with refreshing bubbles.",
abv: "0%",
sizes: ["75cl"],
sweetness: "Sweet",
origin: "Fruit blend",
pairing: "Brunch, kids parties",
serving: "Chilled",
occasion: "Everyday drinks",
cooking: "No",
price: "₦7k – ₦10k",
badge: ""
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