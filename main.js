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

  // ---- toggle para "Nosotros" (solo esa sección) ----
  const linkNosotros = document.querySelector('nav a[href="#nosotros"]');
  const nosotros = document.getElementById('nosotros');

  if (nosotros) {
    // asegura que esté oculto al inicio (CSS también debe manejarlo)
    nosotros.classList.remove('active');
  }

  if (linkNosotros && nosotros) {
    linkNosotros.addEventListener('click', e => {
      e.preventDefault();
      const isNowActive = nosotros.classList.toggle('active');

      if (isNowActive) {
        // abre y hace scroll suave hacia la sección
        //nosotros.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // si se cierra, no hacemos nada extra (opcional: volver al top)
      }
    });
  }

  // ---- si navegas a otra sección, ocultar "Nosotros" si está abierto ----
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#nosotros') {
      link.addEventListener('click', () => {
        if (nosotros && nosotros.classList.contains('active')) {
          nosotros.classList.remove('active');
        }
        // dejar comportamiento normal del enlace (anchor) para que haga scroll
      });
    }
  });
});
// --- Cambio de secciones ---
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const seccionId = e.target.getAttribute('href').substring(1);
    
    // Oculta todas las secciones
    document.querySelectorAll('section').forEach(sec => sec.classList.add('oculto'));
    
    // Muestra solo la sección seleccionada
    document.getElementById(seccionId).classList.remove('oculto');
  });
});
// === SLIDER AUTOMÁTICO CON FLECHAS ===
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const btnIzq = document.querySelector('.flecha.izq');
  const btnDer = document.querySelector('.flecha.der');
  let indice = 0;

  function mostrarSlide(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    document.querySelector('.slides').style.transform = `translateX(-${i * 100}%)`;
  }

  btnDer.addEventListener('click', () => {
    indice = (indice + 1) % slides.length;
    mostrarSlide(indice);
  });

  btnIzq.addEventListener('click', () => {
    indice = (indice - 1 + slides.length) % slides.length;
    mostrarSlide(indice);
  });

  // cambio automático cada 5s
  setInterval(() => {
    indice = (indice + 1) % slides.length;
    mostrarSlide(indice);
  }, 5000);
});

