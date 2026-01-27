import { Host } from "../models/host";
import { Network } from "../models/network";
import { VShell } from "../models/vshell";

// Interactive prompting for host creation
export async function DefineHost(vshell: VShell, host: Host): Promise<Host> {
   host.image = await vshell?.Ask("Host Image: ")
   host.shell = await vshell?.Ask("Host shell: ")
   host.ipv4 = await vshell?.Ask("IPv4: ")
   return new Promise((resolve) => {resolve(host)})
}

// Interactive prompting for network creation
export async function DefineNetwork(vshell: VShell, network: Network): Promise<Network> {
   network.driver = await vshell?.Ask("Driver (host|bridge|overlay|macvlan): ")
   network.ipRange = await vshell?.Ask("Public IP: ")
   network.ipRange = await vshell?.Ask("Subnet: ")
   network.ipRange = await vshell?.Ask("Gateway: ")
   return new Promise((resolve) => { resolve(network) })
}