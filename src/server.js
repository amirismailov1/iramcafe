const { Sequelize } = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
const sequelize = new Sequelize('iramcafe', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889
});


const User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    number:Sequelize.INTEGER,


    role: Sequelize.STRING,
    adress:Sequelize.STRING

}, {
    tableName: 'users',
    timestamps: false//
});





app.post('/register', async (req, res) => {
    const user = req.body;
    try {
        const existingUser = await User.findOne({ where: { username: user.username } });
        if (existingUser) {
            res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        } else {
            const newUser = await User.create(user);
            res.status(201).json({ user: newUser,redirect:'/' });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received credentials:', username, password);
    try {
        console.log('Searching for user...');
        const user = await User.findOne({ where: { username, password } });
        console.log('Found user:', user);
        if (user) {
            if (user.role === 'admin') {
                res.status(200).json({ user, redirect: '/admin' });
            } else if (user.role === 'user') {
                res.status(200).json({ user, redirect: '/account' });
            } else {
                res.status(401).json({ message: 'Нет доступа' });
            }
        } else {
            res.status(401).json({ message: 'Проверьте правильность введённых данных' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

app.post('/upload', upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), (req, res) => {
    // Вместо простого сообщения об успехе отправляем путь к файлу
    res.json({
        path1: `/files/${req.files['file1'][0].filename}`,
        path2: `/files/${req.files['file2'][0].filename}`
    });
});

















const Menu = sequelize.define('menu', {
    name: Sequelize.STRING,
    price: Sequelize.DECIMAL,
    description: {
        type: Sequelize.STRING,
        allowNull:true,


    },

    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    model_3d: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    tableName: 'menu',
    timestamps: false// указываем имя таблицы, если оно отличается от 'menu'
});

app.get('/menu', (req, res) => {
    Menu.findAll().then(menuItems => {
        res.json(menuItems);
    }).catch(error => {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'An error occurred while fetching menu items.' });
    });
});
// Добавить элемент меню
app.post('/menu', (req, res) => {
    Menu.create(req.body).then(menuItem => {
        res.json(menuItem);
    }).catch(error => {
        console.error('Error adding menu item:', error);
        res.status(500).json({ error: 'An error occurred while adding a menu item.' });
    });
});

// Обновить элемент меню
app.put('/menu/:id', (req, res) => {
    Menu.update(req.body, { where: { id: req.params.id } }).then(() => {
        res.json({ message: 'Menu item updated successfully.' });
    }).catch(error => {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'An error occurred while updating the menu item.' });
    });
});

// Удалить элемент меню
app.delete('/menu/:id', (req, res) => {
    Menu.destroy({ where: { id: req.params.id } }).then(() => {
        res.json({ message: 'Menu item deleted successfully.' });
    }).catch(error => {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ error: 'An error occurred while deleting the menu item.' });
    });
});



sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('API server listening on port 3001');
    });
}).catch(error => {
    console.error('Error connecting to the database:', error);
});
