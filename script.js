// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle && navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu after click
        if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
      }
    }
  });
});

// Reveal on scroll using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // optional: unobserve once visible
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => obs.observe(r));

// Set year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Simple typewriter sequence for hero content
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function typeText(el, text, speed = 60) {
  el.textContent = '';
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await sleep(speed);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const typeEl = document.getElementById('type-text');
  const longEl = document.getElementById('type-long');
  const cursor = document.getElementById('type-cursor');
  if (!typeEl || !longEl) return;

  const lines = ["Hi, I'm Sandeep Kumar", "a Professional Coder."];
  const long = "I am a dynamic software engineer with a passion for problem-solving and a strong foundation in full-stack development. Proficient in Java, Python, JavaScript, and SQL, with hands-on experience in front-end (HTML, CSS, React) and back-end (Node.js, Express.js) technologies. Proven ability to collaborate with cross-functional teams to deliver high-quality software solutions. Seeking to leverage technical skills and enthusiasm for innovation in a challenging software development role.";

  (async () => {
    // type each short line (name/title)
    for (const line of lines) {
      await typeText(typeEl, line, 70);
      await sleep(700);
      // small pause then clear
      // we keep it for the next line by clearing
      typeEl.textContent = '';
    }
    // type the first line finally (name) to remain
    await typeText(typeEl, lines[0], 70);
    await sleep(300);
    // type the long paragraph
    await typeText(longEl, long, 18);
    // stop cursor blink after finished (optional)
    if (cursor) cursor.style.opacity = '0';
  })();
});

// 3D tilt effect for hero frame
; (function () {
  const frame = document.getElementById('frame-tilt');
  if (!frame) return;
  const rect = () => frame.getBoundingClientRect();
  const handle = (e) => {
    const r = rect();
    const x = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const y = (e.clientY - r.top) / r.height - 0.5;
    const rotY = x * 12; // degrees
    const rotX = -y * 10;
    frame.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    frame.classList.add('tilting');
  };
  frame.addEventListener('mousemove', handle);
  frame.addEventListener('mouseleave', () => {
    frame.style.transform = '';
    frame.classList.remove('tilting');
  });
})();

// Resume Tabs Logic
; (function () {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.resume-content');

  if (!tabBtns.length || !tabContents.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active to current
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
})();

/* Testimonial Slider Logic */
(function () {
  const testimonials = [
    {
      name: "Lucky Pandey",
      role: "WOS CO-Founder",
      country: "India",
      projectTitle: "Publication Web App Design",
      via: "via personal",
      text: "The publication web app has exceeded my expectations in terms of design and usability. The sleek, intuitive interface makes content management seamless, allowing us to easily publish and organize articles. The responsive design ensures our readers have a great experience on both desktop and mobile. As a founder, I appreciate how quickly I can manage posts and track performance. There’s still room for improvement with advanced analytics and some UX refinements, but overall, it’s an outstanding platform that has streamlined our publishing process.",
      stars: 5
    },
    {
      name: "Sarah Johnson",
      role: "CEO, TechFlow",
      country: "USA",
      projectTitle: "E-Commerce Platform",
      via: "via Upwork",
      text: "Working with this developer was a game-changer for our business. The e-commerce platform they built is robust, fast, and incredibly user-friendly. Our sales have increased by 30% since launch. Highly recommended!",
      stars: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      country: "Singapore",
      projectTitle: "SaaS Dashboard UI",
      via: "via LinkedIn",
      text: "Excellent attention to detail and a strong understanding of modern UI/UX principles. The dashboard is not only beautiful but also highly functional. Communication was smooth throughout the project.",
      stars: 4
    }
  ];

  let currentIndex = 0;
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const dots = document.querySelectorAll('.testi-dots .dot');

  // Elements to update
  const nameEl = document.querySelector('.client-name');
  const roleEl = document.querySelector('.client-role');
  const countryEl = document.querySelector('.client-country');
  const titleEl = document.querySelector('.project-title');
  const viaEl = document.querySelector('.project-via');
  const textEl = document.querySelector('.testi-text');

  function updateSlide(index) {
    const data = testimonials[index];
    // Animate out (simple opacity fade could be added, here just direct update)
    if (nameEl) nameEl.textContent = data.name;
    if (roleEl) roleEl.textContent = data.role;
    if (countryEl) countryEl.textContent = data.country;
    if (titleEl) titleEl.textContent = data.projectTitle;
    if (viaEl) viaEl.textContent = data.via;
    if (textEl) textEl.textContent = data.text;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Auto Scroll Logic
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlide(currentIndex);
  }, 2000); // Change slide every 2 seconds

  // Pause on hover
  const wrapper = document.querySelector('.testimonial-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });

    wrapper.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlide(currentIndex);
      }, 2000);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlide(currentIndex);
  });
})();

