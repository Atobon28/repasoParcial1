class LuladaSidebar extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement)
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y la estructura

        // Define el HTML y los estilos del componente
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 250px; /* Ancho fijo de la barra lateral */
                    background-color: white; /* Fondo blanco */
                    border-right: 1px solid #e0e0e0; /* Borde derecho gris claro */
                    display: flex; /* Organiza los elementos en columna */
                    flex-direction: column;
                    padding: 20px; /* Espaciado interno */
                    align-items: center; /* Centra los elementos horizontalmente */
                }
                .sidebar-logo {
                    margin-bottom: 30px; /* Espaciado inferior del logo */
                    text-align: center; /* Centra el logo */
                }
                .location-tags {
                    display: flex; /* Organiza las etiquetas en columna */
                    flex-direction: column;
                    align-items: center; /* Centra las etiquetas horizontalmente */
                    margin-bottom: 20px; /* Espaciado inferior */
                    font-size: 18px; /* Tamaño de fuente */
                    color: #666; /* Color gris */
                }
                .menu-items {
                    width: 100%; /* Ocupa todo el ancho disponible */
                }
                .menu-item {
                    display: flex; /* Organiza los elementos en fila */
                    align-items: center; /* Alinea los elementos verticalmente */
                    padding: 10px; /* Espaciado interno */
                    cursor: pointer; /* Cambia el cursor al pasar el mouse */
                    border-radius: 5px; /* Bordes redondeados */
                    margin-bottom: 10px; /* Espaciado inferior */
                }
                .menu-item:hover {
                    background-color: #f0f0f0; /* Fondo gris claro al pasar el mouse */
                }
                .menu-icon {
                    margin-right: 10px; /* Espaciado entre el ícono y el texto */
                    width: 24px; /* Ancho del ícono */
                    height: 24px; /* Alto del ícono */
                }
            </style>
            
            <!-- Contenedor de los elementos del menú -->
            <div class="menu-items">
                <!-- Elemento del menú: Inicio -->
                <div class="menu-item">
                    <img src="data:image/svg+xml;base64,..." class="menu-icon" alt="Inicio">
                    <span>Inicio</span>
                </div>
                <!-- Elemento del menú: Notificaciones -->
                <div class="menu-item">
                    <img src="data:image/svg+xml;base64,..." class="menu-icon" alt="Notificaciones">
                    <span>Notificaciones</span>
                </div>
                <!-- Elemento del menú: Guardado -->
                <div class="menu-item">
                    <img src="data:image/svg+xml;base64,..." class="menu-icon" alt="Guardado">
                    <span>Guardado</span>
                </div>
                <!-- Elemento del menú: Explorar -->
                <div class="menu-item">
                    <img src="data:image/svg+xml;base64,..." class="menu-icon" alt="Explorar">
                    <span>Explorar</span>
                </div>
                <!-- Elemento del menú: Antojar -->
                <div class="menu-item">
                    <img src="data:image/svg+xml;base64,..." class="menu-icon" alt="Antojar">
                    <span>Antojar</span>
                </div>
                <!-- Elemento del menú: Configuración -->
                <div class="menu-item">
                    <img src="data:image/svg+xml;base64,..." class="menu-icon" alt="Configuración">
                    <span>Configuración</span>
                </div>
                <!-- Elemento del menú: Perfil -->
                <div class="menu-item">
                    <img src="data:image/svg+xml;base64,..." class="menu-icon" alt="Perfil">
                    <span>Perfil</span>
                </div>
            </div>
        `;
    }
}

// Registra el componente personalizado
customElements.define('lulada-sidebar', LuladaSidebar);

// Exporta el componente para usarlo en otros archivos
export default LuladaSidebar;