const db = require('../data/db-config');

const getProjects = () => {
  return db('projects');
}

const getProject = (id) => {
  return db('projects').where({ id }).then(projects=> projects[0]);
}

const add = (project) => {
  return db('projects').insert(project).then((ids) => getResource(ids[0]));
}

const update = (changes, id) => {
  return db('projects').where({ id }).update(changes).then(() => getProject(id));
}

const remove = (id) => {
  return db('projects').where({ id }).del();
}

module.exports = {
  getProjects,
  getProject,
  add,
  update,
  remove,
} 