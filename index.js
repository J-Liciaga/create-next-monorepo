#!/usr/bin/env node

const { spawn } = require("child_process");

const binary = spawn("./target/release/create-next-monorepo", process.argv.slice(2));

binary.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
});

binary.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
});

binary.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
});
