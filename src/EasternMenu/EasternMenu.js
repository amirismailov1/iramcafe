import React, { useEffect, useState } from 'react';
import './EasternMenu.css';
import axios from "axios";
import ItemPopup from './ItemPopup/ItemPopup';

const EasternMenu = ({ cart, addToCart, removeFromCart }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/menu')
            .then(response => setMenuItems(response.data))
            .catch(error => console.error('Error fetching menu items:', error));
    }, []);

    const openPopup = (item) => {
        setSelectedItem(item);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="eastern-menu">
            <h1>Восточное меню</h1>
            <ul className="menu-items">
                {menuItems.map(item => {
                    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
                    const itemCount = cartItem ? cartItem.count : 0;
                    return (
                        <li key={item.id} className="menu-item">
                            <div className="item-details">
                                <img src={item.image} alt={item.name} onClick={() => openPopup(item)} />
                                <h2>{item.name}</h2>
                                <p>{item.description.slice(0, 56) + '...'}</p>
                                <span className="price">{item.price} руб</span>
                            </div>
                            {itemCount === 0 ? (
                                <button className="menu-itemBtn" onClick={() => addToCart(item)}>
                                    Добавить в корзину
                                </button>
                            ) : (
                                <div className="menu-itemBtn-group">
                                    <button className="menu-itemBtn" onClick={() => removeFromCart(item.title)}>
                                        -
                                    </button>
                                    <span className="item-count">{itemCount}</span>
                                    <button className="menu-itemBtn" onClick={() => addToCart(item)}>
                                        +
                                    </button>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            {showPopup && <ItemPopup item={selectedItem} closePopup={closePopup} />}
        </div>
    );
};

export default EasternMenu;
