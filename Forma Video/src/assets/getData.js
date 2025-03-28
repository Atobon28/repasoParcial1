// Exporta una función llamada getFortniteListByEpisode que obtiene una lista de elementos de Fortnite filtrados por capítulo.
export const getFortniteListByEpisode = async (chapter) => {
    try {
        // Realiza una solicitud para obtener el archivo JSON que contiene los datos de Fortnite.
        const response = await fetch('../../fortnite.json');
        
        // Verifica si la respuesta de la red es válida.
        if (!response.ok) {
            // Si no es válida, lanza un error con un mensaje.
            throw new Error('Network response was not ok');
        }

        // Convierte la respuesta en un objeto JSON para poder trabajar con los datos.
        const data = await response.json();
        
        // Filtra los datos para devolver solo los elementos que pertenecen al capítulo especificado.
        return data.data.br.filter(item => 
            item.introduction && // Verifica que el elemento tenga una propiedad 'introduction'.
            item.introduction.chapter === chapter // Compara el capítulo del elemento con el capítulo proporcionado.
        );
    } catch (error) {
        // Si ocurre un error durante la solicitud o el procesamiento, lo muestra en la consola.
        console.error('Error fetching Fortnite data:', error);
        
        // Devuelve un arreglo vacío como valor predeterminado en caso de error.
        return [];
    }
};