import { Host } from "../models/host";

// Set default required values for host creation
export function SetDefaultHost(host: Host): Host {
    host.image = "ubuntu";
    host.shell = "/bin/bash"
    host.ipv4 = "10.10.0.1"
    return host
}