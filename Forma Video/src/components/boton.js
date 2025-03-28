class Boton extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement).
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y contenido del componente.
    }

    connectedCallback() {
        this.render(); // Llama al método render cuando el componente se agrega al DOM.
    }

    render() {
        // Obtiene el atributo 'text' del componente o usa 'Chapter' como valor predeterminado.
        const text = this.getAttribute('text') || 'Chapter';
        
        // Define el contenido HTML y CSS del componente dentro del Shadow DOM.
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilo del botón */
                button {
                    background-color: #4CAF50; /* Color de fondo inicial */
                    color: white; /* Color del texto */
                    border: none; /* Sin borde */
                    padding: 10px 20px; /* Espaciado interno */
                    border-radius: 5px; /* Bordes redondeados */
                    cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
                    transition: background-color 0.3s ease; /* Transición suave al cambiar el color */
                    font-weight: bold; /* Texto en negrita */
                }
                button:hover {
                    background-color: #45a049; /* Color al pasar el mouse por encima */
                }
                button.active {
                    background-color: #2E7D32; /* Color cuando el botón está activo */
                }
            </style>
            <!-- Botón con el texto dinámico -->
            <button class="chapter-btn">${text}</button>
        `;

        // Agrega un evento 'click' al botón para llamar a dispatchChapterEvent.
        this.shadowRoot.querySelector('button').addEventListener('click', () => this.dispatchChapterEvent());
    }

    dispatchChapterEvent() {
        // Selecciona todos los botones del componente 'app-boton' en el documento.
        const allButtons = document.querySelectorAll('app-boton button');
        allButtons.forEach(btn => {
            // Elimina la clase 'active' de todos los botones.
            btn.classList.remove('active');
            // Restaura el color de fondo predeterminado.
            btn.style.backgroundColor = '#4CAF50';
        });

        // Selecciona el botón actual dentro del Shadow DOM.
        const currentButton = this.shadowRoot.querySelector('button');
        // Agrega la clase 'active' al botón actual.
        currentButton.classList.add('active');
        // Cambia el color de fondo del botón activo.
        currentButton.style.backgroundColor = '#2E7D32';

        // Crea un evento personalizado llamado 'chapter-selected'.
        const event = new CustomEvent('chapter-selected', {
            detail: { chapter: this.getAttribute('text') }, // Incluye el texto del capítulo como detalle.
            bubbles: true, // Permite que el evento burbujee hacia arriba en el DOM.
            composed: true // Permite que el evento atraviese el Shadow DOM.
        });
        // Despacha el evento personalizado.
        this.dispatchEvent(event);
    }
}

// Define el nuevo elemento personalizado 'app-boton'.
customElements.define("app-boton", Boton);