import readline from "readline"
import { HandleCommand } from "../core/cmd"
import { VLab } from "./vlab"

export class VShell {
    private rl: readline.Interface
    public vlab: VLab

    constructor(vlab: VLab) {
        this.vlab = vlab
        this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `\x1b[0m󱥸 \x1b[1;92mVLab 0.1\x1b[0m 󰇘 \x1b[1;32m${this.vlab.GetCurrentLab() ? (this.vlab.GetCurrentLab()?.name) : ('/')}\x1b[1;92m $ \x1b[0m`
        })
    }

    public Start() {
        this.rl.prompt()
        this.rl.on('line', (line) => {
            const input = line.trim()
            let err = HandleCommand(input) 
            if (err) console.log("\x1b[1;90m" + "Error: " + err + "\x1b[0m")
            this.rl.prompt()
        })
        this.rl.on('close', () => {
            console.log("exit")
            process.exit(0)
        })
    }
}