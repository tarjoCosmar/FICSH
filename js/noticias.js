// noticias.js
const noticiasContainer = document.getElementById('noticias-container');
let currentPage = 1;

async function cargarNoticias() {
    try {
        const response = await fetch(`/api/noticias?page=${currentPage}`);
        const noticias = await response.json();

        noticias.forEach(noticia => {
            const noticiaElement = document.createElement('div');
            noticiaElement.classList.add('noticia');
            noticiaElement.textContent = noticia.titulo;
            noticiasContainer.appendChild(noticiaElement);
        });

        currentPage++; // Incrementa la página para la próxima carga
    } catch (error) {
        console.error('Error al cargar noticias:', error);
    }
}

// Cargar noticias al cargar la página o al hacer scroll
window.addEventListener('load', cargarNoticias);
noticiasContainer.addEventListener('scroll', () => {
    if (noticiasContainer.scrollLeft + noticiasContainer.clientWidth >= noticiasContainer.scrollWidth) {
        cargarNoticias();
    }
});