import { Host } from "../models/host"
import { Network } from "../models/network"
import * as manager from "./manager"
import * as data from "../../vlab"
import * as visuals from "../utils/visuals"
import * as verify from "../utils/verify"

// Run commands based on cli's user input
export function RunCommand(command: string) {
    var expr: string[] = command.split(" ")
    if (data.lab) {
        switch (expr[0]) {
        case "create":
            switch (expr[1]) {
            case "host":
                if (!verify.IsContainerNameValid(expr[2])) return `Invalid container name '${expr[2]}'`
                manager.AddHost(new Host("983274982173", expr[2], "Ubuntu 24.04", "Down", new Date(), new Date(), [], "10.0.0.1", "", "10.0.0.0", []))
                visuals.DisplayNew(expr[2], expr[1])
                break
            default: return `Unknown command 2'${command}'`
        }
        break
        default: return `Unknown command 1'${command}'`
        }
    }
    else {}
}