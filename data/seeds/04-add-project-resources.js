exports.seed = function(knex) {
  return knex("project_resources")
    .truncate()
    .then(function() {
      return knex("project_resources").insert([
        
      
      ]);
    });
};
