#!/usr/bin/env node

import { spawnSync } from "child_process";

/**
  * Returns the executable path for create-next-monorepo located inside node_modules
  * The naming convention is create-next-monorepo-${os}-${arch}
  * If the platform is `win32` or `cygwin`, executable will include a `.exe` extension
  * @see https://nodejs.org/api/os.html#osarch
  * @see https://nodejs.org/api/os.html#osplatform
  * @example "x/xx/node_modules/create-next-monorepo-darwin-arm64"
  */
const getExecutablePath = () => {
    const arch = process.arch;
    
    let os = process.platform as string;
    let extension = "";

    if (["win32", "cygwin"].includes(process.platform)) {
        os = "windows";
        extension = ".exe";
    }

    try {
        // Since the bin will be located inside `node_modules`, we can simply call require.resolve
        return require.resolve(`create-next-monorepo-${os}-${arch}/bin/create-next-monorepo${extension}`);
    } catch (error) {
        throw new Error(`Couldn't find create-next-monorepo binary inside node_modules for ${os}-${arch}`)
    }
}

// runs `create-next-monorepo` with args using nodejs spawn
const run = () => {
    const args = process.argv.slice(2);
    const processResult = spawnSync(getExecutablePath(), args, { stdio: "inherit"});
    process.exit(processResult.status ?? 0);
}

run();
