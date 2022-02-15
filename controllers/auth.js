const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.postLogin = async (req, res) => {
    let currUser;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ where: { email: email } })
        .then(user => {
            console.log('User: ' + user);
            if (user === null) return res.redirect('/signup');
            else {
                currUser = user;
                bcrypt.compare(password, user.password)
                    .then(async result => {
                        console.log('RESULT: ' + result);
                        if (result) {
                            console.log('You\re logged in!');
                            req.session.user = currUser;
                            req.session.isAuthenticated = true;
                            return res.redirect('/');
                        }
                        else res.redirect('/login');
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect('/login');
        })
};

exports.postSignup = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (req.body.password !== req.body.confirmPassword) {
                return res.redirect('/signup');
            } else if (user) {
                return res.redirect('/login')
            } else {
                return bcrypt.hash(req.body.password, 12)
                    .then((hashedPassword) => {
                        return User.create({ email: req.body.email, password: hashedPassword })
                    })
                    .then((newUser) => {
                        newUser.createCart();
                        req.session.user = newUser;
                        req.session.isAuthenticated = true;
                        res.redirect('/')
                    })
            }
        })
        .catch(err => console.log(err));
};

exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        else res.redirect('/');
    });
}

exports.getResetPassword = (req, res) => {
    res.render('reset-password', {
        isAuthenticated: req.session.isAuthenticated,
        user: req.user
    });
};

exports.postResetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        user.password = await bcrypt.hash(req.body.newpass, 12);
        await user.save();
        return res.redirect('/login');
    } catch (e) {
        console.log(e);
    }
};
