class CardContainer extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement).
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y contenido del componente.
        this.fortniteData = []; // Inicializa un arreglo vacío para almacenar los datos de Fortnite.
    }

    connectedCallback() {
        this.render(); // Llama al método render para construir la estructura inicial del componente.
        this.setupEventListeners(); // Configura los eventos que el componente escuchará.
        this.loadFortniteData(); // Carga los datos de Fortnite desde un archivo JSON.
    }

    render() {
        // Define el contenido HTML y CSS del componente dentro del Shadow DOM.
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; /* Hace que el componente sea un bloque en el DOM. */
                    margin-top: 20px; /* Agrega un margen superior. */
                }
                .card-grid {
                    display: grid; /* Usa un diseño de cuadrícula para organizar las tarjetas. */
                    grid-template-columns: repeat(4, 1fr); /* Crea 4 columnas de igual tamaño. */
                    gap: 15px; /* Espaciado entre las tarjetas. */
                    padding: 20px; /* Espaciado interno alrededor de la cuadrícula. */
                    justify-content: center; /* Centra las tarjetas horizontalmente. */
                }
                .hidden {
                    display: none; /* Oculta el elemento cuando tiene esta clase. */
                }
            </style>
            <div class="card-grid hidden"></div> <!-- Contenedor para las tarjetas, inicialmente oculto. -->
        `;
    }

    async loadFortniteData() {
        try {
            // Intenta cargar los datos desde el archivo 'fortnite.json'.
            const response = await fetch('fortnite.json'); // Realiza una solicitud para obtener el archivo JSON.
            const jsonData = await response.json(); // Convierte la respuesta en un objeto JSON.
            this.fortniteData = jsonData.data.br; // Almacena los datos de Battle Royale en la propiedad fortniteData.
        } catch (error) {
            // Si ocurre un error, lo muestra en la consola.
            console.error('Error loading Fortnite data:', error);
        }
    }

    setupEventListeners() {
        // Escucha el evento personalizado 'chapter-selected' en el documento.
        document.addEventListener('chapter-selected', (event) => {
            const chapter = event.detail.chapter; // Obtiene el capítulo seleccionado del evento.
            this.displayCardsForChapter(chapter); // Muestra las tarjetas correspondientes al capítulo seleccionado.
        });
    }

    displayCardsForChapter(chapter) {
        const cardGrid = this.shadowRoot.querySelector('.card-grid'); // Selecciona el contenedor de las tarjetas.
        cardGrid.innerHTML = ''; // Limpia las tarjetas anteriores.
        cardGrid.classList.remove('hidden'); // Asegura que el contenedor sea visible.

        // Filtra los elementos que pertenecen al capítulo seleccionado.
        const chapterItems = this.fortniteData.filter(item => 
            item.introduction && item.introduction.chapter === chapter.replace('Chapter ', '') // Compara el capítulo.
        );

        // Si no se encuentran elementos, muestra un mensaje.
        if (chapterItems.length === 0) {
            cardGrid.innerHTML = `<p>No items found for ${chapter}</p>`; // Mensaje de "sin resultados".
            return; // Sale de la función.
        }

        // Si hay menos de 12 elementos, duplica los elementos para llenar la cuadrícula.
        const itemsToDisplay = chapterItems.length >= 12 
            ? chapterItems.slice(0, 12) // Si hay 12 o más elementos, toma los primeros 12.
            : [...chapterItems, ...chapterItems].slice(0, 12); // Si hay menos, duplica y toma los primeros 12.

        // Crea una tarjeta para cada elemento y la agrega al contenedor.
        itemsToDisplay.forEach(item => {
            const card = document.createElement('app-card'); // Crea un nuevo elemento 'app-card'.
            card.setAttribute('title', item.name); // Establece el título de la tarjeta.
            card.setAttribute('content', item.description || 'No description'); // Establece el contenido o un valor predeterminado.
            card.setAttribute('rarity', item.rarity.displayValue); // Establece la rareza de la tarjeta.
            card.setAttribute('image', item.images.icon); // Establece la URL de la imagen.
            card.setAttribute('set', item.set?.value || 'No Set'); // Establece el conjunto o un valor predeterminado.
            cardGrid.appendChild(card); // Agrega la tarjeta al contenedor.
        });
    }
}

// Define el nuevo elemento personalizado 'fortnite-card-container'.
customElements.define("fortnite-card-container", CardContainer);