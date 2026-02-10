import readline from "readline";
import { HandleCommand } from "../core/commands";
import { VLab } from "./vlab";
import Docker from "dockerode";

export class VShell {
    public vlab: VLab;
    public shellMode: boolean;
    public shellTarget?: string;
    public exec?: Docker.Exec;
    public cwd: string = "/";
    private rl: readline.Interface;

    constructor(vlab: VLab) {
        this.vlab = vlab;
        this.shellMode = false;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: this.GetPrompt(),
        });
    }

    private GetPrompt(): string {
        if (this.shellMode == true)
            return `\x1b[0m󱥸 \x1b[1;92mVLab v0.1\x1b[0m 󰇘 \x1b[1;32m${this.vlab.GetCurrentLab() ? this.vlab.GetCurrentLab()?.name : "/"}\x1b[0m 󰇘 \x1b[1;32mroot\x1b[1;92m@\x1b[1;32m${this.shellTarget} ${this.cwd}\x1b[1;92m $ \x1b[0m`;
        else
            return `\x1b[0m󱥸 \x1b[1;92mVLab v0.1\x1b[0m 󰇘 \x1b[1;32m${this.vlab.GetCurrentLab() ? this.vlab.GetCurrentLab()?.name : "/"}\x1b[1;92m $ \x1b[0m`;
    }

    public RefreshPrompt() {
        this.rl.setPrompt(this.GetPrompt());
        this.rl.prompt();
    }

    public Ask(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
    }

    public Start() {
        this.rl.prompt();
        this.rl.on("line", async (line) => {
            const input = line.trim();
            let err = await HandleCommand(input);
            if (err) console.log("\x1b[1;90m" + "Error: " + err + "\x1b[0m");
            this.rl.prompt();
        });
        this.rl.on("close", () => {
            console.log("exit");
            process.exit(0);
        });
    }

    public ShellIn(target: string) {
        this.shellMode = true;
        this.shellTarget = target;
        this.RefreshPrompt();
    }

    public ShellOut() {
        this.shellMode = false;
        this.shellTarget = undefined;
        this.RefreshPrompt();
    }
}