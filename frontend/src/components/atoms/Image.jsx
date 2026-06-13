import React from 'react';

const Image = ({ src, alt, className = '', defaultImage = '/img/no-image.png', ...props }) => {
    return (
        <img 
            src={src || defaultImage} 
            alt={alt} 
            className={className}
            onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = defaultImage; 
            }}
            {...props}
        />
    );
};

export default Image;
