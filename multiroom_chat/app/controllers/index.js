const home = (app, req, res) => {
  res.render('index', { validacao : {} });
};

module.exports = {
  home
};