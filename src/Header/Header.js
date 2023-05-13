import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Header.css'
import LOGO from '../IramLogo.png'



const Header = ({user, cart, setUser, setOpen}) => {

    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem('user')) {
            setUser(null);
        }
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('user');
        setUser(null);

        navigate('/');
    };



    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img  src={LOGO} alt="Iram Cafe" />
                </Link>
            </div>
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/menu" className="nav__link">
                            Меню
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/about" className="nav__link">
                            О нас
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/contacts" className="nav__link">
                            Контакты
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="user-nav">
                {user ? (
                    <ul className="user-nav__list">
                        <li className="user-nav__item">
                            {user.role === 'admin' ? (
                                <Link to="/admin" className="user-nav__link">
                                    Админ панель
                                </Link>
                            ) : (
                                <Link to="/account" className="user-nav__link">
                                    {user.username}
                                </Link>
                            )}
                        </li>
                        <li className="user-nav__item">
                            <button onClick={handleLogout} className="user-nav__button">
                                Выйти
                            </button>
                        </li>
                        <li className="user-nav__item">
                            <button onClick={setOpen} className="user-nav__button">
                                Корзина ({cart.reduce((acc,rec)=>acc+rec.count,0)})
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="user-nav__list">
                        <li className="user-nav__item">
                            <Link to="/login" className="user-nav__link">
                                Вход
                            </Link>
                        </li>
                        <li className="user-nav__item">
                            <Link to="/register" className="user-nav__link">
                                Регистрация
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Header;
