#!/usr/bin/env node

const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const cliProgress = require('cli-progress');
const gradient = require('gradient-string');
const figlet = require("figlet");
const { select, confirm } = require('@inquirer/prompts');

// Constants
const gitRepo = "https://github.com/riyajath-ahamed/genso-boilerplate";
const issueReport = "https://github.com/riyajath-ahamed/genso-boilerplate/issues";

// Utility Functions
function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("\x1b[31m", error, "\x1b[0m");
                reject(error);
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
}

function createProjectDirectory(projectPath) {
    try {
        fs.mkdirSync(projectPath);
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.error(`The directory ${projectPath} already exists. Please choose a different name.`);
        } else {
            console.error(err);
        }
        process.exit(1);
    }
}

function cloneRepository(repo, projectPath) {
    return new Promise((resolve, reject) => {
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        let progress = 0;
        bar.start(100, 0);

        const clone = exec(`git clone --depth 1 ${repo} ${projectPath}`);

        clone.stderr.on('data', (data) => {
            const match = data.match(/Receiving objects:\s+(\d+)%/);
            if (match) {
                progress = parseInt(match[1], 10);
                bar.update(progress);
            }
        });

        clone.on('close', (code) => {
            bar.stop();
            if (code !== 0) {
                reject(new Error(`git clone process exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

function displayFigletText(text) {
    return new Promise((resolve, reject) => {
        figlet.text(text, { font: 'Speed', horizontalLayout: 'default', verticalLayout: 'default' }, (err, data) => {
            if (err) {
                console.error('Something went wrong with figlet...', err);
                reject(err);
            } else {
                console.log(data);
                resolve();
            }
        });
    });
}

function buildPackageJson(projectPath, projectName) {
    const newPackage = {
        name: projectName,
        version: "1.0.0",
        description: "A simple ReactJS Boilerplate with some Genso Magic ;)",
        author: "",
        license: "MIT",
        scripts: {
            start: "react-scripts start",
            build: "react-scripts build",
            test: "react-scripts test",
            eject: "react-scripts eject",
        },
        dependencies: {
            "@emotion/react": "^11.9.0",
            "@emotion/styled": "^11.8.1",
            "@mui/material": "^5.7.0",
            "@testing-library/jest-dom": "^5.16.4",
            "@testing-library/react": "^13.2.0",
            "@testing-library/user-event": "^13.5.0",
            bulma: "^0.9.4",
            notistack: "^2.0.4",
            react: "^18.1.0",
            "react-dom": "^18.1.0",
            "react-router-dom": "^5.2.0",
            "react-scripts": "5.0.1",
            sweetalert2: "^11.4.13",
            "web-vitals": "^2.1.4",
            axios: "^0.27.2",
        },
        browserslist: {
            production: [">0.2%", "not dead", "not op_mini all"],
            development: ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"],
        },
    };

    fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(newPackage, null, 2), 'utf8');
}

function cleanUpProject(projectPath, packageManager) {
    try {
        execSync('npx rimraf ./.git', { cwd: projectPath });
    } catch (error) {
        console.error('Error removing .git directory:', error.message);
    }

    try {
        fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });
    } catch (error) {
        console.error('Error removing bin directory:', error.message);
    }

    try {
        fs.unlinkSync(path.join(projectPath, 'LICENSE'));
    } catch (error) {
        console.error('Error removing LICENSE file:', error.message);
    }

    if (packageManager === 'npm') {
        try {
            fs.unlinkSync(path.join(projectPath, 'yarn.lock'));
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('Error removing yarn.lock file:', error.message);
            }
        }
    } else if (packageManager === 'yarn') {
        try {
            fs.unlinkSync(path.join(projectPath, 'package-lock.json'));
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('Error removing package-lock.json file:', error.message);
            }
        }
    }
}

async function main() {
    if (process.argv.length < 3) {
        console.log('You must provide a name for your app.');
        console.log('For example:');
        console.log('    npx genso my-first-app');
        process.exit(1);
    }

    const projectName = process.argv[2];
    const currentPath = process.cwd();
    const projectPath = path.join(currentPath, projectName);

    createProjectDirectory(projectPath);

    try {
        await displayFigletText('Genso CLI');
        console.log(gradient.morning('Genso CLI ⚡'));

        console.log('Downloading files...');
        await cloneRepository(gitRepo, projectPath);

        process.chdir(projectPath);

        const packageManager = await select({
            message: "🧪 Select a package manager",
            choices: [
                { name: "Npm", value: "npm" },
                { name: "Yarn", value: "yarn" },
            ],
        });

        //const installTailwind = await confirm({ message: '🌀 Would you like to install Tailwind CSS?' });

        buildPackageJson(projectPath, projectName);

        console.log('Installing dependencies...⌛');
        console.log("");
        await execCommand(`${packageManager} install`);

        // if (installTailwind) {
            console.log("Installing Tailwind CSS 🌀...");
            await execCommand(`${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} tailwindcss`);
        //}

        cleanUpProject(projectPath, packageManager);

        console.log(gradient.cristal('The installation is done✅'));
        console.log(gradient.morning('This is ready to use!⚡🎉'));
        console.log("");
        console.log("If you have any issues, please report them at:", issueReport);
        console.log("");
        console.log("");

        console.log("\x1b[38;5;202m", "You can start by typing:");
        console.log(`    cd ${projectPath}`);
        console.log(`    ${packageManager} start`);
        console.log("\x1b[0m");
        console.log(gradient.morning('Happy coding! 🚀'));
        console.log("");
        console.log("Check README.md for more information");
        console.log("");

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
