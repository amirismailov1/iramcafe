import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css'; // Импортируем CSS

const Checkout = ({user, cart, setCart}) => {
    const [name, setName] = useState(user.username);
    const [phone, setPhone] = useState(user.number);
    const [address, setAddress] = useState(user.address);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const order = {
            name,
            phone,
            address,
            items: cart
        };

        setCart([]);

        try {
            await axios.post('http://localhost:3001/orders', order);
            navigate('/');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="checkout-container">
            <h1>Оформить заказ</h1>
            <form onSubmit={handleSubmit} className="checkout-form">
                <label>
                    Имя:
                    <input type="text" defaultValue={user.username} onChange={e => setName(e.target.value)} required />
                </label>
                <label>
                    Телефон:
                    <input type="text" defaultValue={user.number} onChange={e => setPhone(e.target.value)} required />
                </label>
                <label>
                    Адрес:
                    <input type="text" defaultValue={user.adress} onChange={e => setAddress(e.target.value)} required />
                </label>
                <button type="submit">Подтвкрдить</button>
            </form>

        </div>
    );
};

export default Checkout;
