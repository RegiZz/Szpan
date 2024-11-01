import fs from 'fs'
import path from 'path'
import promises from "fs/promises"
import {EventEmitter} from 'events'
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise(resolve=>{
        rl.question(question,answer=>{
            resolve(answer)
        })
    })
}

class Analinator extends EventEmitter {
    async main() {
        const dir = await askQuestion("Jaki folder chcesz przeanalizowac? ");

        if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
            console.error("Folder nie istnieje");
            return;
        }

        this.przesladuj(dir);
    }

    async przesladuj(dir) {
        try {
            const files = await promises.readdir(dir, { recursive: true });
            console.log(files);
            console.log("\n");
    
            files.forEach(async (file) => {
                try {
                    const pathToFile = path.join(dir, file);
                    const stats = await promises.stat(pathToFile);
                    const objName = stats.isFile() ? "pliku" : "folderu";
                    this.emit("file-analyze-start", file, objName);

                    if (stats.isFile()) {
                        console.log(`Metadane o ${file}`);
                        console.log(`Rozszerzenie ${path.extname(file)}`);
                        console.log(`Rozmiar ${(stats.size / 1024).toFixed(2)} kB`);
                        console.log(`Ostatnia modyfikacja ${stats.mtime}`);
                    } else {
                        console.log(`Folder ${file}`)
                    }

                    this.emit("file-analyze-end", file, objName);
                } catch (e) {
                    console.error(e);
                }
            });

        } catch (e) {
            console.error(e);
        }
    }
}

const analIzer = new Analinator();

analIzer.on("file-analyze-start", (file, objName) => {
    console.log(`Analiza ${objName} ${file} rozpoczęta.`);
});

analIzer.on("file-analyze-end", (file, objName) => {
    console.log(`AnaLiza ${objName} ${file} zakończona.`);
    console.log("\n");
})


analIzer.main()