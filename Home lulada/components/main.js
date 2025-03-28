import './header.js'; // Importa el componente del header
import './logo.js'; // Importa el componente del logo
import './navigation.js'; // Importa el componente de navegación
import './reviewscontainer.js'; // Importa el componente de reseñas
import './suggestion.js'; // Importa el componente de sugerencias
import './sidebar.js'; // Importa el componente de la barra lateral

class LuladaMain extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement)

        // Crea un Shadow DOM para encapsular el estilo y la estructura del componente
        this.attachShadow({ mode: 'open' });

        // Aquí se define el HTML y los estilos del componente
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilo general del componente */
                :host {
                    display: block; /* Hace que el componente se comporte como un bloque */
                    font-family: Arial, sans-serif; /* Fuente para todo el contenido */
                }

                /* Diseño principal con flexbox */
                .main-layout {
                    display: flex; /* Organiza los elementos en fila */
                }

                /* Estilo de la barra lateral */
                .sidebar {
                    width: 250px; /* Ancho fijo para la barra lateral */
                }

                /* Estilo del área de contenido */
                .content {
                    flex-grow: 1; /* Ocupa el espacio restante */
                    display: flex;
                    flex-direction: column; /* Organiza los elementos en columna */
                }

                /* Área principal del contenido */
                .content-area {
                    display: flex; /* Organiza los elementos en fila */
                }

                /* Sección de reseñas */
                .reviews-section {
                    flex-grow: 1; /* Ocupa el espacio restante */
                    padding: 20px; /* Espaciado interno */
                    background-color: #f4f4f4; /* Fondo gris claro */
                    display: flex;
                    justify-content: center; /* Centra el contenido horizontalmente */
                }

                /* Contenedor de las reseñas */
                .reviews-content {
                    width: 100%; /* Ocupa todo el ancho disponible */
                    max-width: 600px; /* Ancho máximo para limitar el tamaño */
                }
            </style>
            
            <!-- Componente del header -->
            <lulada-header></lulada-header>
            
            <!-- Diseño principal -->
            <div class="main-layout">
                <!-- Barra lateral -->
                <div class="sidebar">
                    <lulada-sidebar></lulada-sidebar>
                </div>
                
                <!-- Contenido principal -->
                <div class="content">
                    <div class="content-area">
                        <!-- Sección de reseñas -->
                        <div class="reviews-section">
                            <div class="reviews-content">
                                <lulada-reviews-container></lulada-reviews-container>
                            </div>
                        </div>
                        <!-- Sección de sugerencias -->
                        <lulada-suggestions></lulada-suggestions>
                    </div>
                </div>
            </div>
        `;
    }
}

// Registra el componente personalizado
customElements.define('lulada-main', LuladaMain);

// Exporta el componente para usarlo en otros archivos
export default LuladaMain;