import React from 'react';

const Input = ({ type = 'text', id, value, onChange, className = '', placeholder, ...props }) => {
    return (
        <input 
            type={type} 
            id={id} 
            value={value} 
            onChange={onChange} 
            className={`custom-input ${className}`.trim()} 
            placeholder={placeholder}
            {...props} 
        />
    );
};

export default Input;
