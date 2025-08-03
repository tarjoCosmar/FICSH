console.log('Archivo nav.js cargado correctamente');

// Función para inicializar la navegación
function initNavigation() {
  const nav = document.querySelector('.navbar-container');
  const menu = document.querySelector('#navbarNav');
  
  if (!nav || !menu) {
    console.warn('Elementos de navegación no encontrados');
    return;
  }

  // Submenús
  const menuItems = document.querySelectorAll('.nav-item');
  menuItems.forEach((item) => {
    const submenu = item.querySelector('.submenu');
    if (submenu) {
      const link = item.querySelector('.nav-link');
      link.addEventListener('click', (event) => {
        if (window.innerWidth <= 991) {
          event.preventDefault();
          submenu.classList.toggle('show');
        }
      });
    }
  });

  // Resaltar página activa
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
      link.parentElement.classList.add('active');
    }
  });

  // Selector de idioma
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', function () {
      const lang = this.value;
      document.querySelectorAll('.nav-link').forEach(link => {
        link.textContent = link.getAttribute(`data-lang-${lang}`);
      });
      console.log('Idioma cambiado a:', lang); // Depuración
    });
  }
}

// Función para inicializar los acordeones
function initAccordions() {
  const detailsElements = document.querySelectorAll('details');
  detailsElements.forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        detailsElements.forEach(d => {
          if (d !== details && d.open) {
            d.open = false;
          }
        });
      }
    });
  });
}

// Función para inicializar el botón de WhatsApp
function initWhatsAppButton() {
  const whatsappButton = document.querySelector('.whatsapp-button');
  if (whatsappButton) {
    whatsappButton.addEventListener('mouseover', () => {
      whatsappButton.style.backgroundColor = '#128C7E';
    });
    whatsappButton.addEventListener('mouseout', () => {
      whatsappButton.style.backgroundColor = '#27bb5d';
    });
  }
}

// Función para inicializar los selectores de año/mes
function initDateSelectors() {
  const anioSelect = document.getElementById('anio');
  const mesSelect = document.getElementById('mes');
  if (anioSelect && mesSelect) {
    anioSelect.addEventListener('change', function () {
      console.log('Año seleccionado:', this.value);
      updateMonthOptions(this.value);
    });
    mesSelect.addEventListener('change', function () {
      console.log('Mes seleccionado:', this.value);
      loadDocuments(this.value);
    });
  }
}

// Funciones placeholder para la lógica
function updateMonthOptions(year) {
  console.log(`Actualizando meses para el año ${year}`);
}

function loadDocuments(month) {
  console.log(`Cargando documentos para el mes ${month}`);
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initAccordions();
  initWhatsAppButton();
  initDateSelectors();
});

// Función para cambiar el idioma de toda la página
function changeLanguage(lang) {
  // 1. Cambiar textos de navegación
  document.querySelectorAll('.nav-link').forEach(link => {
    link.textContent = link.getAttribute(`data-lang-${lang}`);
  });
  
  // 2. Mostrar/ocultar elementos según idioma
  document.querySelectorAll('.lang-es, .lang-en').forEach(el => {
    el.style.display = 'none';
  });
  
  document.querySelectorAll(`.lang-${lang}`).forEach(el => {
    el.style.display = lang === 'es' ? 'inline' : 'block';
  });
  
  // 3. Actualizar botones específicos
  if (lang === 'es') {
    document.querySelector('.center .lang-divider').style.display = 'block';
  } else {
    document.querySelector('.center .lang-divider').style.display = 'none';
  }
  
  // 4. Guardar preferencia de idioma
  localStorage.setItem('preferredLanguage', lang);
}

// Función para inicializar la navegación (actualizada)
function initNavigation() {
  // ... (código existente) ...
  
  // Selector de idioma
  const languageSelect = document.getElementById('languageSelect');
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'es';
  
  if (languageSelect) {
    // Establecer idioma guardado o predeterminado
    languageSelect.value = preferredLanguage;
    changeLanguage(preferredLanguage);
    
    languageSelect.addEventListener('change', function() {
      changeLanguage(this.value);
    });
  }
  
  
}

// news.js
document.addEventListener('DOMContentLoaded', function() {
  // Filtrado de noticias
  const filterButtons = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Agregar clase active al botón clickeado
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filtrar noticias
      newsCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
        } else {
          const category = card.getAttribute('data-category');
          if (category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
  
  // Sistema de "Leer más/menos"
  const readMoreLinks = document.querySelectorAll('.read-more');
  
  readMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const newsCard = this.closest('.news-card');
      
      // Si la tarjeta ya está expandida, contraerla
      if (newsCard.classList.contains('expanded')) {
        newsCard.classList.remove('expanded');
      } else {
        // Contraer todas las demás noticias expandidas
        document.querySelectorAll('.news-card.expanded').forEach(card => {
          card.classList.remove('expanded');
        });
        // Expandir la noticia actual
        newsCard.classList.add('expanded');
        
        // Scroll suave a la noticia expandida
        newsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
  
  // Animación de las tarjetas al aparecer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  newsCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
  
  // Cerrar acordeón al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.news-card') && !e.target.closest('.read-more')) {
      document.querySelectorAll('.news-card.expanded').forEach(card => {
        card.classList.remove('expanded');
      });
    }
  });
  
  // Contar palabras automáticamente
  document.querySelectorAll('.news-full .lang-es, .news-full .lang-en').forEach(element => {
    const text = element.textContent;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const wordCountElement = element.closest('.news-card').querySelector('.word-count.' + element.className);
    
    if (wordCountElement) {
      if (element.classList.contains('lang-es')) {
        wordCountElement.textContent = wordCount + ' palabras';
      } else {
        wordCountElement.textContent = wordCount + ' words';
      }
    }
  });
});