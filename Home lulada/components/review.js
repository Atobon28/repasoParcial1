class LuladaReview extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement)
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y la estructura
    }

    connectedCallback() {
        // Obtiene los atributos del componente o usa valores por defecto
        const username = this.getAttribute('username') || ''; // Nombre de usuario
        const text = this.getAttribute('text') || ''; // Texto de la reseña
        const stars = parseInt(this.getAttribute('stars') || '0'); // Número de estrellas

        // Define el HTML y los estilos del componente
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; /* Hace que el componente se comporte como un bloque */
                    margin-bottom: 10px; /* Espaciado inferior */
                }
                .review {
                    border: 1px solid #ddd; /* Borde gris claro */
                    border-radius: 8px; /* Bordes redondeados */
                    padding: 10px; /* Espaciado interno */
                }
                .review-header {
                    display: flex; /* Organiza los elementos en fila */
                    justify-content: space-between; /* Espacia los elementos horizontalmente */
                    align-items: center; /* Alinea los elementos verticalmente */
                }
                .stars {
                    color: gold; /* Color dorado para las estrellas */
                }
            </style>
            <div class="review">
                <!-- Encabezado de la reseña con el nombre de usuario y las estrellas -->
                <div class="review-header">
                    <strong>@${username}</strong> <!-- Muestra el nombre de usuario -->
                    <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</div> <!-- Estrellas llenas y vacías -->
                </div>
                <!-- Texto de la reseña -->
                <p>${text}</p>
            </div>
        `;
    }
}

// Registra el componente personalizado
customElements.define('lulada-review', LuladaReview);

// Exporta el componente para usarlo en otros archivos
export default LuladaReview;