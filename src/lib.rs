use std::fs;
use std::path::Path;
use std::error::Error;

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
        let dest_path = to_dir.join(path.file_name().unwrap());

        if entry.file_type()?.is_dir() {
            fs::create_dir_all(&dest_path)?;
            copy_dir(&path, &dest_path)?;
        } else {
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

    if !to_dir.exists() {
        fs::create_dir(&to_dir)?;
    }

    for entry in fs::read_dir(from_dir)? {
        let entry = entry?;
        let path = entry.path();
        let dest_path = to_dir.join(path.file_name().unwrap());

        if entry.file_type()?.is_dir() {
            fs::create_dir_all(&dest_path)?;
            copy_dir(&path, &dest_path)?;
        } else {
            fs::copy(&path, &dest_path)?;
        }
    }

    Ok(())
}
