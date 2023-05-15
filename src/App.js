import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import EasternMenu from './EasternMenu/EasternMenu';
import AdminPanel from './AdminPanel/AdminPanel';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from "./RegisterForm/RegisterForm";
import Header from './Header/Header';
import Checkout from './Checkout/Checkout';
import Cart from './Cart/Cart';
import Account from "./Account/Account";
import './style.css'
import axios from "axios";

function App() {
    const [cart, setCart] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({ username: '' });
    const [menuItems, setMenuItems] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/menu')
            .then(response => setMenuItems(response.data))
            .catch(error => console.error('Error fetching menu items:', error));
    }, []);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);



    const addToCart = (item) => {
        const updatedCart =
            cart.findIndex((cartItem) => cartItem.id === item.id) > -1
                ? cart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, count: cartItem.count + 1 } : cartItem
                )
                : [...cart, { ...item, count: 1 }];

        setCart(updatedCart)
    };




    const removeFromCart = (title) => {
        const index = cart.findIndex((el) => el.title === title);
        if (index > -1 && cart[index].count > 1) {
            const newCart = [...cart];
            newCart[index] = { ...newCart[index], count: newCart[index].count - 1 };
            setCart(newCart);
        } else {
            setCart(cart.filter((item) => item.title !== title));
        }
    };

    const deleteFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    return (
        <div className="App">
            <Header user={user} cart={cart} setCart={setCart} setUser={setUser} setOpen={setOpen} />
            <Cart
                user={user}
                cart={cart}
                setCart={setCart}
                open={open}
                setOpen={setOpen}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                deleteFromCart={deleteFromCart}
            />
            <Routes>
                <Route path="/" element={<EasternMenu cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} menuItems={menuItems}  />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/account" element={<Account user={user} setUser={setUser} />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/admin" element={<AdminPanel menuItems={menuItems} setMenuItems={setMenuItems} /> } />
                <Route path="/checkout" element={<Checkout user={user} cart={cart} setCart={setCart} />} />
            </Routes>

        </div>
    );
}

export default App;