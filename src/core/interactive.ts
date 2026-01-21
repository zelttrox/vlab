import { Host } from "../models/host";
import { Network } from "../models/network";
import { VShell } from "../models/vshell";

// Interactive prompting for host creation
export async function DefineHost(vshell: VShell, host: Host): Promise<Host> {
    host.image = await vshell?.Ask("Host Image: ")
    host.shell = await vshell?.Ask("Host shell: ")
    return new Promise((resolve) => {resolve(host)})
}

// Interactive prompting for network creation
export async function DefineNetwork(vshell: VShell, network: Network): Promise<Network> {
    network.driver = await vshell?.Ask("Driver (host|bridge|overlay|macvlan): ")
    network.ip = await vshell?.Ask("Public IP: ")
    network.ip = await vshell?.Ask("Subnet: ")
    network.ip = await vshell?.Ask("Gateway: ")
    return new Promise((resolve) => {resolve(network)})
}