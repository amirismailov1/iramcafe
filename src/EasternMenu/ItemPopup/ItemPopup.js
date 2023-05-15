import React from 'react';
import './ItemPopup.css';

const ItemPopup = ({ item, closePopup }) => {
    return (
        <div className="item-popup-overlay" onClick={closePopup}>
            ArMode
        </div>
    );
};

export default ItemPopup;
