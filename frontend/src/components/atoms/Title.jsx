import React from 'react';

const Title = ({ level = 2, children, className = '', ...props }) => {
    const Tag = `h${level}`;
    
    return (
        <Tag className={className} {...props}>
            {children}
        </Tag>
    );
};

export default Title;
