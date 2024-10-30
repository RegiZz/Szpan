import fs from 'fs'
import promises from "fs/promises"
import readline from 'readline'

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

async function data(){
    try{
        const name = await askQuestion("Jak się zwie jegomość? ")
        const surname = await askQuestion("Jak masz na nazwisko? ")
        const age = await askQuestion("Ile masz latek? ")

        var json = JSON.stringify({name, surname, age})
        fs.writeFile("DLData.json", json, {}, () => {})

        var read = await promises.readFile("DLData.json")
        console.log(read.toString())
    }catch(err){
        console.error(err)
    }finally{
        rl.close()
    }
}
data()