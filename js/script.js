document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          //observer.unobserve(entry.target);
        }
        else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach(r => observer.observe(r));
});

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
  hamburger.classList.toggle("active");

  // Si no usamos ::before, también se puede cambiar el texto directo
  if (hamburger.classList.contains("active")) {
    hamburger.textContent = "✖";
  } else {
    hamburger.textContent = "☰";
  }
});


document.querySelectorAll('.carousel-container').forEach(container => {
  const carousel = container.querySelector('.carousel');
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');

  const card = container.querySelector('.card');
  const cardStyle = window.getComputedStyle(card);
  const cardMargin = parseInt(cardStyle.marginRight || 0);
  const cardWidth = card.offsetWidth + cardMargin;

  function isAtEnd() {
    return Math.ceil(carousel.scrollLeft + carousel.offsetWidth) >= carousel.scrollWidth;
  }

  function isAtStart() {
    return carousel.scrollLeft <= 0;
  }

  nextBtn.addEventListener('click', () => {
    if (isAtEnd()) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    if (isAtStart()) {
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  });

  // Arrastre con mouse
  let isDragging = false;
  let startX;
  let scrollStart;

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
  });

  carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollStart - walk;
  });

  // Táctil
  carousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollStart - walk;
  });

  carousel.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Autoplay
  let autoplayInterval;

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      if (isAtEnd()) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  startAutoplay();

  ['mousedown', 'touchstart', 'mouseover'].forEach(event => {
    carousel.addEventListener(event, stopAutoplay);
  });

  ['mouseup', 'touchend', 'mouseleave'].forEach(event => {
    carousel.addEventListener(event, startAutoplay);
  });
});
