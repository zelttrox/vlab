import { Host } from "../models/host";
import { Lab } from "../models/lab";
import { Network } from "../models/network";

export function DisplayNew(name: string, type: string) {
    console.log(`   󱞩 (${type}s) ${name} has been created successfully \n\x1b[0m   !  you can run 'show ${type}s' to view all ${type}s\x1b[0m`)
}