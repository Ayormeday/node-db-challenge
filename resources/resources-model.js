const db = require('../data/db-config');

const getResources = () => {
  return db('resources');
}

const getResource = (id) => {
  return db('resources').where({ id }).then(resources => resources[0]);
}

const add = (resource) => {
  return db('resources').insert(resource).then((ids) => getResource(ids[0]));
}

const update = (changes, id) => {
  return db('resources').where({ id }).update(changes).then(() => getResource(id));
}

const remove = (id) => {
  return db('resources').where({ id }).del();
}

module.exports = {
  getResources,
  getResource,
  add,
  update,
  remove,
}