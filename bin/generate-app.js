#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const cliProgress = require('cli-progress');
const gradient = require('gradient-string');


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

      console.log('Installing dependencies...');
      cmdCommand('npm install');

      console.log('Removing useless files');
      cmdCommand('npx rimraf ./.git');
      fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

      console.log(gradient.morning('The installation is done, this is ready to use !'))
      console.log();

    } catch (error) {
      console.log(error);
    }
}
main();