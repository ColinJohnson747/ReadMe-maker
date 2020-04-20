const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    message: "Enter your GitHub username.",
    name: "username",
  },
  {
    type: "input",
    message: "What is the name of your project?",
    name: "title",
  },
  {
    type: "input",
    message: "Please give a brief description of your project.",
    name: "description",
  },
  {
    type: "input",
    message: "List out instructions for operation or installation.",
    name: "Installation",
  },
  {
    type: "input",
    message: "Please give scenarios in which it can be used.",
    name: "usage",
  },
  {
    type: "list",
    message: "Please chose a licensing option",
    choices: ["Public, Commerical", "Non Commerical", "Nonchangeable"],
    name: "licensing",
  },
  {
    type: "input",
    message: "List out any contributors, yourself included.",
    name: "contributing",
  },
  {
    type: "input",
    message: "Does the repo contain any written tests?",
    name: "tests",
  },
];

function promptUser() {
  return inquirer.prompt(questions);
}
function generateMarkdown(answers) {
  return `# ${answers.title}

  ${answers.description}

  ## Installation
  ${answers.Installation}
  
  ## Usage
  ${answers.usage}

  ## Contributors:
  ${answers.contributing}

  ## Tests
  ${answers.tests}

  ## License
  ${answers.licensing}
`;
}
async function init() {
  try {
    const answers = await promptUser();

    const markdown = generateMarkdown(answers);

    await writeFileAsync("test.md", markdown);
  } catch (err) {
    console.log(err);
  }
}

init();
