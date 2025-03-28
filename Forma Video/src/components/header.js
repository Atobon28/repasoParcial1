class Header extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement).
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y contenido del componente.
    }

    connectedCallback() {
        this.render(); // Llama al método render cuando el componente se agrega al DOM.
    }

    render() {
        // Define el contenido HTML y CSS del componente dentro del Shadow DOM.
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; /* Hace que el componente sea un bloque en el DOM. */
                    width: 100%; /* El componente ocupa todo el ancho disponible. */
                    text-align: center; /* Centra el texto dentro del componente. */
                    padding: 20px 0; /* Agrega espacio arriba y abajo del contenido. */
                }
                .title {
                    font-size: 2.5rem; /* Tamaño grande para el texto del título. */
                    font-weight: bold; /* Hace que el texto sea negrita. */
                    color: #333; /* Color gris oscuro para el texto. */
                    margin-bottom: 20px; /* Agrega espacio debajo del título. */
                }
                .header {
                    display: flex; /* Usa flexbox para organizar los elementos. */
                    justify-content: center; /* Centra los elementos horizontalmente. */
                    align-items: center; /* Centra los elementos verticalmente. */
                    gap: 15px; /* Agrega espacio entre los elementos. */
                }
            </style>
            <div class="title">Fortnite Chapters</div> <!-- Título principal del encabezado. -->
            <div class="header">
                <slot></slot> <!-- Espacio reservado para contenido dinámico que se inserte desde fuera del componente. -->
            </div>
        `;
    }
}

// Define el nuevo elemento personalizado 'fortnite-header'.
customElements.define("fortnite-header", Header);