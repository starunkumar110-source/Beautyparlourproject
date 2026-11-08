// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1800);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

// ===== SCROLL REVEAL (service cards & about) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.srv-card, .about-img, .about-text').forEach(el => {
  revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ===== SCROLL TO TOP =====
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== BOOKING FORM =====
const bookingForm  = document.getElementById('bookingForm');
const formSuccess  = document.getElementById('formSuccess');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookingForm.style.display = 'none';
    formSuccess.classList.add('show');
    setTimeout(() => {
      formSuccess.classList.remove('show');
      bookingForm.reset();
      bookingForm.style.display = 'block';
    }, 4000);
  });
}

// ===== SMOOTH SECTION ENTRY =====
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.opacity = '1';
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(s => {
  sectionObserver.observe(s);
});

// ===== MARQUEE PAUSE ON HOVER (already CSS, extra JS insurance) =====
const track = document.getElementById('marqueeTrack');
if (track) {
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a:not(.btn-book)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAs.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#C9567E';
    }
  });
}, { passive: true });
