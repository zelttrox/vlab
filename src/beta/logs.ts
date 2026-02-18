import * as fs from "fs";

export var lastAction: string;

// Log a command to the history
export function LogCommand(cmd: string) {
    lastAction = cmd;
    fs.appendFileSync("./data/history.txt", cmd + "\n");
}

// Read history logs
export function ReadLogs(): string {
    const history = fs.readFileSync("./data/history.txt");
    return history.toString();
}

// Clear history logs
export function ClearLogs() {
    fs.writeFileSync("./data/history.txt", "")
}