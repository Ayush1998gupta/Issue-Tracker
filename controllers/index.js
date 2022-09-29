const Project = require('../models/project');

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
  const projId = req.params.projectId;
  const issues = {
    issue: req.body.issue,
    description: req.body.description,
    authorName: req.body.authorName,
    lable: req.body.lable,
  };
  Project.findByIdAndUpdate(
    projId,
    { $push: { issues: issues } },
    (err, docs) => {
      if (err) {
        console.log('error fom ', err);
      } else {
        Project.findById(projId)
          .then((project) => {
            res.render('projectDetail', {
              pageTitle: 'Project Detail',
              project: project,
            });
          })
          .catch((err) => console.log(err));
      }
    }
  );
};
