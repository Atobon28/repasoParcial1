import './publication.js'; // Importa el componente de publicación

class LuladaReviewsContainer extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement)
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y la estructura

        // Define el HTML y los estilos del componente
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; /* Hace que el componente se comporte como un bloque */
                    max-width: 600px; /* Ancho máximo del contenedor */
                }
            </style>
            
            <!-- Publicación 1 -->
            <lulada-publication 
                username="CrisTiJauregui" 
                text="El coctel de hierva buena en @BarBurguer esta super delicioso para los amantes como yo de los sabores frescos, costo 20.000 y lo recomiendo 100%" 
                stars="5" 
                profile-pic="https://via.placeholder.com/48"
            ></lulada-publication>
            
            <!-- Publicación 2 -->
            <lulada-publication 
                username="DanaBanana" 
                text="Este @AsianRooftop es terrible! No le quito todas las estrellas porque la mesera era super atenta, el problema es que una margarita y el licor me dijeron que venia aparte, como es posible???? De nunca volver." 
                image="https://via.placeholder.com/600x400" 
                stars="1" 
                profile-pic="https://via.placeholder.com/48"
            ></lulada-publication>
        `;
    }
}

// Registra el componente personalizado
customElements.define('lulada-reviews-container', LuladaReviewsContainer);

// Exporta el componente para usarlo en otros archivos
export default LuladaReviewsContainer;