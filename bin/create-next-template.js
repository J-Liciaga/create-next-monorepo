const yargs = require("yargs");
const chalk = require('chalk');
const { exec } = require("child_process");
const ncp = promisify(require("ncp").ncp);
const fs = require("fs");
const { promisify } = require("util");

const downloadTemplate = async (name) => {
    await new Promise((resolve, reject) => {
        exec("git clone https://github.com/J-Liciaga/nx-next-starter.git", (
            error,
            stdout,
            stderr,
        ) =>{
            if (error) reject(error);
            else resolve();
        });
    });
    // copy the files to the new project directory
    await ncp(`${name}/template`, name);
    // remove the temporary directory
    fs.rmdirSync(name, { recursive: true });
};

const templateVersion = require('../package.json').version;

export const commandsObject = yargs
    .wrap()
    .parserConfiguration({
        "strip-dashed": true,
        "dot-notation": true,
    })
    .command({
        command: "create-next-monorepo <name>",
        describe: "create an nx momo-repository based on the nx-next-starter template",
        builder: (yargs) => {
            return yargs
                .positional("name", {
                    describe: "the name of your new project",
                    type: "string",
                });
        },
        handler: (argv) => {
            downloadTemplate(argv.name);
        },
    })
    .help('help', chalk.dim`Show help`)
    .version(
        'version',
        chalk.dim`Show version`,
        templateVersion
    );
