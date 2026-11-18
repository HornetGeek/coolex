const english = {
  skip: 'Skip to content',
  announcement: 'Fresh from nature. Carefully frozen.',
  announcement2: 'COOLEX PREMIUM FROZEN PRODUCE',
  navHome: 'Home', navWhy: 'Why COOLEX', navProducts: 'Products', navAbout: 'Our story', navContact: 'Contact',
  talkToUs: 'Get in touch',
  heroEyebrow: 'PREMIUM FROZEN PRODUCE',
  heroTitle1: "Nature's goodness,", heroTitle2: 'frozen at its best.',
  heroDesc: 'From farm-inspired freshness to your kitchen, COOLEX brings you quality frozen fruit and vegetables that make everyday cooking easier and more delicious.',
  exploreProducts: 'Explore our products', contactUs: 'Contact us',
  proof1: 'Flash frozen', proof1Small: 'Quality preserved', proof2: 'No preservatives', proof2Small: 'Naturally convenient',
  whyKicker: 'WHY COOLEX?', whyTitle: 'Quality you can taste',
  whyDesc: 'Little details make a big difference — from convenient prep to delicious everyday meals.',
  quality1Title: 'Quick frozen', quality1Desc: 'Vegetables frozen quickly to help preserve quality and keep them ready for your recipes.',
  quality2Title: 'No preservatives', quality2Desc: 'A practical kitchen choice, with the benefits highlighted on the COOLEX pack.',
  quality3Title: 'Easy to prepare', quality3Desc: 'Follow the preparation instructions on each pack.',
  productKicker: 'DISCOVER COOLEX', productTitle: 'A little color for every plate',
  "groupVegetables": "Vegetables",
  "peas": "Green peas",
  "green-beans": "Cut green beans",
  "mixed": "Mixed vegetables",
  "okra": "Whole okra",
  "cauliflower": "Cauliflower",
  "broccoli": "Broccoli",
  "carrots": "Diced carrots",
  "sweet-potato": "Diced sweet potato",
  "molokhia": "Molokhia",
  "fava": "Green fava beans",
  "groupFruit": "Fruit",
  "strawberries": "Strawberries",
  "pomegranate": "Pomegranate seeds",
  "rangeCta": "Ask about our products",
  "company": "About COOLEX",
  "companyIntro": "With over 15 years of experience in frozen fruit and vegetables, we carefully choose our farm partners and suppliers. We flash-freeze produce within hours of harvest to preserve its flavor and color.",
  "mission": "Our mission",
  "missionText": "We work with trusted growers and suppliers to freeze fruit and vegetables at peak freshness and preserve their natural flavor.",
  "vision": "Our vision",
  "visionText": "We aim to grow in our local market and bring COOLEX products to new markets across Europe, America, South Africa and the Gulf.",
  contactKicker: "LET'S CONNECT", contactTitle: 'Have a question? Say hello.',
  contactDesc: 'Interested in COOLEX products, distribution opportunities, or business partnerships? We would love to hear from you.',
  contactPoint1: 'Product inquiries', contactPoint2: 'Distribution & partnerships', contactPoint3: 'General questions',
  whatsapp: 'WhatsApp', backRange: 'Back to products', serving: 'In the kitchen', inquiry: 'Ask about this product',
  footerTag: 'Bringing nature closer to your kitchen.', rights: 'All rights reserved.'
};

const originalArabic = {};
document.querySelectorAll('[data-i18n]').forEach((element) => {
  const key = element.dataset.i18n;
  if (!(key in originalArabic)) originalArabic[key] = element.textContent;
});

function getStoredLanguage() {
  try { return localStorage.getItem('coolex-language') === 'en' ? 'en' : 'ar'; }
  catch { return 'ar'; }
}
function saveLanguage(lang) {
  try { localStorage.setItem('coolex-language', lang); } catch { /* Storage may be blocked. */ }
}
let currentLanguage = getStoredLanguage();
function applyLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const values = lang === 'ar' ? originalArabic : english;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const text = lang === "en" ? (element.dataset.en || values[key]) : values[key];
    if (text !== undefined) element.textContent = text;
  });
  document.querySelectorAll('[data-placeholder-ar]').forEach((element) => {
    element.placeholder = element.getAttribute(`data-placeholder-${lang}`) || '';
  });
  document.querySelectorAll('[data-alt-ar]').forEach((element) => {
    element.alt = element.getAttribute(`data-alt-${lang}`) || '';
  });
  document.querySelectorAll('.lang-btn').forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelector('#menu-toggle').setAttribute('aria-label', lang === 'ar' ? 'فتح القائمة' : 'Open menu');
  document.querySelector('#site-nav').setAttribute('aria-label', lang === 'ar' ? 'القائمة الرئيسية' : 'Main navigation');
  document.title = lang === 'ar' ? 'COOLEX | كوليكس - خضروات وفاكهة مجمدة بجودة مميزة' : 'COOLEX | Premium Frozen Produce';
  const product = document.querySelector('.detail h1');
  if (product) {
    document.title = product.textContent + ' | COOLEX';
    const message = lang === 'ar'
      ? 'مرحبًا، أود الاستفسار عن منتج كوليكس: ' + product.textContent
      : 'Hello, I would like to ask about COOLEX ' + product.textContent + '.';
    document.querySelectorAll('[data-whatsapp]').forEach(link => {
      link.href = 'https://wa.me/' + link.dataset.whatsapp + '?text=' + encodeURIComponent(message);
    });
  }
  saveLanguage(lang);
}

document.querySelectorAll('.lang-btn').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});
applyLanguage(currentLanguage);

const menuToggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('#site-nav');
function closeMenu() {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('use').setAttribute('href', '#i-menu');
}
menuToggle.addEventListener('click', () => {
  const open = !menu.classList.contains('is-open');
  menu.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const header = document.querySelector('#site-header');
function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 20); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
document.querySelector('#year').textContent = new Date().getFullYear();

// Progressive enhancement: sections are still shown if JavaScript is disabled.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-enabled');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px 45px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
