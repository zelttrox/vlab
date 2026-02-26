import readline from "readline";
import { HandleCommand } from "../core/commands";
import { VLab } from "./vlab";

export class VShell {
    public vlab: VLab;
    public shellMode: boolean;
    public shellTarget?: string;
    private rl?: readline.Interface;
    private paused: boolean = false;

    constructor(vlab: VLab) {
        this.vlab = vlab;
        this.shellMode = false;
        this.shellTarget = "";
        this.InitReadline();
    }

    private InitReadline() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: this.GetPrompt(),
        });
    }

    public GetPrompt(): string {
        if (this.shellMode == true)
            return `\x1b[0m󱥸 \x1b[1;92mVLab v0.1\x1b[0m 󰇘 \x1b[1;32m${this.vlab.GetCurrentLab() ? this.vlab.GetCurrentLab()?.name : "/"}\x1b[0m 󰇘 \x1b[1;32m\\u\x1b[1;92m@\x1b[1;32m${this.shellTarget} \\w\x1b[1;92m $ \x1b[0m`;
        else
            return `\x1b[0m󱥸 \x1b[1;92mVLab v0.1\x1b[0m 󰇘 \x1b[1;32m${this.vlab.GetCurrentLab() ? this.vlab.GetCurrentLab()?.name : "/"}\x1b[1;92m $ \x1b[0m`;
        }

    private SetupListeners() {
        this.rl?.on("line", async (line) => {
            const input = line.trim();
            let err = await HandleCommand(input);
            if (err) console.log("\x1b[1;90m" + "Error: " + err + "\x1b[0m");
            this.rl?.prompt();
        });
        this.rl?.on("close", () => {
            if (!this.paused) {
                console.log("exit");
                process.exit(0);
            }
        });
    }

    public RefreshPrompt() {
        this.rl?.setPrompt(this.GetPrompt());
        this.rl?.prompt();
    }

    public Ask(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl?.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
    }

    public Start() {
        this.SetupListeners();
        this.rl?.prompt();
    }

    public async Pause() {
        this.paused = true;
        this.rl?.close();
        this.rl = undefined;
    }

    public async Resume() {
        this.paused = false;
        this.InitReadline();
        this.SetupListeners();
        this.RefreshPrompt();
    }

    public async ShellIn(target: string) {
        this.shellMode = true;
        this.shellTarget = target;
    }

    public async ShellOut() {
        this.shellMode = false;
    }
}