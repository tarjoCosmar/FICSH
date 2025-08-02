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