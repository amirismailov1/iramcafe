import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';



const AdminPanel = ({menuItems,setMenuItems}) => {

    const [selectedItem, setSelectedItem] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null)
    const [orders,setOrders] = useState([]);




    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        model_3d: ''
    });
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(true);
    const toggleOrderStatus = async (id, status) => {
        const newStatus = status === 'Новый' ? 'Готов' : 'Новый';
        await axios.put(`/orders/${id}`, { status: newStatus });
        axios.get('http://localhost:3001/orders')
            .then(res=>setOrders([...orders,res.data]))
            .catch(err=>console.error('Error fetching orders:',err))

    };
    useEffect(()=>{
        axios.get('http://localhost:3001/orders')
            .then(res=>{
                if (res.data) {
                    setOrders([...orders,...res.data]);
                }
            })
            .catch(err=>console.error('Error fetching orders:',err))
    },[]);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role === 'admin') {
                setUser(parsedUser);
            } else {
                window.location.href = '/';
            }
        } else {
            window.location.href = '/';
        }
    }, []);
    const fetchMenuItems =  () => {
        axios.get('http://localhost:3001/menu')
            .then(response => setMenuItems(response.data))
            .catch(error => console.error('Error fetching menu items:', error));
    };



    const handleCancelEdit = () => {
        setSelectedItem(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            image: '',
            model_3d: ''
        });
    };








    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItem) {
            axios.put(`/menu/${selectedItem}`, formData);
        } else {
            axios.post('/menu', formData);
        }
        fetchMenuItems();
        setSelectedItem(null);
        setSelectedFile(null);
        setSelectedFile2(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            image: '',
            model_3d: ''
        });
    };


    const handleDelete = async (id) => {
        await axios.delete(`/menu/${id}`);
        fetchMenuItems();
    };

    const handleEdit = (item) => {
        setSelectedItem(item.id);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            model_3d: item.model_3d
        });
    };

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };




    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const onFileChange2 = (event) => {
        setSelectedFile2(event.target.files[0]);
    };



    const onFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile || !selectedFile2) {
            console.error("One or both files not selected");
            return;
        }

        const formData = new FormData();
        formData.append("file1", selectedFile);
        formData.append("file2", selectedFile2);

        try {
            const response = await axios.post("/upload", formData);
            setFormData({
                ...formData,
                image: response.data.path1,
                model_3d: response.data.path2
            });
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <div className='admin-panel'>
            <h2 className="admin-panel-heading">Admin Panel</h2>
            {user && <p className='admin-panel-welcome'>Добро пожаловать, {user.username}!</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    name="model_3d"
                    value={formData.model_3d}
                    onChange={handleChange}
                    placeholder="3D Model URL"
                />

                <input
                    type="file"
                    onChange={onFileChange}
                />


                <input
                    type="file"
                    onChange={onFileChange2}
                />
                <button type="button" onClick={onFileUpload}>
                    Загрузить
                </button>





                <button type="submit">{selectedItem ? 'Update' : 'Add'} Menu Item</button>
            </form>
            <button onClick={toggleMenu}>{showMenu ? 'Показать заказы' : 'Показать меню'}</button>
            {showMenu ? (
                <ul className="menu-items">
                    {menuItems.map(item => (
                        <li className="menu-item" key={item.id}>
                            <div className="item-details">
                                <img src={item.image} alt={item.name} />
                                <h2>{item.name}</h2>
                                <span className="price">{item.price}</span>
                            </div>
                            <button onClick={() => handleEdit(item)}>Изменить</button>
                            <button onClick={() => handleDelete(item.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="order-items">
                    {orders.map(order => (
                        <li className='order-item' key={order.id}>
                            <h2 className="order-text">{order.name}</h2>
                            <p className='order-text'>{order.phone}</p>
                            {
                                order.items && JSON.parse(order.items).map(item => (
                                    <div className="item-details">
                                        <h2>{item.name}</h2>
                                        <p>{item.count}</p>
                                        <span className="price">{item.price}</span>
                                    </div>
                                ))
                            }
                            <p className='order-text' onClick={() => toggleOrderStatus(order.id, order.status)}>Статус заказа: {order.status}</p>
                            <p className='order-text'>Общая сумма: {order.items && JSON.parse(order.items).reduce((acc, item) => acc + (item.price * item.count), 0)} руб</p>
                        </li>
                    ))}


                </ul>
            )}
            {selectedItem && (
                <button onClick={handleCancelEdit}>Отменить редактирование</button>
            )}

        </div>
    );
};

export default AdminPanel;