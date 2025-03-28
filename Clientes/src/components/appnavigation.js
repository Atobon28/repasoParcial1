// Creamos un componente personalizado para la navegación
export default class AppNavigation extends HTMLElement {
    constructor() {
        super(); // Llamamos al constructor de HTMLElement
        this.attachShadow({ mode: 'open' }); // Creamos un "shadow DOM" para encapsular el estilo y contenido
    }

    // Este método se ejecuta cuando el componente se agrega al DOM
    connectedCallback() {
        this.render(); // Dibujamos el contenido del componente
        this.setupEventListeners(); // Configuramos los eventos de los botones
    }

    // Aquí definimos cómo se verá el componente
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilo básico para la barra de navegación */
                :host {
                    display: block;
                }
                nav {
                    background-color: #2c3e50; /* Fondo oscuro */
                    color: white; /* Texto blanco */
                    display: flex;
                    justify-content: center; /* Centrar los botones */
                    padding: 15px;
                }
                .nav-buttons {
                    display: flex;
                    gap: 20px; /* Espacio entre botones */
                }
                button {
                    background-color: #34495e; /* Fondo de los botones */
                    color: white; /* Texto blanco */
                    border: none; /* Sin bordes */
                    padding: 10px 15px; /* Espaciado interno */
                    cursor: pointer; /* Cambia el cursor al pasar por encima */
                    border-radius: 5px; /* Bordes redondeados */
                    transition: background-color 0.3s ease; /* Animación suave al pasar el mouse */
                }
                button:hover {
                    background-color: #4e6d8c; /* Cambia el color al pasar el mouse */
                }
            </style>
            <nav>
                <div class="nav-buttons">
                    <!-- Botones para cambiar la vista -->
                    <button id="all-btn">Todos los Pacientes</button>
                    <button id="pending-btn">Pacientes Pendientes</button>
                    <button id="attended-btn">Pacientes Atendidos</button>
                </div>
            </nav>
        `;
    }

    // Aquí configuramos los eventos de los botones
    setupEventListeners() {
        // Obtenemos los botones del shadow DOM
        const allBtn = this.shadowRoot.getElementById('all-btn');
        const pendingBtn = this.shadowRoot.getElementById('pending-btn');
        const attendedBtn = this.shadowRoot.getElementById('attended-btn');

        // Cuando se hace clic en "Todos los Pacientes", enviamos un evento
        allBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('show-all', { bubbles: true })); // Evento para mostrar todos
        });

        // Cuando se hace clic en "Pacientes Pendientes", enviamos otro evento
        pendingBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('show-pending', { bubbles: true })); // Evento para mostrar pendientes
        });

        // Cuando se hace clic en "Pacientes Atendidos", enviamos otro evento
        attendedBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('show-attended', { bubbles: true })); // Evento para mostrar atendidos
        });
    }
}

// Registramos el componente personalizado con el nombre 'app-navigation'
customElements.define('app-navigation', AppNavigation);