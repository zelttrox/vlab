import { Host } from "../models/host";
import { Network } from "../models/network";
import { VShell } from "../models/vshell";

// Interactive prompting for host creation
export async function DefineHost(vshell: VShell, host: Host): Promise<Host> {
    host.image = await vshell?.Ask("Host Image: ")
    return new Promise((resolve) => {resolve(host)})
}

// Interactive prompting for network creation
export async function DefineNetwork(vshell: VShell, network: Network): Promise<Network> {
    network.ip = await vshell?.Ask("Public IP: ")
    return new Promise((resolve) => {resolve(network)})
}