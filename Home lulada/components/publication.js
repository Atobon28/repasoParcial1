class LuladaPublication extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre (HTMLElement)
        this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular el estilo y la estructura
    }

    connectedCallback() {
        // Obtiene los atributos del componente o usa valores por defecto
        const username = this.getAttribute('username') || ''; // Nombre de usuario
        const text = this.getAttribute('text') || ''; // Texto de la publicación
        const image = this.getAttribute('image') || ''; // Imagen de la publicación
        const stars = parseInt(this.getAttribute('stars') || '0'); // Número de estrellas
        const profilePic = this.getAttribute('profile-pic') || ''; // Imagen de perfil

        // Define el HTML y los estilos del componente
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; /* Hace que el componente se comporte como un bloque */
                    background-color: white; /* Fondo blanco */
                    border-radius: 12px; /* Bordes redondeados */
                    border: 1px solid #e0e0e0; /* Borde gris claro */
                    margin-bottom: 16px; /* Espaciado inferior */
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05); /* Sombra ligera */
                }
                .publication-container {
                    padding: 16px; /* Espaciado interno */
                }
                .header {
                    display: flex; /* Organiza los elementos en fila */
                    align-items: center; /* Alinea verticalmente */
                    margin-bottom: 12px; /* Espaciado inferior */
                }
                .profile-pic {
                    width: 48px; /* Ancho de la imagen de perfil */
                    height: 48px; /* Alto de la imagen de perfil */
                    border-radius: 50%; /* Hace la imagen circular */
                    margin-right: 12px; /* Espaciado a la derecha */
                    object-fit: cover; /* Ajusta la imagen al contenedor */
                }
                .username {
                    font-weight: bold; /* Texto en negrita */
                }
                .publication-text {
                    margin-bottom: 12px; /* Espaciado inferior */
                }
                .publication-image {
                    width: 100%; /* Ocupa todo el ancho disponible */
                    border-radius: 8px; /* Bordes redondeados */
                    margin-bottom: 12px; /* Espaciado inferior */
                    max-height: 400px; /* Altura máxima */
                    object-fit: cover; /* Ajusta la imagen al contenedor */
                }
                .footer {
                    display: flex; /* Organiza los elementos en fila */
                    justify-content: space-between; /* Espacia los elementos */
                    align-items: center; /* Alinea verticalmente */
                }
                .stars {
                    color: #FFD700; /* Color dorado para las estrellas */
                }
                .actions {
                    display: flex; /* Organiza los íconos en fila */
                    align-items: center; /* Alinea verticalmente */
                }
                .action-icon {
                    margin-left: 12px; /* Espaciado entre íconos */
                    cursor: pointer; /* Cambia el cursor al pasar el mouse */
                }
                .location-icon, .bookmark-icon {
                    color: #888; /* Color gris para los íconos */
                }
                .like-icon {
                    color: ${this.liked ? 'red' : '#888'}; /* Cambia el color si está marcado como "me gusta" */
                }
            </style>
            
            <div class="publication-container">
                <!-- Encabezado con la imagen de perfil y el nombre de usuario -->
                <div class="header">
                    <img 
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                        alt="${username}" 
                        class="profile-pic"
                    >
                    <div class="username">@${username}</div>
                </div>
                
                <!-- Imagen de la publicación (si existe) -->
                ${image ? `
                    <img 
                        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/50/d1/1d/vive-una-experiencia.jpg?w=600&h=-1&s=1" 
                        alt="Publication image" 
                        class="publication-image"
                    >
                ` : ''}
                
                <!-- Texto de la publicación -->
                <div class="publication-text">
                    ${text}
                </div>
                
                <!-- Pie de la publicación con estrellas e íconos -->
                <div class="footer">
                    <div class="stars">
                        ${'★'.repeat(stars)}${'☆'.repeat(5-stars)} <!-- Muestra estrellas llenas y vacías -->
                    </div>
                    <div class="actions">
                        <!-- Ícono de ubicación -->
                        <svg class="action-icon location-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <!-- Ícono de "me gusta" -->
                        <svg class="action-icon like-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <!-- Ícono de marcador -->
                        <svg class="action-icon bookmark-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        `;

        // Lógica para el botón de "me gusta"
        const likeIcon = this.shadowRoot.querySelector('.like-icon');
        this.liked = false; // Estado inicial
        likeIcon.addEventListener('click', () => {
            this.liked = !this.liked; // Cambia el estado
            likeIcon.style.color = this.liked ? 'red' : '#888'; // Cambia el color del ícono
        });
    }
}

// Registra el componente personalizado
customElements.define('lulada-publication', LuladaPublication);

// Exporta el componente para usarlo en otros archivos
export default LuladaPublication;