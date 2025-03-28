class LuladaLogo extends HTMLElement {
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
                    text-align: left; /* Alinea el contenido a la izquierda */
                }

                /* Estilo de la imagen del logo */
                img {
                    max-width: 300px; /* Define el ancho máximo del logo */
                    height: auto; /* Mantiene la proporción de la imagen */
                }

                /* Estilo para mostrar errores */
                .error {
                    color: red; /* Texto en rojo */
                    background-color: #ffeeee; /* Fondo rosado claro */
                    padding: 10px; /* Espaciado interno */
                }
            </style>

            <!-- Imagen del logo -->
            <img 
                src="https://i.postimg.cc/xdhdVv5d/Recurso-5-ASCAAS.jpg" 
                alt="Lulada Logo" 
                onerror="this.onerror=null; this.classList.add('error'); this.innerHTML='Image Load Failed: ' + this.src"
                /* Si la imagen no se carga, muestra un mensaje de error */
            >
        `;
    }
}

// Registra el componente personalizado
customElements.define('lulada-logo', LuladaLogo);

// Exporta el componente para usarlo en otros archivos
export default LuladaLogo;