import { Host } from "../models/host"
import { Network } from "../models/network"
import * as manager from "./manager"

// Run commands based on cli's user input
export function RunCommand(action: string, type?: string, object?: string, option?: string) {
    switch (action) {
        case "create":
            switch (type) {
                case "host":
                    console.log("Adding host:", object)
                    manager.AddHost(new Host(object || "", "Ubuntu 24.04"))
                    break
                case "network":
                    console.log("Adding network:", object)
                    manager.AddNetwork(new Network(object || "", "10.10.0.1"))
                    break
                default:
                    return Error(`Unknown action type ${type}`)
            }
            break
        default:
            return Error(`Unkown command ${action}'`)
    }
}