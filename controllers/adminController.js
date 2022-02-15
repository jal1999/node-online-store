const User = require('../models/user');
const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('add-product',
        {
            isAuthenticated: req.session.isAuthenticated
        });
};

exports.postAddProduct = (req, res) => {
    Product.create(
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            UserId: req.session.user.id
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log('ERROR: ' + err));
};

exports.getYourProducts = (req, res) => {
    req.user.getProducts()
        .then(products => {
            res.render("your-products", {
                isAuthenticated: req.session.isAuthenticated,
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res) => {
    Product.findOne({where: {id: req.params.productId}})
        .then(product => {
            res.render('edit-product',
                {
                    isAuthenticated: req.session.isAuthenticated,
                    product: product
                })
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
    Product.findOne({where: {id: req.body.id}})
        .then(product => {
            product.title = req.body.title;
            product.description = req.body.description;
            product.imageUrl = req.body.imageUrl;
            product.price = req.body.price;
            product.save()
                .then(res.redirect('/admin/your-products'))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findOne({ where: { id: productId }})
      .then((product) => product.destroy())
      .then(() => res.redirect('/admin/your-products'))
      .catch(err => console.log(err));
};