// Creamos una clase llamada Card para manejar las tarjetas
class Card {
    constructor(data) {
        // Guardamos los datos del ítem que nos pasan al crear la tarjeta
        this.data = data;
    }

    // Este método crea el elemento HTML de la tarjeta
    createCardElement() {
        // Creamos un contenedor para la tarjeta
        const card = document.createElement('div');
        card.classList.add('card'); // Le damos una clase CSS para poder estilizarla

        // Aquí ponemos el contenido de la tarjeta usando los datos que tenemos
        card.innerHTML = `
            <h2>${this.data.name}</h2> <!-- Mostramos el nombre del ítem -->
            <img src="${this.data.images.icon}" alt="${this.data.name}"> <!-- Mostramos la imagen del ítem -->
            <p>ID: ${this.data.id}</p> <!-- Mostramos el ID del ítem -->
            <p>Description: ${this.data.description || 'No description available'}</p> <!-- Mostramos la descripción o un mensaje si no hay -->
            <p>Type: ${this.data.type.displayValue}</p> <!-- Mostramos el tipo del ítem -->
            <p>Rarity: ${this.data.rarity.displayValue}</p> <!-- Mostramos la rareza del ítem -->
            <p>Set: ${this.data.set?.value || 'No Set'}</p> <!-- Mostramos el set o un mensaje si no tiene -->
            <p>Chapter: ${this.data.introduction.chapter}</p> <!-- Mostramos el capítulo al que pertenece -->
            <p>Season: ${this.data.introduction.season}</p> <!-- Mostramos la temporada al que pertenece -->
        `;

        // Devolvemos el elemento HTML de la tarjeta para que se pueda usar en la página
        return card;
    }
}

// Exportamos la clase para que se pueda usar en otros archivos
export default Card;