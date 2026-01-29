
// Import handlers and vlab const
import * as handler from "../core/handlers"

// Determinate command based on vshell user input
export async function HandleCommand(command: string) {
    if (command == "") return;
    var expr: string[] = command.split(" ");
    if (handler.vlab.GetCurrentLab()) {
        // GO BACK to root
        if (expr[0] == "/" || (expr[0] == "go" && expr[1] == "back")) {
            handler.GoBack();
            return;
        }
        // Level 2 commands (inside a lab)
        switch (expr[0]) {
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
                handler.StartHost(expr[2]);
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
        else if (expr[0] == "delete" && expr[1] == "lab" && expr[2] != "") handler.DeleteLab(expr[2])
        else if (expr[0] == "show" && expr[1] == "labs") handler.vlab.ShowLabs();
        else if (expr[0] == "check" && expr[1] == "lab" && expr[2] != "") handler.CheckLab(expr[2])
        else if (expr[0] == "shell" && expr[1] == "lab" && expr[2] != "") handler.ShellLab(expr[2])
        else return `Invalid command`;
    }
}
