const process = require("process");
const fs = require("fs/promises");
const inquirer = require("inquirer");

// inquirer prompts:
// - enter project name
// - select a project template...

// add templates...
// - node proj
// - express server
// - react vite
// - svelte
// - python project

const userQuestions = [
	{
		type: "input",
		name: "proj_name",
		message: "please enter a name for your project 🤠",
		validate: (input) => {
			if (/^([A-Za-z\-\_\d])+$/.test(input)) {
				return true;
			} else {
				return "pls no special characters";
			}
		},
	},
];

function createProject() {
	inquirer.prompt(userQuestions).then(({ proj_name }) => {});
}

function generateFiles(projectName) {
	const currDir = process.cwd();
	return fs
		.mkdir(`${currDir}/${projectName}`, { recursive: false })
		.then(() => {});
}
