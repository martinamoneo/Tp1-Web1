// formatea las categorias para que se vean bonitas en la interfaz

export const formatCategory = (categoria) => {
    if (!categoria) return '';
    
    let cat = categoria.toLowerCase().trim();
    
    // Diccionario de categorías principales en plural
    const dictionary = {
        'lamparas': 'Lámparas',
        'llaveros': 'Llaveros',
        'mates': 'Mates',
        'munecos': 'Muñecos',
        'soportes': 'Soportes',
        'vasos': 'Vasos',
        'premios': 'Premios',
        'otros': 'Otros'
    };
    
    // Si está en el diccionario, la devolvemos bonita. Si no, capitalizamos la primera letra.
    return dictionary[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1));
};

// extrae el nombre del usuario desde el email guardado en localStorage
export const getUserName = (user) => {
    if (!user?.email) return 'Administrador';
    const name = user.email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
};
