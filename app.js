const express = require('express');
const path = require('path');
const database = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartProduct = require('./models/cartProduct');
const Order = require('./models/order');
const OrderProduct = require('./models/orderProduct');
const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorRoutes = require('./routes/error');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const sessionStore = require('connect-session-sequelize')(session.Store);

const app = express();

// Pug setup
app.set('view engine', 'pug');
app.set('views', './views');

// Body Parser
app.use(express.urlencoded({extended: false}));

// Serve static pages
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(
    session({
        secret: 'this is my secret',
        resave: false,
        saveUninitialized: false,
        store: new sessionStore({
            db: database
        })
    }));

// Sequelize associations
Product.belongsTo(User);
User.hasMany(Product, { onDelete: 'CASCADE' });
User.hasOne(Cart, { onDelete: 'CASCADE' });
Cart.belongsTo(User);
Cart.hasMany(CartProduct, { onDelete: 'CASCADE'});
CartProduct.belongsTo(Cart);
Product.hasMany(CartProduct, { onDelete: 'CASCADE' });
CartProduct.belongsTo(Product);
User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderProduct, { onDelete: 'CASCADE' });
OrderProduct.belongsTo(Order);
Product.hasMany(OrderProduct, { onDelete: 'CASCADE' });
OrderProduct.belongsTo(Product);

// Setting user for each request
app.use((req, res, next) => {
    if (req.session.user) {
        User.findByPk(req.session.user.id)
            .then((user) => {
            req.user = user;
            next();
        })
            .catch(err => console.log(err));
    } else {
        next();
    }
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorRoutes);

// Synchronizing database models
database
    .sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Listening on port 5000!');
        });
    })
    .catch(err => console.log(err));