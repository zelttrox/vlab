// Models
import { Lab } from "../models/lab"
import { Host } from "../models/host"
import { Network } from "../models/network"
import { VShell } from "../models/vshell"
// Utils
import * as docker from "../docker/client"
import * as visuals from "../utils/visuals"
import * as verify from "../utils/verify"
// VLab
import { vlab } from "../../vlab"
import { DefineHost, DefineNetwork } from "./interactive"

// Determinate command based on vshell user input
export async function HandleCommand(command: string, vshell: VShell) {
    var expr: string[] = command.split(" ")
    // Level 2 commands (inside a lab)
    if (expr[0] == "mylab") console.log(vlab.GetCurrentLab()) 
    if (vlab.GetCurrentLab()) {
        // GO BACK TO /
        if (expr[0] == "goback" || expr[0] == "/" || (expr[0] == "go" && expr[1] == "back")) {
            vlab.SetCurrentLab(null)
            vshell?.RefreshPrompt()
            return
        }
        switch (expr[0]) {
        case "create":
            switch (expr[1]) {
            // CREATE HOST
            case "host":
                if (!verify.IsNameValid(expr[2])) return `Invalid container name '${expr[2]}'`
                const host = await DefineHost(vshell, new Host(expr[2]))
                vlab.GetCurrentLab()?.AddHost(host)
                visuals.DisplayNew(expr[2], expr[1])
                host.docker = await docker.CreateContainer(host)
                return
            // CREATE NETWORK
            case "network":
                if (!verify.IsNameValid(expr[2])) return `Invalid network name '${expr[2]}`
                const network = await DefineNetwork(vshell, new Network(expr[2]))
                vlab.GetCurrentLab()?.AddNetwork(network)
                visuals.DisplayNew(expr[2], expr[1])
                return
            default: return `Unknown command '${command}'`
        }
        case "show":
            switch (expr[1]) {
            // SHOW HOSTS
            case "hosts":
                console.log(vlab.GetCurrentLab()?.ShowHosts())
                break
            // SHOW NETWORKS
            case "networks":
                console.log(vlab.GetCurrentLab()?.ShowNetworks())
                break
            default: return `Invalid command '${command}'`
            }
        break
        case "check":
            switch (expr[1]) {
            case "host":
                console.log(vlab.GetCurrentLab()?.FindHostByName(expr[2]).CheckHost())
                return
            default: return `Invalid command '${command}'`
            }
        case "delete":
            switch (expr[1]) {
            // DELETE HOST
            case "host":
                const host = vlab.GetCurrentLab()?.FindHostByName(expr[2])
                if (host) {
                    vlab.GetCurrentLab()?.DeleteHost(host)
                    visuals.DisplayDeleted(expr[2], expr[1])
                }
                break
            // DELETE NETWORK
            case "network":
                const network = vlab.GetCurrentLab()?.FindNetworkByName(expr[2])
                if (network) {
                    vlab.GetCurrentLab()?.DeleteNetwork(network)
                    visuals.DisplayDeleted(expr[2], expr[1])
                }
                break
            default: return `Invalid command '${command}'`
            }
        case "start":
            const host = vlab.GetCurrentLab()?.FindHostByName(expr[1])
            if (host?.docker) {
                docker.StartContainer(host.docker)
                console.log(`${host.name} is up!`)
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
            if (expr[3] == "&") {
                docker.ClearContainers()
                vlab.EnterLab(vlab.FindLabByName(expr[2]))
                vshell?.RefreshPrompt()
            }
        }
        // DELETE LAB
        // FIX * FEATURE (DELETE ALL)
        else if (expr[0] == "delete" && expr[1] == "lab" && expr[2] != "") {
            if (expr[2] == "*") {
                vlab.labs.forEach(lab => {
                    vlab.DeleteLab(lab)
                    visuals.DisplayDeleted(expr[2], expr[1])
                })
            }
            else if (vlab.FindLabByName(expr[2]).name == "") return `Lab ${expr[2]} does not exist`
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
            docker.ClearContainers()
            vlab.EnterLab(vlab.FindLabByName(expr[2]))
            vshell?.RefreshPrompt()
        }
        else return `Invalid command`
    }
}