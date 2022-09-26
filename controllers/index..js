const Project = require('../models/project');
const Issue = require('../models/issue');

exports.getHome = (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.render('home', {
        proje: projects,
        pageTitle: 'Home',
      });
    })
    .catch((err) => {
      console.log(err);
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
  const projectName = req.body.projectName;
  const description = req.body.description;
  const authorName = req.body.authorName;

  const project = new Project({
    projectName: projectName,
    description: description,
    authorName: authorName,
  });
  project
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProject = (req, res, next) => {
  const projId = req.params.projectId;
  Project.findById(projId)
    .then((project) => {
      res.render('projectDetail', {
        pageTitle: 'Project Detail',
        project: project,
        // path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getIssue = (req, res, next) => {
  const projId = req.params.projectId;
  Project.findById(projId).then((project) => {
    res.render('addIssue', {
      pageTitle: 'Add Issue',
      project: project,
    });
  });
};

exports.postIssue = (req, res, next) => {
  const projId = req.body.projectId;
  const issue = req.body.issue;
  const description = req.body.description;
  const authorName = req.body.authorName;
  const lable = req.body.lable;
  const newIssue = new Issue({
    issue: issue,
    lable: lable,
    description: description,
    authorName: authorName,
    projectId: projId,
  });
  newIssue
    .save()
    .then(() => {
      res.redirect('/');
      //how to redirect to productDetail page
    })
    .catch((err) => {
      console.log(err);
    });
};
