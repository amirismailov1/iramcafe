import React from 'react';
import styles from './cart.module.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';


const Cart = ({ user, cart, setCart, addToCart, open, setOpen, removeFromCart, deleteFromCart }) => {
    const close = (e) => {
        if (e.target.className === styles.overlay) {
            setOpen(false);
        }
    };

    const navigate = useNavigate();

    return (
        <div onClick={close} className={styles.overlay} style={{transform:open?'translateX(0)':''}}>
            <div className={styles.cart}>
                {
                    cart.length
                        ? <>
                            <div className={styles.cartContent}>
                                <div className={styles.cartTop}>
                                    <h2 className={styles.cartTitle}>Корзина</h2>
                                    <p onClick={()=>setCart([])} className={styles.cartClear}>Очистить корзину</p>
                                </div>
                                <ul className={styles.list}>
                                    {cart &&  cart.map((el) => (
                                        <li key={el.id} className={styles.item}>
                                            <img className={styles.itemImg} src={el.image} alt=""/>
                                            <div className={styles.itemCenter}>
                                                <h4 className={styles.itemTitle}>{el.title}</h4>
                                                <p className={styles.itemPrice}>{el.price * el.count} руб.</p>
                                                <div className={styles.itemCount}>
                                                    <button className={styles.itemCountBtn} type='button' onClick={()=>removeFromCart( el.title)}>-</button>
                                                    <span> {el.count} </span>
                                                        <button className={styles.itemCountBtn} type='button' onClick={()=>addToCart(el)}>+</button>
                                                </div>
                                            </div>
                                            <button className={styles.itemBtn} onClick={()=>deleteFromCart(el.id)} >
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z"
                                                        fill="#B5B5B5"/>
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.cartFooter}>
                                <div className={styles.cartFooterItem}>
                                    <p className={styles.cartFooterTitle}>Итого </p>
                                    <div className={styles.cartFooterLine}/>
                                    <p className={styles.itemPrice}>{cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0)} руб. </p>
                                </div>

                                <button type='button' className={styles.cartFooterBtn} onClick={() => {
                                    if (user.email.length){
                                        setOpen(false);
                                        navigate('/orders')}
                                    else{
                                        alert('Войдите в аккаунт');
                                        setOpen(false);
                                        navigate('/register')
                                    }


                                }}>Оформить заказ
                                </button>

                            </div>
                        </>
                        : <div className={styles.empty}>
                            <img className={styles.emptyImg} src={''} alt=""/>
                            <h4 className={styles.emptyTitle}>Ой, пусто!</h4>
                            <p className={styles.emptySubtitle}>Ваша корзина пуста, откройте «Меню»  <br/>
                                и выберите понравившийся товар.</p>
                            <button type='button' onClick={()=>setOpen(false)} className={styles.emptyBtn}>Вернуться в меню</button>
                        </div>
                }

                <button className={styles.btnClose} type="button" onClick={()=>setOpen(false)}><AiOutlineClose className={styles.close}/></button>
            </div>

        </div>
    );
};

export default Cart;

