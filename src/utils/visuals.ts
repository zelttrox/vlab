import { Host } from "../models/host";
import { Lab } from "../models/lab";
import { Network } from "../models/network";

export function DisplayNew(name: string, type: string) {
    console.log(`   󱞩 (\x1b[1;33m${type}s\x1b[0m) \x1b[1m${name}\x1b[1;33m is ready! \n\x1b[0m   !  you can run 'show ${type}s' to view all ${type}s\x1b[0m\n   !  or you can run 'check ${type} ${name}' to view ${name}'s infos\x1b[0m`)
}

export function DisplayDeleted(name: string, type: string) {
    console.log(`   󱞩 (\x1b[1;33m${type}s\x1b[0m) \x1b[1m${name}\x1b[1;33m was deleted\x1b[0m`)
}