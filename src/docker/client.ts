import Docker from "dockerode";
import {spawn} from "child_process"

import { Host } from "../models/host";
import { Network } from "../models/network";

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
            Cmd: ["tail", "-f", "/dev/null"],
            name: host.name,
            OpenStdin: true,
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
export async function ExecContainer(host: Host): Promise<void> {
    if (!host.docker) return;
    
    const childProcess = spawn("docker", ["exec", "-it", host.name, host.shell], {
        stdio: "inherit",
        shell: false
    });
    
    return new Promise<void>((resolve) => {
        childProcess.on("exit", async () => {
            resolve();
        });
        childProcess.on("error", (err) => {
            console.error("Docker exec error:", err);
            resolve();
        });
    });
}

// Exec a command in docker container
export async function ExecCommand(host: Host, cmd: string[]) {
    if (!host.docker) return;
    const exec = await host.docker.exec({
        Cmd: cmd,
        AttachStderr: false,
        AttachStdout: false,
    })
    exec.start({Detach: true});
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