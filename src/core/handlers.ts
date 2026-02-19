// Models
import { Host } from "../models/host";
import { Network } from "../models/network";
import { Lab } from "../models/lab";
import { VLab } from "../models/vlab";
import { VShell } from "../models/vshell"
// Utils
import * as docker from "../docker/client";
import * as visuals from "../utils/visuals";
import * as verify from "../utils/verify";
// CLI
import * as interactive from "./interactive";
import * as def from "../utils/default";

// Init variables
export var vlab = new VLab()
export const vshell = new VShell(vlab)

// ###############
// ###  HOSTS  ###
// ###############

// CREATE new host in current lab
// create host <hostname>
export async function CreateHost(hostname: string) {
    if (!verify.IsNameValid(hostname)) return `Invalid container name '${hostname}'`;
    let host = new Host(hostname)
    host = def.SetDefaultHost(host)
    host = await interactive.DefineHost(vshell, host);
    vlab.GetCurrentLab()?.AddHost(host);
    host.docker = await docker.CreateContainer(host);
    visuals.DisplayNew(hostname, "host");
    vshell.RefreshPrompt()
}

// DELETE host using host name
// delete host <hostname>
export function DeleteHost(hostname: string) {
    const host = vlab.GetCurrentLab()?.FindHostByName(hostname);
    if (host) {
        vlab.GetCurrentLab()?.DeleteHost(host);
        visuals.DisplayDeleted(hostname, "host");
    }
}

// CONNECT host to network in same lab
// connect <hostname> <netname>
export async function ConnectHost(hostname: string, netname: string) {
    const host = vlab.GetCurrentLab()?.FindHostByName(hostname);
    const network = vlab.GetCurrentLab()?.FindNetworkByName(netname);
    if (network && host) {
        await docker.ConnectHost(host, network);
        host?.networks.push(network);
    }
}

// START host using host name
// start <hostname>
export function StartHost(hostname: string) {
    const host = vlab.GetCurrentLab()?.FindHostByName(hostname);
    if (host?.docker) {
        docker.StartContainer(host.docker);
        host.status = "up";
        console.log(`${hostname} is up!`);
    }
}

// SHELL into host using host name
// shell host <hostname>
export function ShellHost(hostname: string) {
    const host = vlab.GetCurrentLab()?.FindHostByName(hostname);
    if (!host) console.log(`Host ${hostname} does not exist`)
    else if (host?.status == "down") console.log(`Host ${hostname} is down`)
    else if (host?.name) vshell.ShellIn(host?.name)
    else console.log(`Host ${hostname} does not exist`)
}

// EXEC command inside host using host name
// (no command)
export async function ExecHost(hostname: string, command: string[]) {
    const host = vlab.GetCurrentLab()?.FindHostByName(hostname)
    if (!host?.docker) return;
    const output = await docker.ExecContainer(host?.docker, command, vshell)
    console.log(output)
}

// SHOW all hosts in current lab
// show hosts
export function ShowHosts() {
    vlab.GetCurrentLab()?.ShowHosts();
}

// CHECK host using host name
// check host <hostname>
export function CheckHost(hostname: string) {
    vlab.GetCurrentLab()?.FindHostByName(hostname).CheckHost();
}

// ##################
// ###  NETWORKS  ###
// ##################

// CREATE new network in current lab
// create network <netname>
export async function CreateNetwork(netname: string) {
    if (!verify.IsNameValid(netname)) return `Invalid network name '${netname}`;
    let network = new Network(netname);
    network = def.SetDefaultNetwork(network);
    network = await interactive.DefineNetwork(vshell, network);
    vlab.GetCurrentLab()?.AddNetwork(network);
    network.docker = await docker.CreateNetwork(network);
    visuals.DisplayNew(netname, "network");
    vshell.RefreshPrompt()
}

// DELETE network using net name
// delete network <netname>
export function DeleteNetwork(netname: string) {
    const netw = vlab.GetCurrentLab()?.FindNetworkByName(netname);
    if (netw) {
        vlab.GetCurrentLab()?.DeleteNetwork(netw);
        visuals.DisplayDeleted(netname, "network");
    }
}

// SHOW all networks in current lab
// show networks
export function ShowNetworks() {
    console.log(vlab.GetCurrentLab()?.ShowNetworks());
}

// CHECK network using net name
// check network <netname>
export function CheckNetwork(netname: string) {
    console.log(vlab.GetCurrentLab()?.FindNetworkByName(netname).CheckNetwork());
}

// ##############
// ###  LABS  ###
// ##############

// CREATE new lab
// create lab <labname>
export async function CreateLab(labname: string, scut: string) {
    if (!verify.IsNameValid(labname))
        return `Invalid lab name ${labname}`;
    vlab.AddLab(new Lab(labname));
    visuals.DisplayNew(labname, "lab");
    if (scut == "&") {
        await docker.ClearContainers();
        await docker.ClearNetworks();
        vlab.EnterLab(vlab.FindLabByName(labname));
        vshell?.RefreshPrompt();
    }
}

// DELETE lab using lab name
// delete lab <labname>
export function DeleteLab(labname: string) {
    if (labname == "*") {
        vlab.labs.forEach((lab) => {
            vlab.DeleteLab(lab);
            visuals.DisplayDeleted(labname, "lab");
        });
        return;
    }
    else if (vlab.FindLabByName(labname).name == "") return `Lab ${labname} does not exist`;
    vlab.DeleteLab(vlab.FindLabByName(labname));
    visuals.DisplayDeleted(labname, "lab");
}

// CHECK lab using lab name
// check lab <labname>
export function CheckLab(labname: string) {
    if (vlab.FindLabByName(labname).name == "")
        return `Lab ${labname} does not exist`;
        vlab.CheckLab(vlab.FindLabByName(labname));
}

// SHELL into lab using lab name
// shell lab <labname>
export async function ShellLab(labname: string) {
    if (vlab.FindLabByName(labname).name == "") return `Lab ${labname} does not exist`;
    await docker.ClearContainers();
    await docker.ClearNetworks();
    vlab.EnterLab(vlab.FindLabByName(labname));
    vshell?.RefreshPrompt();
}

// GO BACK to VLab root
// go back
export function GoBack() {
    vlab.SetCurrentLab(null);
    vshell?.RefreshPrompt();
}