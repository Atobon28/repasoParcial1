// Importamos la clase Card desde otro archivo
import Card from './Card.js';

// Creamos una clase para manejar los ítems de Fortnite
class FortniteItems {
    constructor() {
        // Guardamos referencias a los elementos del DOM que vamos a usar
        this.cardContainer = document.getElementById('card-container'); // Donde van las tarjetas
        this.chapterButtons = document.querySelectorAll('.chapter-buttons button'); // Botones de capítulos
        this.fortniteData = []; // Aquí guardaremos los datos de Fortnite

        // Configuramos los eventos de los botones y cargamos los datos
        this.setupEventListeners();
        this.loadData();
    }

    // Configuramos los eventos para que los botones respondan a los clics
    setupEventListeners() {
        this.chapterButtons.forEach(button => {
            // Cuando se haga clic en un botón, filtramos los ítems por capítulo
            button.addEventListener('click', () => this.filterByChapter(button));
        });
    }

    // Cargamos los datos de Fortnite desde un archivo JSON
    async loadData() {
        try {
            // Intentamos cargar el archivo desde varias rutas posibles
            const possiblePaths = ['../fortnite.json', './fortnite.json', 'fortnite.json'];
            let response;

            for (const path of possiblePaths) {
                try {
                    response = await fetch(path); // Intentamos obtener el archivo
                    if (response.ok) break; // Si lo encontramos, salimos del bucle
                } catch (err) {
                    console.log(`No se pudo cargar desde ${path}:`, err); // Mostramos el error si falla
                }
            }

            // Si no encontramos el archivo, mostramos un error
            if (!response || !response.ok) {
                throw new Error('No se pudo encontrar el archivo fortnite.json');
            }

            // Convertimos la respuesta en JSON y guardamos los datos
            const jsonData = await response.json();
            this.fortniteData = jsonData.data.br; // Guardamos solo los ítems de Battle Royale
            console.log('Datos cargados:', this.fortniteData); // Mostramos los datos en la consola
        } catch (error) {
            console.error('Error al cargar los datos:', error); // Mostramos el error en la consola
            this.cardContainer.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`; // Mostramos un mensaje en la página
        }
    }

    // Filtramos los ítems por capítulo cuando se hace clic en un botón
    filterByChapter(activeButton) {
        // Quitamos la clase "active" de todos los botones
        this.chapterButtons.forEach(btn => btn.classList.remove('active'));

        // Agregamos la clase "active" al botón que se hizo clic
        activeButton.classList.add('active');

        // Obtenemos el número del capítulo desde el botón
        const chapter = activeButton.dataset.chapter;

        // Filtramos los ítems que pertenecen al capítulo seleccionado
        const chapterItems = this.fortniteData.filter(item => 
            item.introduction && item.introduction.chapter === chapter
        );

        // Limpiamos las tarjetas anteriores
        this.cardContainer.innerHTML = '';

        // Si hay menos de 12 ítems, duplicamos algunos para llenar la cuadrícula
        const itemsToDisplay = chapterItems.length >= 12 
            ? chapterItems.slice(0, 12) // Si hay suficientes, tomamos los primeros 12
            : [...chapterItems, ...chapterItems].slice(0, 12); // Si no, duplicamos y tomamos 12

        // Creamos una tarjeta para cada ítem y la agregamos al contenedor
        itemsToDisplay.forEach(item => {
            const card = new Card(item); // Creamos una nueva tarjeta
            this.cardContainer.appendChild(card.createCardElement()); // La agregamos al contenedor
        });
    }
}

// Cuando la página termine de cargar, inicializamos la clase
document.addEventListener('DOMContentLoaded', () => {
    new FortniteItems(); // Creamos una nueva instancia de FortniteItems
});