import { Volume } from "dockerode";
import { Host } from "../models/host";
import { Network } from "../models/network";
import { VLab } from "../models/vlab";

// Set default required values for host creation
export function SetDefaultHost(host: Host): Host {
    host.image = "ubuntu";
    host.shell = "/bin/bash";
    host.ipv4 = "10.10.0.1";
    return host;
}

// Set default required values for network creation
export function SetDefaultNetwork(network: Network): Network {
    network.driver = "bridge";
    network.ipRange = "10.10.0.0/24";
    network.subnet = "10.10.0.0/24";
    network.gateway = "10.10.0.1"
    return network;
}

// Verify if container name is valid
export function IsNameValid(name: string) {
    if (name == "" || name == undefined) return false
    const regex = /^[a-z0-9-_]+$/i
    return regex.test(name)
}

// Check if host exists
export function HostExists(host: Host | undefined, hostname: string) {
    if (host != undefined) return true;
    else {
        console.log(`Host ${hostname} does not exist`);
        return false;
    }
}

// Display new object
export function DisplayNew(name: string, type: string) {
    console.log(`+ ${type}: ${name}`)
}

// Display deleted object
export function DisplayDeleted(name: string, type: string) {
    console.log(`- ${type}: ${name}`)
}