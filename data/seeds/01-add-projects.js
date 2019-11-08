exports.seed = function(knex) {
  return knex("projects")
    .truncate()
    .then(function() {
      return knex("projects").insert([
        { project_name: "egg", project_description: "", project_status: "" },
      
        
      ]);
    });
};
