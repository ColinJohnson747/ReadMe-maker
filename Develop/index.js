const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

function usernameAndAvatar() {
  return inquirer
    .prompt({
      message: "Enter your GitHub username:",
      name: "username",
    })
    .then(function ({ username }) {
      const queryUrl = `https://api.github.com/users/${username}/repos`;

      axios.get(queryUrl).then(function (res) {
        let amountOfRepos = res.data.length;

        let chosenRepoPosition = Math.floor(
          Math.random() * (amountOfRepos + 1)
        );

        const exampleRepo = res.data[chosenRepoPosition].name;
        //const avatar = res.data[chosenRepoPosition].avatar_url
      });
    });
}

usernameAndAvatar();
