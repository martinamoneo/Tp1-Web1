/**
 * Utilidades para formatear textos y datos en la interfaz
 */

export const formatCategory = (categoria) => {
    if (!categoria) return '';
    
    // Limpiamos la categoría base
    let cat = categoria.toLowerCase().replace(/colecci[oó]n/gi, '').trim();
    
    // Diccionario de categorías conocidas para agregar tildes y eñes correctamente
    const dictionary = {
        'lamparas': 'Lámparas',
        'lampara': 'Lámparas',
        'llaveros': 'Llaveros',
        'llavero': 'Llaveros',
        'mates': 'Mates',
        'mate': 'Mates',
        'munecos': 'Muñecos',
        'muñecos': 'Muñecos',
        'muñeco': 'Muñecos',
        'muneco': 'Muñecos',
        'soportes': 'Soportes',
        'soporte': 'Soportes',
        'vasos': 'Vasos',
        'vaso': 'Vasos',
        'premios': 'Premios',
        'premio': 'Premios',
        'otros': 'Otros',
        'otro': 'Otros'
    };
    
    // Si está en el diccionario, la devolvemos bonita. Si no, capitalizamos la primera letra.
    return dictionary[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1));
};
