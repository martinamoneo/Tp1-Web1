import React from 'react';

const Icon = ({ name, type = 'solid', className = '', ...props }) => {
    return (
        <i className={`fa-${type} fa-${name} ${className}`.trim()} {...props}></i>
    );
};

export default Icon;
