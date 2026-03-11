import * as fs from "fs";
import * as docker from "../docker/client"
import { Lab } from "../models/lab";
import { vlab } from "./handlers";

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
        newLab.hosts = data.hosts;
        newLab.networks = data.networks;
        vlab.AddLab(newLab);
        newLab.saved = true;
        newLab.hosts.forEach(host => {
            docker.LoadContainer(host, newLab);
        })
        newLab.networks.forEach(netw => {
            docker.CreateNetwork(netw);
        })
    } catch (err) { console.error(err) };
}

// Check saved labs from /data
export function CheckSaves(): string[] {
    const saves = fs.readdirSync("./data")
    saves.splice(saves.findIndex((e) => (e == 'history.txt')), 1);
    return saves;
}
