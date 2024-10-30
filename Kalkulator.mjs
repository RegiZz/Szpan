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

async function calc(){
    try{
        const liczba1 = await askQuestion("Podaj liczbe ")
        const znak = await askQuestion("Podaj znak operacji matematycznej ")
        const liczba2 = await askQuestion("Podaj liczbe ")
        const metoda = await askQuestion("Podaj metode przeprowadzania obliczeń (callback/promise) ")

        if (isNaN(liczba1) || isNaN(liczba2))
        {
            throw new Error("Ty pajacu nie umiesz liczby napisać?");
        }

        switch (znak)
        {
            case "+":
                break;
            case "-":
                break;
            case "*":
                break;
            case "/":
                if (liczba2 == 0)
                    throw new Error("Zerem to jestes ty");
                break;  
            default:
                throw new Error("Co ty za czary rzucasz?")
        }

        if (metoda == "callback") {
            oblicz(liczba1, liczba2, znak)
                .then((v) => console.log(`${liczba1} ${znak} ${liczba2} = ${v}`));
        } else if (metoda == "promise") {
            console.log(`${liczba1} ${znak} ${liczba2} = ` + await oblicz(liczba1, liczba2, znak));
        } else {
            console.log("Taki sposób obliczania nie istnieje kolego złociutki.")
        }
    }catch(err){
        console.error(err)
    }finally{
        rl.close()
    }
}

async function oblicz(liczba1, liczba2, znak)
{
    await sleep(2000);
    return eval(`${liczba1}${znak}${liczba2}`);
}

const sleep = async(ms) => new Promise((resolve) => {
    setTimeout(resolve, ms)
});

calc()