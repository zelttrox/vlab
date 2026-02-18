import { Host } from "../models/host";
import { Network } from "../models/network";
import { VShell } from "../models/vshell";

// Interactive prompting for host creation
export async function DefineHost(vshell: VShell, host: Host): Promise<Host> {
    let image = await vshell?.Ask("Host Image: ");
    let shell = await vshell?.Ask("Host shell: ");
    let ipv4 = await vshell?.Ask("IPv4: ");
    if (image != "") host.image = image;
    if (shell != "") host.shell = shell;
    if (ipv4 != "") host.ipv4 = ipv4;
    return new Promise((resolve) => { resolve(host) });
}

// Interactive prompting for network creation
export async function DefineNetwork(vshell: VShell, network: Network): Promise<Network> {
    network.driver = await vshell?.Ask("Driver (host|bridge|overlay|macvlan): ",);
    network.ipRange = await vshell?.Ask("IP Range: ");
    network.subnet = await vshell?.Ask("Subnet: ");
    network.gateway = await vshell?.Ask("Gateway: ");
    return new Promise((resolve) => { resolve(network) });
}
