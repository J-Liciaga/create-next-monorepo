#!/usr/bin/env node

const { spawn } = require("child_process");

const args = process.argv.slice(2);
const child = spawn("./target/release/create-next-monorepo", args);

child.stdout.on("data", (data) => {
    console.log(data.toString().trim());
});

child.stderr.on("data", (data) => {
    console.error(data.toString().trim());
});

child.on("close", (code) => {
    process.exit(code);
});
