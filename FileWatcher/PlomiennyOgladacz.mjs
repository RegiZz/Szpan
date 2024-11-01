import fs from 'fs'
import promises from "fs/promises"

async function watcher(path, logsPath = "./logs.txt") {
    const files = await promises.readdir(path);
    console.log(files);
    const w = fs.watch(path);

    w.addListener("change", (e, f) => {
        if (e == "rename") {

            if (!files.includes(f) && fs.existsSync(`${path}/${f}`))
            {
                fs.appendFile(logsPath, `[${new Date()}] "${f}" - file created \n`, {}, () => {});
                console.log(`Dodano nowy plik ${f}`)
                files.push(f);
            }
            else
            {
                fs.appendFile(logsPath, `[${new Date()}] "${f}" - file deleted \n`, {}, () => {});
                console.log(`Usunięto plik ${f}`);
                const index = files.indexOf(f);
                if (index > -1)
                    files.splice(index, 1)
            }
        }
        else
        {
            fs.appendFile(logsPath, `[${new Date()}] "${f}" - file changed \n`, {}, () => {});
            console.log(`Zmieniono plik ${f}`);
        }
    })
}

watcher("../FileWatcher/")