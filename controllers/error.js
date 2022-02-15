module.exports = (req, res) => {
  res.render('404', {
      isAuthenticated: req.session.isAuthenticated
  })
};