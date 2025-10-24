document.addEventListener('DOMContentLoaded', () => {
  // ---- manejo del formulario ----
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const name = nameInput ? nameInput.value.trim() : '';
      if (msg) msg.textContent = `Gracias ${name || ''}, pronto te contactaremos.`;
      form.reset();
    });
  }

  // ---- toggle para "Nosotros" ----
  const linkNosotros = document.querySelector('nav a[href="#nosotros"]');
  const nosotros = document.getElementById('nosotros');

  if (nosotros) nosotros.classList.remove('active');

  if (linkNosotros && nosotros) {
    linkNosotros.addEventListener('click', e => {
      e.preventDefault();
      nosotros.classList.toggle('active');
    });
  }

  // ---- si navegas a otra sección, ocultar "Nosotros" ----
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#nosotros') {
      link.addEventListener('click', () => {
        if (nosotros && nosotros.classList.contains('active')) {
          nosotros.classList.remove('active');
        }
      });
    }
  });

  // === 💚 CLICK EN LOGO: volver al inicio completo ===
  const logo = document.getElementById('logoFarmacia');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', e => {
      e.preventDefault();

      // Scroll suave hacia arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Espera un instante y recarga todo el index
      setTimeout(() => {
        window.location.reload();
      }, 400);
    });
  }

  // === SLIDER AUTOMÁTICO CON FLECHAS ===
  const slides = document.querySelectorAll('.slide');
  const btnIzq = document.querySelector('.flecha.izq');
  const btnDer = document.querySelector('.flecha.der');
  let indice = 0;

  function mostrarSlide(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    document.querySelector('.slides').style.transform = `translateX(-${i * 100}%)`;
  }

  if (btnDer) {
    btnDer.addEventListener('click', () => {
      indice = (indice + 1) % slides.length;
      mostrarSlide(indice);
    });
  }

  if (btnIzq) {
    btnIzq.addEventListener('click', () => {
      indice = (indice - 1 + slides.length) % slides.length;
      mostrarSlide(indice);
    });
  }

  setInterval(() => {
    indice = (indice + 1) % slides.length;
    mostrarSlide(indice);
  }, 5000);
});
