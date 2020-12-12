const Project = require("../models/project.model");

module.exports.getAll = (req, res) => {
  Project.find()
    .then(projects => res.json({ projects }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.getOne = (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then(project => res.json({ project }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.create = (req, res) => {
  Project.create(req.body)
    .then(project => res.json({ project }))
    .catch(err => res.json(err));
};

module.exports.update = (req, res) => {
  Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(project => res.json({ project }))
    .catch(err => res.json(err));
};

module.exports.delete = (req, res) => {
  Project.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
