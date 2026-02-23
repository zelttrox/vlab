import readline from "readline";
import { HandleCommand } from "../core/commands";
import { VLab } from "./vlab";
import Docker from "dockerode";

export class VShell {
    public vlab: VLab;
    public shellMode: boolean;
    public exec?: Docker.Exec;
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
            return `\x1b[0m󱥸 \x1b[1;92mVLab v0.1\x1b[0m 󰇘 \x1b[1;32m${this.vlab.GetCurrentLab() ? this.vlab.GetCurrentLab()?.name : "/"}\x1b[0m 󰇘 \x1b[1;92m $ \x1b[0m`;
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

    public async Pause() {
        this.rl.pause();
        console.log("paused vshell")
    }

    public async Resume() {
        this.rl.resume();
        this.RefreshPrompt();
        console.log("resumed vshell")
    }

    public async ShellIn(target: string) {
        this.shellMode = true;
        this.RefreshPrompt();
        console.log("shelled in", target)
    }

    public async ShellOut() {
        this.shellMode = false;
        this.RefreshPrompt();
        console.log("shelled out")
    }
}