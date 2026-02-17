import * as fs from "fs";
import { Lab } from "../models/lab";
import { vlab } from "./handlers";

// Save a lab and export as JSON in /data
export function Save(lab: Lab | null) {
    if (!lab) return "Error: Lab is null"
    const data = JSON.stringify(lab)
    if (!fs.existsSync(`./data/${lab.name}.json`)) fs.appendFileSync(`./data/${lab.name}.json`, data)
    else console.error(`Save for lab ${lab.name} already exists`)
}

// Load a saved lab by importing JSON data
export async function Load(labname: string) {
    try {
        const raw = fs.readFileSync(`./data/${labname}.json`, "utf-8")
        const data = JSON.parse(raw)
        let newLab = new Lab(labname)
        newLab.hosts = data.hosts
        newLab.networks = data.networks
        vlab.AddLab(newLab)
        console.log("added lab", newLab)
    }
    catch (err) {
        console.error(err)
   }
}