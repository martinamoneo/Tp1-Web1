import { useState, useEffect } from 'react';

/**
 * Hook para evitar parpadeos de Skeletons/Loaders en cargas muy rápidas.
 * @param {boolean} isLoading - Estado de carga original
 * @param {number} delay - Milisegundos de espera antes de mostrar el skeleton (default 200ms)
 * @returns {boolean} - Estado de carga diferido
 */
const useDelayedLoading = (isLoading, delay = 200) => {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        let timeout;
        
        if (isLoading) {
            // Si está cargando, esperamos el delay antes de mostrar el loader
            timeout = setTimeout(() => {
                setShowLoading(true);
            }, delay);
        } else {
            // Si dejó de cargar, lo ocultamos inmediatamente
            setShowLoading(false);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [isLoading, delay]);

    return showLoading;
};

export default useDelayedLoading;
