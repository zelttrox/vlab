import Docker from "dockerode";
import { Host } from "../models/host";
import { Network } from "../models/network";
import { VShell } from "../models/vshell";

const docker = new Docker();

// Create and return docker container
export async function CreateContainer(host: Host) {
    // docker pull <image>
    docker.pull(host.image, (err: Error) => {
        if (err) console.log("Error pulling image:", err);
    });
    // docker run <param>
    try {
        const container = await docker.createContainer({
            Image: host.image,
            Cmd: [host.shell, "-c", "sleep infinity"],
            name: host.name,
        });
        return container;
    } catch (err) {
        console.log("Error creating container:", err);
    }
}

// Start docker container
export function StartContainer(container: Docker.Container) {
    container.start();
}

// Exec docker container
export async function ExecContainer(container: Docker.Container, args: string[], vshell: VShell): Promise<string> {
    let cwd = vshell.cwd || "/";
    const cmd = args[0];
    // cd command (update cwd)
    if (cmd === "cd") {
        let newPath = args[1] || "/";
        if (!newPath.startsWith("/") && newPath != "..") { newPath = (cwd === "/" ? "/" : cwd + "/") + newPath; }
        vshell.cwd = newPath;
        vshell.RefreshPrompt();
        return "";
    }
    // other commands
    const exec = await container.exec({
        Cmd: ["/bin/bash", "-c", `cd ${cwd} && ${args.join(" ")}`],
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
    });

    const stream = await exec.start({ hijack: true });
    let out = "";
    let err = "";

    container.modem.demuxStream(
        stream,
        { write: (chunk: Buffer) => { out += chunk.toString(); } } as any,
        { write: (chunk: Buffer) => { err += chunk.toString(); } } as any
    );
    await new Promise<void>((resolve, reject) => {
        stream.on("end", resolve);
        stream.on("error", reject);
    });
    return out;
}

// Remove all containers
export async function ClearContainers() {
    try {
        const containers = await docker.listContainers({ all: true });
        for (const cont of containers) {
            const container = docker.getContainer(cont.Id);
            await container.stop().catch(() => { });
            await container.remove({ force: true });
        }
    } catch (err) {
        console.log("Error clearing containers:", err);
    }
}

// Remove all networks
export async function ClearNetworks() {
    const preDefined = ["bridge", "host", "none"];
    try {
        const networks = await docker.listNetworks();
        for (const netw of networks) {
            if (!preDefined.includes(netw.Name)) {
                const network = docker.getNetwork(netw.Id);
                await network.remove({ force: true });
            }
        }
    } catch (err) {
        console.log("Error clearing networks:", err);
    }
}

// Create network
export function CreateNetwork(network: Network) {
    try {
        const netw = docker.createNetwork({
            Name: network.name,
            Driver: network.driver,
            IPAM: {
                Config: [
                    {
                        Subnet: network.subnet,
                        IPRange: network.ipRange,
                        Gateway: network.gateway,
                    },
                ],
            },
        });
        return netw;
    } catch (err) {
        console.error("Error creating network:", err);
    }
}

// Attach network to host
export async function ConnectHost(host: Host, network: Network) {
    console.log("connecting", host.name, "to", network.name);
    await network.docker?.connect({
        Container: host.name,
        EndpointConfig: {
            IPAMConfig: {
                IPv4Address: host.ipv4,
            },
        },
    });
}