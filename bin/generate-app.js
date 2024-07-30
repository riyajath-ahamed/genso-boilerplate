#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const cliProgress = require('cli-progress');
const gradient = require('gradient-string');
const { select, confirm  } = require('@inquirer/prompts');


async function cmdCommand(command) {

    try {
        const { stdout, stderr } = await execSync(command);
        console.log(stdout);
        console.log(stderr);
    } catch (error) {
        console.log("\x1b[31m", error, "\x1b[0m");
    }


}


if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('    npx genso my-first-app');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/riyajath-ahamed/genso-boilerplate"
const isuuereport = "https://github.com/riyajath-ahamed/genso-boilerplate/issues"

try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
      console.log(err);
    }
    process.exit(1);
  }

  async function main() {
    try {
    console.log(gradient.morning('Genso CLI ⚡'));

      console.log('Downloading files...');
      cmdCommand(`git clone --depth 1 ${git_repo} ${projectPath}`);

      process.chdir(projectPath);

      const answer = await select({
        message: "🧪 Select a package manager",
        choices: [
          {
            name: "Npm",
            value: "npm",
          },
          {
            name: "Yarn",
            value: "yarn",
          },
        ],
      });
      console.log('Installing dependencies...⌛');
      cmdCommand(`${answer} install`);

      console.log();
      const answerTailwind = await confirm({ message: 'Would you like to install Tailwind CSS?' });
      if (answerTailwind) {
        if (answer === "npm") {
            console.log("Installing Tailwind CSS 🌀...");
          cmdCommand('npm install tailwindcss');
        } else if (answer === "yarn") {
            console.log("Installing Tailwind CSS 🌀...");
        cmdCommand('yarn add tailwindcss');
        }
      }


      console.log('Removing useless files🧹...');
      cmdCommand('npx rimraf ./.git');
      fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

      console.log(gradient.cristal('The installation is done,✅'))
      console.log(gradient.morning('This is ready to use!⚡🎉'))
      console.log();
      
      console.log("If you have any issues, please report them at: ", isuuereport);

      console.log();

      console.log("\x1b[33m", "You can start by typing:");
      console.log(`    cd ${projectPath}`);

      if (answer === "npm") {
        console.log("    npm start", "\x1b[33m");
    } else if (answer === "yarn") {
        console.log("    yarn start", "\x1b[33m");
    }
      console.log();
      console.log("Check README.md for more information");
      console.log();


    } catch (error) {
      console.log(error);
    }
}
main();