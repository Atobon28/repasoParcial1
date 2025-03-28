// Creamos un componente personalizado para mostrar información de un paciente
export default class PatientCard extends HTMLElement {
    constructor() {
        super(); // Llamamos al constructor de HTMLElement
        this.attachShadow({ mode: 'open' }); // Creamos un "shadow DOM" para encapsular el contenido y estilo
    }

    // Atributos que queremos observar (los datos que puede recibir el componente)
    static get observedAttributes() {
        return ['name', 'email', 'phone', 'address', 'status', 'id'];
    }

    // Este método se ejecuta cuando el componente se agrega al DOM
    connectedCallback() {
        this.render(); // Dibujamos el contenido del componente
        this.setupEventListeners(); // Configuramos los eventos de los botones
    }

    // Configuramos los eventos de los botones
    setupEventListeners() {
        // Obtenemos los botones del shadow DOM
        const attendBtn = this.shadowRoot.getElementById('attend-btn');
        const notAttendBtn = this.shadowRoot.getElementById('not-attend-btn');

        // Si se hace clic en "Atender Paciente", enviamos un evento
        if (attendBtn) {
            attendBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('patient-attended', {
                    bubbles: true, // El evento puede propagarse
                    detail: { 
                        id: this.getAttribute('id'), // Enviamos el ID del paciente
                        name: this.getAttribute('name') // Enviamos el nombre del paciente
                    }
                }));
            });
        }

        // Si se hace clic en "No Atender", enviamos otro evento
        if (notAttendBtn) {
            notAttendBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('patient-not-attended', {
                    bubbles: true, // El evento puede propagarse
                    detail: { 
                        id: this.getAttribute('id'), // Enviamos el ID del paciente
                        name: this.getAttribute('name') // Enviamos el nombre del paciente
                    }
                }));
            });
        }
    }

    // Dibujamos el contenido del componente
    render() {
        // Obtenemos los datos del paciente desde los atributos
        const name = this.getAttribute('name') || 'Paciente Desconocido';
        const email = this.getAttribute('email') || 'No disponible';
        const phone = this.getAttribute('phone') || 'No disponible';
        const address = this.getAttribute('address') || 'No disponible';
        const status = this.getAttribute('status') || 'pendiente';

        // Definimos el HTML y CSS del componente
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 10px 0;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: ${status === 'pendiente' ? '#f0f0f0' : '#e6f3e6'}; /* Color según el estado */
                }
                .patient-info {
                    margin-bottom: 10px;
                }
                .actions {
                    display: flex;
                    gap: 10px; /* Espacio entre botones */
                }
                button {
                    flex-grow: 1; /* Los botones ocupan el mismo espacio */
                    padding: 8px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9em;
                }
                #attend-btn {
                    background-color: #4CAF50; /* Verde para "Atender" */
                    color: white;
                }
                #not-attend-btn {
                    background-color: #f44336; /* Rojo para "No Atender" */
                    color: white;
                }
            </style>
            <div class="patient-info">
                <strong>Nombre:</strong> ${name}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Teléfono:</strong> ${phone}<br>
                <strong>Dirección:</strong> ${address}
            </div>
            <div class="actions">
                <button id="attend-btn">Atender Paciente</button>
                <button id="not-attend-btn">No Atender</button>
            </div>
        `;
    }
}

// Registramos el componente personalizado con el nombre 'patient-card'
customElements.define('patient-card', PatientCard);