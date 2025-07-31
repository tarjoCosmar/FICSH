console.log('Archivo JavaScript cargado correctamente');

document.addEventListener("DOMContentLoaded", function() {
  const nav = document.querySelector('nav');
  const button = document.querySelector('.menu-button');
  const menuIcon = document.querySelector('.menu-icon');

  

  const menuItems = document.querySelectorAll('.menu > li');

  menuItems.forEach((item) => {
    const submenu = item.querySelector('.submenu');
    if (submenu) {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        submenu.classList.toggle('show');
      });
    }
  });

  // Inicializar el carrusel de imágenes
  console.log("Initializing Swiper...");
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 5000, // Intervalo de tiempo entre diapositivas en milisegundos
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
	console.log('Carrusel inicializado');
});

document.getElementById("anio").addEventListener("change", function() {
    // Código para actualizar la lista de meses
});

document.getElementById("mes").addEventListener("change", function() {
    // Código para cargar los litarles de los documentos
});
const closeDetails = document.querySelectorAll('details');

closeDetails.forEach(details => {
    details.addEventListener('toggle', (e) => {
        if (details.open) {
            closeDetails.forEach(details => {
                if (details != e.target && details.open) {
                    details.open = false;
                }
            });
        }
    });
});


const whatsappButton = document.querySelector('.whatsapp-button');

whatsappButton.addEventListener('mouseover', () => {
  whatsappButton.style.color = 'red';
});

whatsappButton.addEventListener('mouseout', () => {
  whatsappButton.style.color = 'black';
});

