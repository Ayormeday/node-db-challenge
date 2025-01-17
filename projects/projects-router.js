
const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  Projects.getProjects().then(projects => {
    if (projects) {
      res.status(200).json(projects);
    } else {
      next({ message: "projects not found", status: 404 });
    }
  }).catch(next);
});

router.get('/:id', validateProjectId, (req, res, next) => {
  res.status(200).json(req.project);
});

router.post('/', validateProjectBody, (req, res, next) => {
  Projects.add(req.body).then(project => {
    res.status(201).json(project);
  }).catch(next);
});

router.put('/:id', validateProjectId, validateProjectBody, (req, res, next) => {
  Projects.update(req.body, req.project.id).then(updatedScheme => {
    res.status(200).json(updatedScheme);
  }).catch(next);
});

router.delete('/:id', validateProjectId, (req, res, next) => {
  Projects.remove(req.project.id).then(deleted => {
    res.status(204).json(req.project);
  }).catch(next);
});

//middlewares

function validateProjectId(req, res, next) {
  const { id } = req.params;
  idIsValid = Number(id);
  if (!Number.isInteger(idIsValid) && idIsValid > 0) {
    next({ message: 'Invalid project id' })
  }
  Projects.getProject(idIsValid).then(project => {
    if (project) {
      req.project = project
      next();
    } else {
      next({ message: 'Could not find project with given id', status: 404 });
    }
  }).catch(next);
}

function validateProjectBody(req, res, next) {
  const { id, name, description, completed } = req.body;
  if (!name || typeof completed === 'undefined') {
    next({ message: 'Missing required `name` and `completed` fields', status: 401 });
  }
  req.body = { id, name, description, completed };
  next();
}

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    file: 'project-router',
    method: req.method,
    url: req.url,
    status: error.status || 500,
    message: error.message
  });
})

module.exports = router;