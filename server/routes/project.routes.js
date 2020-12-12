const ProjectController = require("../controllers/project.controller");

module.exports = app => {
  app.get("/api/projects/", ProjectController.getAll);
  app.post("/api/project/new", ProjectController.create);
  app.get("/api/project/:id", ProjectController.getOne);
  app.put("/api/project/update/:id", ProjectController.update);
  app.delete("/api/project/delete/:id", ProjectController.delete);
};