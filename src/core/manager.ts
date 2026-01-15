import { Host } from "../models/host";
import { Network } from "../models/network";
import * as data from "./data";

// Add a new host
export function AddHost(host: Host) {
    data.hosts.push(host)
    console.log(data.hosts)
}

// Add a newt network
export function AddNetwork(network: Network) {
    data.networks.push(network)
    console.log(data.networks)
}