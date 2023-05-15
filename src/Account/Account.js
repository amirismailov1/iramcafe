import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'
import axios from 'axios';

const Account = ({ user, setUser }) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [number, setNumber] = useState(user.number);

    const [address, setAddress] = useState(user.address);
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(user.username);
        setPassword(user.password);
        setNumber(user.number);
        setAddress(user.address);
    }, [user]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = {
            ...user,
            username,
            password,
            number,
            address
        };

        try {
            await axios.post('http://localhost:3001/update', updatedUser);
            setUser(updatedUser);
            navigate('/account');
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    return (
        <div className='account-container'>
            <h2 className='account-title'>Личный кабинет</h2>
            <form className='account-form' onSubmit={handleSubmit}>
                <label>
                    Имя:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label>
                    Пароль:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <label>
                    Телефон:
                    <input type="text" value={number} onChange={e => setNumber(e.target.value)} required />
                </label>
                <label>
                    Адрес:
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
                </label>
                <button type="submit">Обновить информацию</button>
            </form>
        </div>
    );
};

export default Account;
