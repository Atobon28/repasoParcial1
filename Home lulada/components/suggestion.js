class LuladaSuggestions extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement)
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y la estructura

        // Define el HTML y los estilos del componente
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 300px; /* Ancho fijo del contenedor */
                    background-color: white; /* Fondo blanco */
                    border-left: 1px solid #e0e0e0; /* Borde izquierdo gris claro */
                    padding: 20px; /* Espaciado interno */
                }
                .suggestions-title {
                    font-size: 18px; /* Tamaño de fuente del título */
                    font-weight: bold; /* Texto en negrita */
                    margin-bottom: 20px; /* Espaciado inferior */
                }
                .suggestion-item {
                    display: flex; /* Organiza los elementos en fila */
                    align-items: center; /* Alinea los elementos verticalmente */
                    margin-bottom: 15px; /* Espaciado inferior */
                    cursor: pointer; /* Cambia el cursor al pasar el mouse */
                }
                .suggestion-image {
                    width: 50px; /* Ancho de la imagen */
                    height: 50px; /* Alto de la imagen */
                    border-radius: 8px; /* Bordes redondeados */
                    margin-right: 15px; /* Espaciado a la derecha */
                    object-fit: cover; /* Ajusta la imagen al contenedor */
                }
                .suggestion-details {
                    flex-grow: 1; /* Ocupa el espacio restante */
                }
                .suggestion-name {
                    font-weight: bold; /* Texto en negrita */
                }
                .suggestion-view {
                    color: #007bff; /* Color azul para el texto */
                    font-weight: bold; /* Texto en negrita */
                }
            </style>
            
            <!-- Título de la sección -->
            <div class="suggestions-title">Sugerencias</div>
            
            <!-- Lista de sugerencias -->
            <div class="suggestions-list">
                <!-- Sugerencia 1 -->
                <div class="suggestion-item">
                    <img src="https://marketplace.canva.com/EAFpeiTrl4c/2/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-a1RYzvS1EFo.jpg" class="suggestion-image" alt="BarBurguer">
                    <div class="suggestion-details">
                        <div class="suggestion-name">BarBurguer</div>
                    </div>
                    <div class="suggestion-view">Ver</div>
                </div>
                <!-- Sugerencia 2 -->
                <div class="suggestion-item">
                    <img src="https://img.pikbest.com/png-images/20241030/culinary-restaurant-logo-design_11027332.png!sw800" class="suggestion-image" alt="Frenchrico">
                    <div class="suggestion-details">
                        <div class="suggestion-name">Frenchrico</div>
                    </div>
                    <div class="suggestion-view">Ver</div>
                </div>
                <!-- Sugerencia 3 -->
                <div class="suggestion-item">
                    <img src="https://justcreative.com/wp-content/uploads/2023/02/Restaurant-Logo-Templates.png.webp" class="suggestion-image" alt="NoMames!">
                    <div class="suggestion-details">
                        <div class="suggestion-name">NoMames!</div>
                    </div>
                    <div class="suggestion-view">Ver</div>
                </div>
                <!-- Sugerencia 4 -->
                <div class="suggestion-item">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/chef-logo%2Ccooking-logo%2Crestaurant-logo-design-template-8048c6b88c3702da6e0804bc38ce7f33_screen.jpg?ts=1672750337" class="suggestion-image" alt="LaCocina">
                    <div class="suggestion-details">
                        <div class="suggestion-name">LaCocina</div>
                    </div>
                    <div class="suggestion-view">Ver</div>
                </div>
            </div>
        `;
    }
}

// Registra el componente personalizado
customElements.define('lulada-suggestions', LuladaSuggestions);

// Exporta el componente para usarlo en otros archivos
export default LuladaSuggestions;