const db = require('../data/db-config');

const getTasks = () => {
  return db('tasks');
}

const getTask = (id) => {
  return db('tasks').where({ id }).then(tasks => tasks[0]);
}

const add = (task) => {
  return db('tasks').insert(task).then((ids) => getTask(ids[0]));
}

const update = (changes, id) => {
  return db('tasks').where({ id }).update(changes).then(() => getTask(id));
}

const remove = (id) => {
  return db('tasks').where({ id }).del();
}

module.exports = {
  getTasks,
  getTask,
  add,
  update,
  remove,
}