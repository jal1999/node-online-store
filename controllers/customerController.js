const Product = require('../models/product');
const CartProduct = require('../models/cartProduct');
const OrderProduct = require('../models/orderProduct');

exports.getStore = (req, res) => {
    let loggedIn;
    let user;
    if (req.user) user = req.user; 
    Product.findAll()
        .then(products => {
            let cartId;
            if (req.user) {
                cartId = req.user.getCart().id;
                loggedIn = true;
            }
            res.render('store',
                {
                    loggedIn: loggedIn,
                    user: user,
                    cartId: cartId,
                    isAuthenticated: req.session.isAuthenticated,
                    products: products
                })
        })
        .catch(err => console.log('ERROR: ' + err));
};

exports.getDetails = (req, res) => {
    Product.findOne({ where: { id: req.params.pid }})
        .then(product => {
            res.render('product-details',
                {
                    user: req.session.user,
                    isAuthenticated: req.session.isAuthenticated,
                    product: product
                });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res) => {
    const quantities = [];
    const promises = [];
    req.user.getCart()
        .then(cart => {
            return cart.getCartProducts()
        })
        .then(products => {
            for (let i = 0; i < products.length; ++i) {
                quantities.push(products[i].quantity);
                promises.push(products[i].getProduct());
            }
            Promise.all(promises)
                .then(values => {
                    res.render('cart', {
                        user: req.session.user,
                        isAuthenticated: req.session.isAuthenticated,
                        products: values,
                        quantities: quantities
                    })
                })
        })
        .catch(err => console.log(err));
}

exports.postAddToCart = (req, res) => {
    req.user.getCart()
        .then(cart => {
            return cart.getCartProducts();
        })
        .then(cartProducts => {
            const product = cartProducts.filter(product => product.productId.toString() === req.params.productId);
            if (product.length !== 0) {
                product[0].quantity += 1;
                product[0].save()
                    .then(() => res.redirect('/'));
            } else {
                req.user.getCart()
                    .then(cart => cart.createCartProduct({quantity: 1, productId: req.params.productId}))
                    .then(() => res.redirect('/'));
            }
        })
        .catch(err => console.log(err));
};

exports.postDeleteFromCart = (req, res) => {
    const productId = req.params.productId;
    CartProduct.findOne({where: {productId: productId}})
        .then(product => product.destroy())
        .then(res.redirect('/cart'))
        .catch(err => console.log(err));
};

exports.postOrder = async (req, res) => {
    try {
        const user = req.user;
        const cart = await user.getCart();
        const cartProducts = await cart.getCartProducts();
        const order = await user.createOrder();
        let totalCost = 0;
        for await (let cp of cartProducts) {
            let p = await cp.getProduct()
            OrderProduct.create({ price: p.price, orderId: order.id, productId: p.id })
                .then(op => cp = op)
                .catch(err => console.log(err));
            await cp.destroy();
            totalCost += p.price;
        }
        order.totalCost = totalCost;
        order.save();
        res.redirect('/');
    } catch (e) {
        console.log(e);
    }
};

exports.getYourOrders = async (req, res) => {
    try {
        const orders = await req.user.getOrders();
        res.render('your-orders', {
            orders: orders,
            isAuthenticated: req.session.isAuthenticated
        })
    } catch(e) {
        console.log(e);
    }
}


