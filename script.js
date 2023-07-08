#!/usr/bin/env node
const process = require("process");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
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
	{
		type: "input",
		name: "gh_link",
		message: "please paste the github url here",
		validate: (input) => {
			if (
				/^https?:\/\/github.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+$/.test(input)
			) {
				return true;
			} else {
				return "invalid link pasted";
			}
		},
	},
];

function createProject(userQuestions) {
	return inquirer
		.prompt(userQuestions)
		.then(({ proj_name, gh_link }) => {
			return generateFiles(proj_name, gh_link);
		})
		.then(() => {
			console.log(`success! project created 🐣`);
		})
		.catch((err) => {
			throw err;
		});
}

function generateFiles(projName, ghLink) {
	const currDir = process.cwd();
	return fs
		.mkdir(`${currDir}/${projName}`, { recursive: false })
		.then(() => {
			return fs.writeFile(`${currDir}/${projName}/README.md`, `# ${projName}`);
		})
		.then(() => {
			return fs.writeFile(`${currDir}/${projName}/.gitignore`, `node_modules`);
		})
		.then(() => {
			return createGitRepo(projName, ghLink);
		});
}

function createGitRepo(projName, ghLink) {
	// change command depending on selected proj type
	return exec(
		`cd ${projName} && git init && npm init -y && git add . && git commit -m "first commit" && git branch -M main && git remote add origin ${ghLink}.git && git push -u origin main`
	);
}

createProject(userQuestions);
