import readline from "readline"
import { Lab } from "../models/lab"
import { RunCommand } from "./cmd"

export class VShell {
    private rl: readline.Interface
    public lab: Lab

    constructor(lab: Lab) {
        this.lab = lab
        this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `\x1b[1;92m\x1b[0m󱥸 \x1b[1;92mVLab \x1b[0m󰇘 \x1b[1;32m${lab.name}\x1b[1;92m $ \x1b[0m`
        })
    }

    public Start() {
        this.rl.prompt()
        this.rl.on('line', (line) => {
            const input = line.trim()
            let err = RunCommand(input) 
            if (err) console.log("\x1b[1;90m" + "Error: " + err + "\x1b[0m")
            this.rl.prompt()
        })
        this.rl.on('close', () => {
            console.log("Exit")
            process.exit(0)
        })
    }
}