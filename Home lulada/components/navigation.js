class LuladaNavigation extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement)

        // Crea un Shadow DOM para encapsular el estilo y la estructura del componente
        this.attachShadow({ mode: 'open' });

        // Aquí se define el HTML y los estilos del componente
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; /* Hace que el componente se comporte como un bloque */
                }
                .navigation {
                    display: flex; /* Organiza los elementos en fila */
                    justify-content: center; /* Centra los elementos horizontalmente */
                    align-items: center; /* Centra los elementos verticalmente */
                    background-color: #f0f0f0; /* Fondo gris claro */
                    padding: 10px; /* Espaciado interno */
                    text-align: center; /* Centra el texto */
                }
                .navigation-container {
                    display: flex; /* Organiza los enlaces en fila */
                    gap: 20px; /* Espacio entre los enlaces */
                }
                .navigation a {
                    text-decoration: none; /* Quita el subrayado de los enlaces */
                    color: #333; /* Color del texto */
                    font-weight: bold; /* Texto en negrita */
                    padding: 5px 10px; /* Espaciado interno */
                }
                .navigation a:hover {
                    color: #666; /* Cambia el color del texto al pasar el mouse */
                    background-color: #e0e0e0; /* Fondo gris más claro al pasar el mouse */
                    border-radius: 5px; /* Bordes redondeados */
                }
            </style>
            <div class="navigation">
                <div class="navigation-container">
                    <!-- Enlaces de navegación -->
                    <a href="#" data-section="cali">Cali</a>
                    <a href="#" data-section="norte">Norte</a>
                    <a href="#" data-section="sur">Sur</a>
                    <a href="#" data-section="oeste">Oeste</a>
                    <a href="#" data-section="centro">Centro</a>
                </div>
            </div>
        `;

        // Agrega eventos a los enlaces de navegación
        this.shadowRoot.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Evita que el enlace recargue la página
                const section = e.target.getAttribute('data-section'); // Obtiene la sección seleccionada
                // Lanza un evento personalizado con la sección seleccionada
                this.dispatchEvent(new CustomEvent('navigate', { 
                    detail: section, // Información de la sección
                    bubbles: true, // Permite que el evento burbujee
                    composed: true // Permite que el evento salga del Shadow DOM
                }));
            });
        });
    }
}

// Registra el componente personalizado
customElements.define('lulada-navigation', LuladaNavigation);

// Exporta el componente para usarlo en otros archivos
export default LuladaNavigation;