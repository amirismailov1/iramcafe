import React from 'react';
import './ItemPopup.css';

const ItemPopup = ({ item, closePopup }) => {
    return (
        <div className="item-popup-overlay" onClick={closePopup}>
            <div className="item-popup" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closePopup}>×</button>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <span className="price">{item.price} руб</span>
            </div>
        </div>
    );
};

export default ItemPopup;
