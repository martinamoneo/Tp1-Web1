// hook para evitar parpadeos de Skeletons/Loaders en cargas muy rápidas.
import { useState, useEffect } from 'react';

// isLoading: estado de carga original
// delay: milisegundos de espera antes de mostrar el skeleton (default 200ms)
const useDelayedLoading = (isLoading, delay = 200) => {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        let timeout; //guarda el tiempo q esperamos para mostrar el skeleton
        
        if (isLoading) {
            // si esta cargando, esperamos el delay antes de mostrar el skeleton
            timeout = setTimeout(() => {
                setShowLoading(true);
            }, delay);
        } else {
            // Si dejó de cargar, lo ocultamos inmediatamente
            setShowLoading(false);
        }

        return () => {
            if (timeout) { // si ya no carga mas, se elimina el tiempo de espera y no se muestra el skeleton
                clearTimeout(timeout);
            }
        };
    }, [isLoading, delay]);

    return showLoading;
};

export default useDelayedLoading;