/* WhatsApp Button Logic (Dynamic Hide & Smooth Draggable) */
(function () {
  const waBtn = document.getElementById('whatsapp-btn');
  if (!waBtn) return;

  // 1. Dynamic Visibility: Hide WHILE scrolling, show when STOPPED
  let scrollTimer;
  window.addEventListener('scroll', () => {
    waBtn.classList.add('hidden');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      // Re-appear after 400ms of no scrolling
      waBtn.classList.remove('hidden');
    }, 400);
  }, { passive: true });

  // 2. Dragging Logic (Desktop & Mobile)
  let dragging = false;
  let moveOccurred = false;
  let offsetX, offsetY;

  const getPointerPos = (e) => {
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    return { x: clientX, y: clientY };
  };

  const startDrag = (e) => {
    if (e.target.closest('.whatsapp-float')) {
      dragging = true;
      moveOccurred = false;
      waBtn.style.cursor = 'grabbing';
      waBtn.style.transition = 'none'; // Disable transition for raw movement

      const pos = getPointerPos(e);
      const rect = waBtn.getBoundingClientRect();
      offsetX = pos.x - rect.left;
      offsetY = pos.y - rect.top;

      // Note: Removed e.preventDefault() here to allow click events on PC
    }
  };

  const moveDrag = (e) => {
    if (!dragging) return;

    // Prevent scrolling on mobile while dragging
    if (e.cancelable) e.preventDefault();

    const pos = getPointerPos(e);
    let newX = pos.x - offsetX;
    let newY = pos.y - offsetY;

    // Movement threshold for a real "drag"
    if (!moveOccurred) {
      if (Math.abs(newX - (initialPositionX || newX)) > 5 || Math.abs(newY - (initialPositionY || newY)) > 5) {
        moveOccurred = true;
      }
    }

    if (moveOccurred) {
      waBtn.style.bottom = 'auto';
      waBtn.style.right = 'auto';
      waBtn.style.left = newX + 'px';
      waBtn.style.top = newY + 'px';
    }
  };

  let initialPositionX, initialPositionY;
  waBtn.addEventListener('mousedown', (e) => {
    const rect = waBtn.getBoundingClientRect();
    initialPositionX = rect.left;
    initialPositionY = rect.top;
    startDrag(e);
  });

  waBtn.addEventListener('touchstart', (e) => {
    const rect = waBtn.getBoundingClientRect();
    initialPositionX = rect.left;
    initialPositionY = rect.top;
    startDrag(e);
  }, { passive: true });

  const stopDrag = () => {
    if (!dragging) return;
    dragging = false;
    waBtn.style.cursor = 'grab';
    waBtn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    if (moveOccurred) {
      const block = (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        waBtn.removeEventListener('click', block, true);
      };
      waBtn.addEventListener('click', block, true);
    }
  };

  window.addEventListener('mousemove', moveDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchmove', moveDrag, { passive: false });
  window.addEventListener('touchend', stopDrag);
})();
