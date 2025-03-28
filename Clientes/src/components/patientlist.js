// Importamos el componente de la tarjeta de paciente
import PatientCard from './patientcard.js';

// Creamos un componente personalizado para manejar la lista de pacientes
export default class PatientList extends HTMLElement {
    constructor() {
        super(); // Llamamos al constructor de HTMLElement
        this.attachShadow({ mode: 'open' }); // Creamos un "shadow DOM" para encapsular el contenido
        this.patients = []; // Lista completa de pacientes
        this.pendingPatients = []; // Lista de pacientes pendientes
        this.attendedPatients = []; // Lista de pacientes atendidos
        this.currentView = 'all'; // Vista actual (todos, pendientes o atendidos)
    }

    // Atributos que queremos observar (en este caso, la vista)
    static get observedAttributes() {
        return ['view'];
    }

    // Este método se ejecuta cuando cambia un atributo observado
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'view') {
            this.currentView = newValue; // Actualizamos la vista actual
            this.render(); // Redibujamos el contenido
        }
    }

    // Este método se ejecuta cuando el componente se agrega al DOM
    connectedCallback() {
        this.loadPatients(); // Cargamos los datos de los pacientes
        this.setupEventListeners(); // Configuramos los eventos
    }

    // Cargamos los datos de los pacientes desde un archivo JSON
    async loadPatients() {
        try {
            const response = await fetch('./src/data/patients.json'); // Pedimos los datos
            if (!response.ok) {
                throw new Error(`Error al cargar los datos: ${response.status}`); // Si hay error, lo mostramos
            }
            this.patients = await response.json(); // Guardamos los pacientes
            this.pendingPatients = [...this.patients]; // Inicialmente, todos están pendientes
            this.render(); // Dibujamos la lista
        } catch (error) {
            console.error('Error cargando pacientes:', error);
            this.renderError(error); // Mostramos un mensaje de error
        }
    }

    // Configuramos los eventos para manejar los cambios de estado de los pacientes
    setupEventListeners() {
        // Evento para cuando un paciente es atendido
        this.shadowRoot.addEventListener('patient-attended', (event) => {
            const patientId = event.detail.id; // Obtenemos el ID del paciente
            const patientIndex = this.pendingPatients.findIndex(p => p.id.toString() === patientId);

            if (patientIndex !== -1) {
                const attendedPatient = this.pendingPatients.splice(patientIndex, 1)[0]; // Lo quitamos de pendientes
                this.attendedPatients.push(attendedPatient); // Lo agregamos a atendidos
                this.render(); // Redibujamos la lista
            }
        });

        // Evento para cuando un paciente vuelve a estar pendiente
        this.shadowRoot.addEventListener('patient-not-attended', (event) => {
            const patientId = event.detail.id; // Obtenemos el ID del paciente
            const patientIndex = this.attendedPatients.findIndex(p => p.id.toString() === patientId);

            if (patientIndex !== -1) {
                const pendingPatient = this.attendedPatients.splice(patientIndex, 1)[0]; // Lo quitamos de atendidos
                this.pendingPatients.push(pendingPatient); // Lo agregamos a pendientes
                this.render(); // Redibujamos la lista
            }
        });
    }

    // Mostramos un mensaje de error si no se pueden cargar los datos
    renderError(error) {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                .error {
                    color: red;
                    padding: 20px;
                    text-align: center;
                }
            </style>
            <div class="error">
                <h2>Error al cargar los pacientes</h2>
                <p>${error.message}</p>
            </div>
        `;
    }

    // Dibujamos la lista de pacientes según la vista actual
    render() {
        if (!this.shadowRoot) return;

        // Filtramos los pacientes según la vista actual
        let displayPatients = this.patients;
        if (this.currentView === 'pending') {
            displayPatients = this.pendingPatients;
        } else if (this.currentView === 'attended') {
            displayPatients = this.attendedPatients;
        }

        // Dibujamos el contenido
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                }
                .lists-container {
                    display: flex;
                    justify-content: space-between;
                }
                .list {
                    width: 100%;
                    border: 1px solid #ddd;
                    padding: 10px;
                    border-radius: 8px;
                }
                h2 {
                    text-align: center;
                    color: #333;
                }
                .patients-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 10px;
                }
            </style>
            <div class="lists-container">
                <div class="list">
                    <h2>${this.getCurrentViewTitle()} (${displayPatients.length})</h2>
                    <div class="patients-grid">
                        ${displayPatients.map(patient => `
                            <patient-card 
                                id="${patient.id}"
                                name="${patient.nombre}"
                                email="${patient.email}"
                                phone="${patient.telefono}"
                                address="${patient.direccion}"
                                status="${this.currentView === 'attended' ? 'attended' : 'pending'}"
                            ></patient-card>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Obtenemos el título de la vista actual
    getCurrentViewTitle() {
        switch (this.currentView) {
            case 'pending': return 'Pacientes Pendientes';
            case 'attended': return 'Pacientes Atendidos';
            default: return 'Todos los Pacientes';
        }
    }
}

// Registramos el componente personalizado con el nombre 'patient-list'
customElements.define('patient-list', PatientList);