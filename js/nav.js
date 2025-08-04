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

function initMagazineFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      filterArticles(filter);
    });
  });
}

function filterArticles(category) {
  const articles = document.querySelectorAll('.featured-article, .standard-article');
  
  articles.forEach(article => {
    if (category === 'all' || article.dataset.category === category) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  initMagazineFilters();
  
  // Animación al hacer hover en artículos
  const articles = document.querySelectorAll('.standard-article');
  articles.forEach(article => {
    article.addEventListener('mouseenter', function() {
      this.querySelector('img').style.transform = 'scale(1.05)';
    });
    article.addEventListener('mouseleave', function() {
      this.querySelector('img').style.transform = 'scale(1)';
    });
  });
});

// ===== FUNCIONALIDAD PROSPERAR =====
function initFundraising() {
  // Selector de idioma (integración con sistema existente)
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', updateFundraisingLanguage);
  }

  // Botones de donación
  document.querySelectorAll('.btn-donate').forEach(button => {
    button.addEventListener('click', handleDonation);
  });

  // Compartir en redes
  document.getElementById('facebook-share')?.addEventListener('click', shareOnFacebook);
}

function handleDonation() {
  const reward = this.closest('.reward-card').querySelector('h4').textContent.trim();
  console.log(`Donación seleccionada: ${reward}`);
  // Integrar con PayPal/Stripe aquí
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

// Inicialización al cargar
document.addEventListener('DOMContentLoaded', initFundraising);