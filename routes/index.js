const express = require('express');

const indexController = require('../controllers/index.js');

const router = express.Router();

router.get('/', indexController.getHome);

router.get('/addProject', indexController.getAddProject);

router.post('/addProject', indexController.postAddProject);

router.get('/about', indexController.getAbout);

router.get('/projectDetail/:projectId', indexController.getProject);

router.get('/addIssue/:projectId', indexController.getIssue);

router.post('/addIssue/:projectId', indexController.postIssue);

router.post('/projectDetail/:projectId', indexController.postSearch);

module.exports = router;
