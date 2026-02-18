// Import handlers and vlab const
import ReportBug from "../beta/bug";
import * as logs from "../beta/logs";
import * as handler from "../core/handlers";
import * as save from "./save";

// Determinate command based on vshell user input
export async function HandleCommand(command: string) {
    if (command == "") return;
    var expr: string[] = command.split(" ");
    // BUG COMMAND
    if (expr[0] == "bug") {
        ReportBug(expr[1]);
        handler.vshell.RefreshPrompt();
        return;
    }
    else logs.LogCommand(command)
    // Level 3 commands (inside a host, inside a lab)
    if (handler.vlab.GetCurrentLab() && handler.vshell.shellMode == true) {
        if (handler.vshell.shellTarget) await handler.ExecHost(handler.vshell.shellTarget, expr)
    }
    else if (handler.vlab.GetCurrentLab() && handler.vshell.shellMode == false) {
        // GO BACK to root
        if (expr[0] == "/" || (expr[0] == "go" && expr[1] == "back")) {
            handler.GoBack();
            return;
        }
        // Level 2 commands (inside a lab)
        switch (expr[0]) {
            case "save":
                save.Save(handler.vlab.GetCurrentLab()); return;
            case "create":
                switch (expr[1]) {
                    case "host": handler.CreateHost(expr[2]); return;
                    case "network": handler.CreateNetwork(expr[2]); return;
                    default: return `Unknown command '${command}'`;
                }
            case "delete":
                switch (expr[1]) {
                    case "host": handler.DeleteHost(expr[2]); break;
                    case "network": handler.DeleteNetwork(expr[2]); break;
                    default: return `Invalid command '${command}'`;
                }
            case "show":
                switch (expr[1]) {
                    case "hosts": handler.ShowHosts(); break;
                    case "networks": handler.ShowNetworks(); break;
                    default: return `Invalid command '${command}'`;
                }
                break;
            case "check":
                switch (expr[1]) {
                    case "host": handler.CheckHost(expr[2]); return;
                    case "network": handler.CheckNetwork(expr[2]); return;
                    default: return `Invalid command '${command}'`;
                }
            case "connect":
                handler.ConnectHost(expr[2], expr[3]);
                break;
            case "start":
                handler.StartHost(expr[1]);
                break;
            case "shell":
                handler.ShellHost(expr[2]);
                break;
            case "exit":
                handler.vshell.ShellOut();
                break;
            default: return `Unknown command '${command}'`;
        }
    }
    // Level 1 commands (inside vshell only)
    else {
        if (expr[0] == "create" && expr[1] == "lab" && expr[2] != "") handler.CreateLab(expr[2], expr[3])
        else if (expr[0] == "load" && expr[1] != null) {
            console.log("loading", expr[1]);
            save.Load(expr[1]);
        }
        else if (expr[0] == "delete" && expr[1] == "lab" && expr[2] != "") handler.DeleteLab(expr[2])
        else if (expr[0] == "show" && expr[1] == "labs") handler.vlab.ShowLabs();
        else if (expr[0] == "check" && expr[1] == "lab" && expr[2] != "") handler.CheckLab(expr[2])
        else if (expr[0] == "shell" && expr[1] == "lab" && expr[2] != "") handler.ShellLab(expr[2])
        else return `Invalid command`;
    }
}