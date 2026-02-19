import { Host } from "../models/host";
import { Network } from "../models/network";

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
