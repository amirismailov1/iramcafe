import { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);
        axios.post('http://localhost:3001/login', formData)
            .then(({data}) => {
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.redirect) {
                    window.location.href = data.redirect;
                }

            })
            .catch((err) => console.log('Проверьте правильность введённых данных'))
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={styles.loginFormInput}

                placeholder="Имя пользователя"
            />
            <input
                type="password"
                name="password"
                className={styles.loginFormInput}

                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
            />
            <button className={styles.loginFormButton} type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
