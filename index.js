#!/usr/bin/env node

const { spawn } = require("child_process");

(function() {
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
})(); 
