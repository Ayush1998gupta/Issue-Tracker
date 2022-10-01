const Project = require('../models/project');
// const Issues = require('../models/project');

exports.getHome = (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.render('home', {
        proje: projects,
        pageTitle: 'Home',
        detailPage: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddProject = (req, res, next) => {
  res.render('addProject', {
    pageTitle: 'Add Project',
    detailPage: false,
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
    detailPage: false,
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
        issues: project.issues,
        detailPage: true,
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
      detailPage: true,
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
        console.log(err);
      } else {
        Project.findById(projId)
          .then((project) => {
            res.render('projectDetail', {
              pageTitle: 'Project Detail',
              project: project,
              issues: project.issues,
              detailPage: true,
            });
          })
          .catch((err) => console.log(err));
      }
    }
  );
};

exports.postSearch = (req, res, next) => {
  const projId = req.params.projectId;
  const lable = req.body.lable;
  const search = req.body.search;
  if (lable) {
    Project.findById(projId)
      .then((project) => {
        let issues = project.issues;
        issues = project.issues.filter((issues) => issues.lable === lable);
        res.render('projectDetail', {
          pageTitle: 'Project Detail',
          project: project,
          issues: issues,
          detailPage: true,
        });
      })
      .catch((err) => console.log(err));
  }
  if (search) {
    Project.findById(projId)
      .then((project) => {
        let searched = project.issues;
        searched = project.issues.filter(
          (allsearched) =>
            allsearched.authorName === search.toLowerCase() ||
            allsearched.issue === search.toLowerCase() ||
            allsearched.description === search.toLowerCase()
        );
        res.render('projectDetail', {
          pageTitle: 'Project Detail',
          project: project,
          issues: searched,
          detailPage: true,
        });
      })
      .catch((err) => console.log(err));
  }
};
