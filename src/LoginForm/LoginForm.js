import { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button type="submit">Log in</button>
        </form>
    );
};

export default LoginForm;
