// Models
import { Lab } from "../models/lab"
import { Host } from "../models/host"
import { Network } from "../models/network"
// Utils
import * as visuals from "../utils/visuals"
import * as verify from "../utils/verify"
// VLab
import { vlab } from "../../vlab"

// Determinate command based on vshell user input
export function HandleCommand(command: string) {
    var expr: string[] = command.split(" ")
    // Level 2 commands (inside a lab)
    if (vlab.GetCurrentLab()) {
        switch (expr[0]) {
        case "create":
            switch (expr[1]) {
            // CREATE HOST
            case "host":
                if (!verify.IsNameValid(expr[2])) return `Invalid container name '${expr[2]}'`
                vlab.GetCurrentLab()?.AddHost(new Host("983274982173", expr[2], "Ubuntu 24.04", "Down", new Date(), new Date(), [], "10.0.0.1", "", "10.0.0.0", []))
                visuals.DisplayNew(expr[2], expr[1])
                break
            // CREATE NETWORK
            case "network":
                if (!verify.IsNameValid(expr[2])) return `Invalid network name '${expr[2]}`
                vlab.GetCurrentLab()?.AddNetwork(new Network(expr[2], "10.10.2.0"))
                visuals.DisplayNew(expr[2], expr[1])
                break
            default: return `Unknown command '${command}'`
        }
        break
        default: return `Unknown command '${command}'`
        }
    }
    // Level 1 commands (inside vshell only)
    else {
        // CREATE LAB
        if (expr[0] == "create" && expr[1] == "lab" && expr[2] != "") {
            if (!verify.IsNameValid(expr[2])) return `Invalid lab name ${expr[2]}`
            vlab.AddLab(new Lab(expr[2]))
            visuals.DisplayNew(expr[2], expr[1])
        }
        // DELETE LAB
        else if (expr[0] == "delete" && expr[1] == "lab" && expr[2] != "") {
            if (vlab.FindLabByName(expr[2]).name == "") return `Lab ${expr[2]} does not exist`
            vlab.DeleteLab(vlab.FindLabByName(expr[2]))
            visuals.DisplayDeleted(expr[2], expr[1])
        }
        // SHOW LABS
        else if (expr[0] == "show" && expr[1] == "lab" && expr[2] != "") {
            if (vlab.FindLabByName(expr[2]).name == "") return `Lab ${expr[2]} does not exist`
            vlab.ShowLab(vlab.FindLabByName(expr[2]))
        }
        // ENTER LAB
        else if (expr[0] == "enter" && expr[1] == "lab" && expr[2] != "") {
            if (vlab.FindLabByName(expr[2]).name == "") return `Lab ${expr[2]} does not exist`
            vlab.EnterLab(vlab.FindLabByName(expr[2]))
        }
        else return `Invalid command`
    }
}