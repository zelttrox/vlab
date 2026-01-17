import { Host } from "../models/host";
import { Lab } from "../models/lab";
import { Network } from "../models/network";

// LABS
export var labs: Lab[] = []
export var current_lab: Lab
// Add new lab
export function AddLab(lab: Lab) {
    labs.push(lab)
}
// Delete existing lab
export function DeleteLab(lab: Lab) {
    labs.splice(labs.indexOf(lab))
}
// Return Lab object from labs array using name
export function FindLabByName(name: string): Lab {
    let result: Lab = new Lab("")
    labs.forEach(lab => {if (lab.name == name) result = lab})
    return result.name == name ? result : new Lab("")
}
// Show name, hosts and networks of given lab
// TODO: Make the display prettier + with colors
export function ShowLab(lab: Lab) {
    console.log(`   [Lab: ${lab.name}]`)
    console.log("   << Hosts >>")
    if (lab.hosts = []) console.log("   none")
    lab.hosts.forEach(host => {
        console.log(`    - ${host.id}:${host.name} (${host.image})`)
    })
    console.log("   << Networks >>")
    if (lab.networks = []) console.log("   none")
    lab.networks.forEach(network => {
        console.log(`    - ${network.name}`)
    })
}
// Enter an existing lab
// FIX: Add lab name to vshell prompt
export function EnterLab(lab: Lab) {
    current_lab = lab;
}

// Hosts
export function AddHost(host: Host) {
    current_lab.hosts.push(host)
}

// Networks
export function AddNetwork(network: Network) {
    current_lab.networks.push(network)
}