import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        number: '',

        address: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        if (!formData.username || !formData.password || !formData.address || !formData.number) {
            setErrorMessage('Все строки должны быть заполнены!');
            return;
        }
        console.log('Submitting form data:', formData);
        axios.post('http://localhost:3001/register', formData)
            .then(({data}) => {
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.redirect) {
                    window.location.href = data.redirect;
                }
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('Ошибка регистрации');
                }
            })
    };

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Имя пользователя"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
            />
            <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Номер"

            />
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Адресс"
            />
            <button type="submit">Зарегестрироваться</button>
        </form>
    );
};

export default RegisterForm;
