import * as fs from "fs";
import * as docker from "../docker/client"

import { Lab } from "../models/lab";
import { vlab } from "./handlers";
import { Host } from "../models/host";
import { Network } from "../models/network";

// Save a lab and export as JSON in /data
export function Save(lab: Lab | null) {
    if (!lab) return "Error: Lab is null";
    const data = JSON.stringify(lab);
    if (!SaveExists(lab)) fs.mkdirSync(`./data/${lab.name}`)
    fs.writeFileSync(`./data/${lab.name}/config.json`, data);
    lab.hosts.forEach( async (host) => {
        await docker.SaveContainer(host, lab);
    })
    fs.chmodSync(`./data/${lab.name}`, fs.constants.S_IRWXU | fs.constants.S_IRWXG | fs.constants.S_IRWXO);
    lab.saved = true;
    console.log("Lab saved")
}

// Remove a lab save
export function Unsave(lab: Lab | null) {
    if (!lab) return "Error: Lab is null";
    fs.rmSync(`./data/${lab.name}`, { recursive: true });
    lab.saved = false;
}

// Check if a save exists
export function SaveExists(lab: Lab | null): boolean {
    if (lab) return (fs.existsSync(`./data/${lab.name}`))
    else return false;
}

// Load a saved lab by importing JSON data
export function Load(labname: string) {
    try {
        const raw = fs.readFileSync(`./data/${labname}/config.json`, "utf-8");
        const data = JSON.parse(raw);
        let newLab = new Lab(labname);
        // Import hosts
        const hostsData: Host[] = data.hosts;
        hostsData.forEach(hostData => {
            newLab.hosts.push(new Host(hostData.name, hostData.image, hostData.shell));
        })
        // Import networks
        const networksData: Network[] = data.networks;
        networksData.forEach(networkData => {
            newLab.networks.push(new Network(networkData.name));
        })
        // Load hosts
        newLab.hosts.forEach(async (host) => {
            host.docker = await docker.LoadContainer(host, newLab);
        })
        // Load networks
        newLab.networks.forEach(netw => {
            docker.CreateNetwork(netw);
        })
        newLab.saved = true;
        vlab.AddLab(newLab);
    } catch (err) { console.error(err) };
}

// Check saved labs from /data
export function CheckSaves(): string[] {
    const saves = fs.readdirSync("./data")
    saves.splice(saves.findIndex((e) => (e == 'history.txt')), 1);
    return saves;
}
