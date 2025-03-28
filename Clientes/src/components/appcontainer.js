// Importamos los componentes que vamos a usar
import PatientList from './patientlist.js';
import AppNavigation from './appnavigation.js';

// Creamos una clase para nuestro componente personalizado
export default class AppContainer extends HTMLElement {
    constructor() {
        super(); // Llamamos al constructor de HTMLElement
        this.attachShadow({ mode: 'open' }); // Creamos un "shadow DOM" para encapsular el estilo y contenido
    }

    // Este método se ejecuta cuando el componente se agrega al DOM
    connectedCallback() {
        this.render(); // Llamamos al método que dibuja el contenido
        this.setupEventListeners(); // Configuramos los eventos que queremos escuchar
    }

    // Aquí configuramos los eventos que manejará nuestro componente
    setupEventListeners() {
        // Escuchamos el evento 'show-all' y mostramos todos los pacientes
        this.shadowRoot.addEventListener('show-all', () => {
            const patientList = this.shadowRoot.querySelector('patient-list'); // Buscamos el componente de la lista
            if (patientList) {
                patientList.setAttribute('view', 'all'); // Cambiamos su vista a "todos"
            }
        });

        // Escuchamos el evento 'show-pending' y mostramos solo los pacientes pendientes
        this.shadowRoot.addEventListener('show-pending', () => {
            const patientList = this.shadowRoot.querySelector('patient-list');
            if (patientList) {
                patientList.setAttribute('view', 'pending'); // Cambiamos su vista a "pendientes"
            }
        });

        // Escuchamos el evento 'show-attended' y mostramos solo los pacientes atendidos
        this.shadowRoot.addEventListener('show-attended', () => {
            const patientList = this.shadowRoot.querySelector('patient-list');
            if (patientList) {
                patientList.setAttribute('view', 'attended'); // Cambiamos su vista a "atendidos"
            }
        });
    }

    // Este método dibuja el contenido del componente
    render() {
        if (!this.shadowRoot) return; // Si no hay shadowRoot, salimos

        // Definimos el HTML y CSS del componente
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilo básico para el componente */
                :host {
                    display: block;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                }
            </style>
            <div class="container">
                <!-- Agregamos la navegación y la lista de pacientes -->
                <app-navigation></app-navigation>
                <patient-list></patient-list>
            </div>
        `;
    }
}

// Registramos el componente personalizado con el nombre 'app-container'
customElements.define('app-container', AppContainer);