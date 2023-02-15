#!/usr/bin/env node

const { spawn, exec } = require("child_process");
const fs = require("fs");

function buildTarget() {
    exec("yarn build", (err, stdout, stderr) => {
        if (err) {
            console.log(`Error running script: ${err}`);
            return;
        };

        console.log(`${stdout}`);
        console.error(`${stderr}`);
    });
};

buildTarget();

const pathExists = (path) => {
    try {
        fs.accessSync(path);
        return true;
    } catch(err) {
        return false;
    };
};

const waitForBinary = setInterval(() => {
    if (pathExists("./target")) {
        setTimeout(() => {
            buildBinary();
        }, 1000);
        execute();
    };
}, 100);

const buildBinary = () => {
    const binary = spawn("./target/release/create-next-monorepo", process.argv.slice(2));
            
    binary.stdout.on("data", (data) => {
        console.log(`${data}`);
    });
    
    binary.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
    });
    
    binary.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
    });
};

const execute = () => clearInterval(waitForBinary);
