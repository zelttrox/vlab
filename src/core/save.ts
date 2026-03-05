import * as fs from "fs";
import { Lab } from "../models/lab";
import { vlab } from "./handlers";

// Save a lab and export as JSON in /data
export function Save(lab: Lab | null) {
    if (!lab) return "Error: Lab is null";
    const data = JSON.stringify(lab);
    fs.writeFileSync(`./data/${lab.name}.json`, data);
    lab.saved = true;
}

// Remove a lab save
export function Unsave(lab: Lab | null) {
    if (!lab) return "Error: Lab is null";
    fs.rmSync(`./data/${lab.name}.json`);
    lab.saved = false;
}

// Check if a save exists
export function SaveExists(lab: Lab | null): boolean {
    if (lab) return (fs.existsSync(`./data/${lab.name}.json`))
    else return false;
}

// Load a saved lab by importing JSON data
export function Load(labname: string) {
    try {
        const raw = fs.readFileSync(`./data/${labname}.json`, "utf-8");
        const data = JSON.parse(raw);
        let newLab = new Lab(labname);
        newLab.hosts = data.hosts;
        newLab.networks = data.networks;
        vlab.AddLab(newLab);
        newLab.saved = true;
    } catch (err) { console.error(err) };
}

// Check saved labs from /data
export function CheckSaves(): string[] {
    const saves = fs.readdirSync("./data")
    saves.splice(saves.findIndex((e) => (e == 'history.txt')), 1);
    return saves.map(save => save.slice(0, -5));
}
