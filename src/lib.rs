use std::fs;
use std::path::Path;
// use std::process;
use std::error::Error;
use std::env;

pub struct Config {
    pub project_name: String,
}

impl Config {
    pub fn new(
        args: &[String],
    ) -> Result<Config, &str> {
        if args.len() < 2 {
            return Err("not enough arguments");
        }

        let project_name: String = args[1].clone();

        Ok(Config { project_name })
    }
}

fn copy_dir(
    from_dir: &Path,
    to_dir: &Path,
) -> std::io::Result<()> {
    for entry in fs::read_dir(from_dir)? {
        let entry = entry?;
        let path = entry.path();
        // Construct the destination path by appending the the entry name to the destination directory path
        let dest_path = to_dir.join(path.file_name().unwrap());

        if entry.file_type()?.is_dir() {
            // if the entry is a directory, recursively copy its contents to the destination directory
            fs::create_dir_all(&dest_path)?;
            copy_dir(&path, &dest_path)?;
        } else {
            // if the entry is a file, copy it to the destination directory
            fs::copy(&path, &dest_path)?;
        }
    }

    Ok(())
}

pub fn generate_project(
    project_name: &str,
) -> Result<(), Box<dyn Error>> {
    let source_dir = std::env::current_dir().unwrap();
    let unwrapped_source_path = source_dir.to_str().unwrap();
    let formatted_source_path = format!("{}{}", unwrapped_source_path, "/nx-next-starter-template");
    let source_path = Path::new(&formatted_source_path);


    let from_dir = Path::new(source_path);
    let to_dir = Path::new(project_name);

    // create the destination directory if it doesn't exist
    if !to_dir.exists() {
        fs::create_dir(&to_dir)?;
    }

    // iterate over the entries in the source directory
    for entry in fs::read_dir(from_dir)? {
        let entry = entry?;
        let path = entry.path();
        // construct the destination path by appending the entry name to the destination directory path
        let dest_path = to_dir.join(path.file_name().unwrap());

        if entry.file_type()?.is_dir() {
            // if the entry is a directory, recursively copy its contents to the destination directory
            fs::create_dir_all(&dest_path)?;
            copy_dir(&path, &dest_path)?;
        } else {
            // if the entry is a file, copy it to the destination directory
            fs::copy(&path, &dest_path)?;
        }
    }

    Ok(())
}
