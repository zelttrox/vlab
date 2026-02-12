import * as fs from "fs";
import { Lab } from "../models/lab";

// Save a lab and export as JSON in /data
export default function Save(lab: Lab | null, file: string) {
    if (!lab) return "Error: Lab is null"
    const data = JSON.stringify(lab)
    fs.writeFileSync(file, data)
}