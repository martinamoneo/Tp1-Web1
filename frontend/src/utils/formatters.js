// formatea las categorias para que se vean bonitas en la interfaz

export const formatCategory = (categoria) => {
    if (!categoria) return '';
    
    let cat = categoria.toLowerCase().trim();
    
    // Diccionario de categorías conocidas para agregar tildes y eñes
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
