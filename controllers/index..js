exports.getHome = (req, res, next) => {
  res.render('home', {
    pageTitle: 'Home',
  });
};
exports.getAddProject = (req, res, next) => {
  res.render('addProject', {
    pageTitle: 'Add Project',
  });
};
exports.getAbout = (req, res, next) => {
  res.render('about', {
    pageTitle: 'About',
  });
};
exports.postAddProject = (req, res, next) => {
  const project = {
    projectName: req.body.projectName,
    description: req.body.description,
    authorName: req.body.authorName,
  };
  console.log(project);
  res.redirect('/');
};
