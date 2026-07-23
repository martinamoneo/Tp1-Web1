// formatea las categorias para que se vean bonitas en la interfaz

export const formatCategory = (categoria) => {
    if (!categoria) return '';
    
    let cat = categoria.toLowerCase().trim();
    
    // Retornamos la categoría con la primera letra en mayúscula (ya no usamos un diccionario hardcodeado)
    return cat.charAt(0).toUpperCase() + cat.slice(1);
};

// extrae el nombre del usuario desde el email guardado en localStorage
export const getUserName = (user) => {
    if (!user?.email) return 'Administrador';
    const name = user.email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
};

// crea un slug seguro para URLs (sin tildes, minúsculas, espacios por guiones)
export const createSlug = (text) => {
    if (!text) return '';
    return text.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
        .trim() // saca espacios en los bordes
        .replace(/\s+/g, '-') // cambia espacios por guiones
        .replace(/[^\w-]+/g, '') // quita caracteres extraños
        .replace(/--+/g, '-'); // evita guiones duplicados
};
