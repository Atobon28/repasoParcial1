class LuladaHeader extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement)
        
        // Crea un Shadow DOM para encapsular el estilo y la estructura del componente
        this.attachShadow({ mode: 'open' });

        // Aquí se define el HTML y los estilos del componente
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilo general del componente */
                :host {
                    display: block;
                    width: 100%;
                    background-color: white;
                }

                /* Contenedor principal del header */
                .header-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                }

                /* Estilo del logo */
                .logo {
                    align-self: flex-start; /* Alinea el logo a la izquierda */
                    width: 300px;
                    margin-bottom: 20px;
                }
                .logo img {
                    width: 100%; /* El logo ocupa todo el ancho disponible */
                    height: auto; /* Mantiene la proporción de la imagen */
                }

                /* Estilo de las etiquetas de ubicación */
                .location-tags {
                    display: flex; /* Las etiquetas se muestran en fila */
                    gap: 20px; /* Espacio entre las etiquetas */
                    margin-bottom: 10px;
                }
                .location-tags a {
                    text-decoration: none; /* Quita el subrayado de los enlaces */
                    color: #666; /* Color gris para el texto */
                    font-weight: bold; /* Texto en negrita */
                    padding: 5px 10px; /* Espaciado interno */
                }
                .location-tags a:hover {
                    color: #333; /* Cambia el color al pasar el mouse */
                    background-color: #f0f0f0; /* Fondo gris claro al pasar el mouse */
                    border-radius: 5px; /* Bordes redondeados */
                }
            </style>
            
            <!-- Estructura del header -->
            <div class="header-container">
                <!-- Sección del logo -->
                <div class="logo">
                    <img 
                        src="https://i.postimg.cc/xdhdVv5d/Recurso-5-ASCAAS.jpg" 
                        alt="Lulada Logo"
                    >
                </div>
                <!-- Sección de etiquetas de ubicación -->
                <div class="location-tags">
                    <a href="#" data-section="cali">Cali</a>
                    <a href="#" data-section="norte">Norte</a>
                    <a href="#" data-section="sur">Sur</a>
                    <a href="#" data-section="oeste">Oeste</a>
                    <a href="#" data-section="centro">Centro</a>
                </div>
            </div>
        `;

        // Agrega eventos a las etiquetas de ubicación
        this.shadowRoot.querySelectorAll('.location-tags a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Evita que el enlace recargue la página
                const section = e.target.getAttribute('data-section'); // Obtiene la sección seleccionada
                // Lanza un evento personalizado con la sección seleccionada
                this.dispatchEvent(new CustomEvent('location-select', { 
                    detail: section, // Información de la sección
                    bubbles: true, // Permite que el evento burbujee
                    composed: true // Permite que el evento salga del Shadow DOM
                }));
            });
        });
    }
}

// Registra el componente personalizado
customElements.define('lulada-header', LuladaHeader);

// Exporta el componente para usarlo en otros archivos
export default LuladaHeader;