const fs = require('fs'), chalk = require(`chalk`), path = require('path'), config = require(`./config.json`), readline = require(`readline`), bytenode = require("bytenode");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
prompt();

async function prompt() {
    console.clear();
    rl.question(`Provide the directory you would like to compile. Or provide the type of project.\n`, (res) => {
        if (config.project_types[res]) return project(res);
        encDir(res)
    });
}

async function project(res) {
    const date = new Date(Date.now()).toDateString().replaceAll(" ", "-");
    let directories = config.project_types[res];
    let total = 0;
    console.clear();
    console.log(`Compiling directories for ${res}`);
    for (let directory of directories) {
        let files = await fs.readdirSync(directory);
        files.forEach(async(file) => {
            if (file.split(".")[1] !== "js") return;
            if (config.do_not_compile.includes(file.split(".")[0])) return;
            let data = fs.readFileSync(path.join(__dirname, directory, "/", file), "utf-8");
            console.log(chalk.italic("Creating backup for " + chalk.blue(`${directory}/${file}`)));
            fs.writeFileSync(path.join(__dirname, "backups/", `${file.split(".")[0]}-${date}-${Date.now()}.js`), data);
            bytenode.compileFile({
                filename: `./${directory}/${file}`,
                output: `./${directory}/${file.split(".")[0]}${config.file_extension}`
            });
            console.log(chalk.italic("Creating Easy Compile File for " + chalk.blue(`${directory}/${file}`)));
            fs.unlink(path.join(__dirname, directory, "/", file), () => {});
            console.log(chalk.italic("Dropping file " + chalk.blue(`${directory}/${file}`)));
            total++;
        });
    };
    repeat(total);
};

async function encDir(dir) {
    const date = new Date(Date.now()).toDateString().replaceAll(" ", "-");
    if (fs.existsSync(dir)) {
        let total = 0;
        const files = await fs.readdirSync(dir);
        files.forEach(async(f) => {
            if (f.split(".")[1] !== "js") return;
            if (config.do_not_compile.includes(f.split(".")[0])) return;
            let data = fs.readFileSync(path.join(__dirname, dir, "/", f), "utf-8");
            console.log(chalk.italic("Creating backup for " + chalk.blue(`${dir}/${f}`)));
            fs.writeFileSync(path.join(__dirname, "backups/", `${f.split(".")[0]}-${date}-${Date.now}.js`), data);
            bytenode.compileFile({
                filename: `./${dir}/${f}`,
                output: `./${dir}/${f.split(".")[0]}${config.file_extension}`
            });
            console.log(chalk.italic("Creating Easy Compile File for " + chalk.blue(`${dir}/${f}`)));
            fs.unlink(path.join(__dirname, dir, "/", f), () => {});
            console.log(chalk.italic("Dropping file " + chalk.blue(`${dir}/${f}`)));
            total++;
        });
        repeat(total);
    } else {
        console.log(`that directory ${chalk.red(`does not exist.`)}`);
        repeat(0);
    }
}

async function repeat(total) {
    setTimeout(() => {
        console.log(`✔ Compiled ${chalk.green(total)} files.`);
        rl.question(`Would you like to run again ${chalk.red(`[Y/N]`)}\n`, (res) => {
            if (res == "Y" || res == "y") {
                prompt();
            } else {
                console.clear();
                console.log(`Thank you for using Easy Compile.`);
                process.exit(1);
            }
        })
    }, 3000)
}
