use std::env;
use std::process;

use create_next_monorepo::Config;

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args).unwrap_or_else(|err| {
        eprintln!("Problem parsing thorugh arguments {}", err);
        process::exit(1);
    });

    println!("Generating project {}", config.project_name);

    if let Err(e) = create_next_monorepo::generate_project(&config.project_name) {
        eprintln!("Application error: {}", e);
        process::exit(1);
    }
}
