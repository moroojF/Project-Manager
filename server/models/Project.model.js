const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required."],
		minlength: [3, "Name should be at least 3 characters!"]
	},
	status:{
		type: String,
	},
	dueDate:{
		type: Date, 
		required: [true, "Due Date is required."]
	}
}, { timestamps: true });

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;