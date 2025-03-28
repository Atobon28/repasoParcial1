class Card extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement).
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y contenido del componente.
    }

    connectedCallback() {
        this.render(); // Llama al método render cuando el componente se agrega al DOM.
    }

    render() {
        // Obtiene los atributos del componente o usa valores predeterminados si no están definidos.
        const title = this.getAttribute('title') || 'Default Title'; // Título de la tarjeta.
        const content = this.getAttribute('content') || 'Default Content'; // Contenido de la tarjeta.
        const rarity = this.getAttribute('rarity') || 'Common'; // Rareza de la tarjeta.
        const image = this.getAttribute('image') || ''; // URL de la imagen de la tarjeta.
        const set = this.getAttribute('set') || 'No Set'; // Conjunto al que pertenece la tarjeta.

        // Función para obtener un color basado en la rareza de la tarjeta.
        const getRarityColor = (rarity) => {
            switch(rarity) {
                case 'Gaming Legends Series': return '#8847FF'; // Color para "Gaming Legends Series".
                case 'Legendary': return '#B76F40'; // Color para "Legendary".
                case 'Epic': return '#8847FF'; // Color para "Epic".
                case 'Rare': return '#5E98D9'; // Color para "Rare".
                case 'Uncommon': return '#48B54F'; // Color para "Uncommon".
                default: return '#B0B0B0'; // Color predeterminado para rarezas desconocidas.
            }
        };

        // Define el contenido HTML y CSS del componente dentro del Shadow DOM.
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilo general de la tarjeta */
                .card {
                    border: 2px solid ${getRarityColor(rarity)}; /* Borde con color según la rareza */
                    border-radius: 12px; /* Bordes redondeados */
                    padding: 15px; /* Espaciado interno */
                    text-align: center; /* Centra el contenido */
                    background-color: white; /* Fondo blanco */
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Sombra para dar efecto de elevación */
                    transition: transform 0.3s ease; /* Transición suave al hacer hover */
                    width: 250px; /* Ancho fijo de la tarjeta */
                    height: 350px; /* Altura fija de la tarjeta */
                    display: flex; /* Usa flexbox para organizar el contenido */
                    flex-direction: column; /* Coloca los elementos en una columna */
                }
                .card:hover {
                    transform: scale(1.05); /* Aumenta ligeramente el tamaño al pasar el mouse */
                }
                /* Estilo de la imagen de la tarjeta */
                .card-image {
                    width: 100%; /* La imagen ocupa todo el ancho */
                    height: 200px; /* Altura fija de la imagen */
                    background-color: #f0f0f0; /* Color de fondo por defecto */
                    background-image: url('${image}'); /* Imagen de fondo */
                    background-size: contain; /* Ajusta la imagen para que quepa sin recortarse */
                    background-repeat: no-repeat; /* Evita que la imagen se repita */
                    background-position: center; /* Centra la imagen */
                    border-radius: 8px; /* Bordes redondeados de la imagen */
                    margin-bottom: 10px; /* Espaciado inferior */
                }
                /* Estilo del título de la tarjeta */
                .card-title {
                    font-weight: bold; /* Texto en negrita */
                    font-size: 1.1rem; /* Tamaño de fuente */
                    margin-bottom: 10px; /* Espaciado inferior */
                    color: ${getRarityColor(rarity)}; /* Color según la rareza */
                }
                /* Estilo del contenido de la tarjeta */
                .card-content {
                    color: #666; /* Color gris para el texto */
                    font-size: 0.9rem; /* Tamaño de fuente */
                    flex-grow: 1; /* Permite que el contenido ocupe el espacio disponible */
                    overflow: hidden; /* Oculta el contenido que se desborde */
                    text-overflow: ellipsis; /* Agrega puntos suspensivos si el texto es muy largo */
                }
                /* Estilo del conjunto de la tarjeta */
                .card-set {
                    font-size: 0.8rem; /* Tamaño de fuente más pequeño */
                    color: #888; /* Color gris claro */
                    margin-top: 10px; /* Espaciado superior */
                }
                /* Estilo de la rareza de la tarjeta */
                .card-rarity {
                    font-size: 0.8rem; /* Tamaño de fuente más pequeño */
                    color: ${getRarityColor(rarity)}; /* Color según la rareza */
                    font-weight: bold; /* Texto en negrita */
                }
            </style>
            <!-- Estructura HTML de la tarjeta -->
            <div class="card">
                <div class="card-image"></div> <!-- Imagen de la tarjeta -->
                <div class="card-title">${title}</div> <!-- Título dinámico de la tarjeta -->
                <div class="card-content">${content}</div> <!-- Contenido dinámico de la tarjeta -->
                <div class="card-set">Set: ${set}</div> <!-- Conjunto dinámico de la tarjeta -->
                <div class="card-rarity">${rarity}</div> <!-- Rareza dinámica de la tarjeta -->
            </div>
        `;
    }
}

// Define el nuevo elemento personalizado 'app-card'.
customElements.define("app-card", Card);