import { Host } from "./host";
import { Network } from "./network";

export class Lab {
    public name: string;
    public hosts: Host[];
    public networks: Network[];
    public saved: boolean = false;

    constructor(name: string, hosts: Host[] = [], networks: Network[] = []) {
        this.name = name;
        this.hosts = hosts;
        this.networks = networks;
    }

    public AddHost(host: Host) {
        this.hosts.push(host);
    }

    public AddNetwork(network: Network) {
        this.networks.push(network);
    }

    public DeleteHost(host: Host) {
        this.hosts.splice(this.hosts.indexOf(host));
    }

    public DeleteNetwork(network: Network) {
        this.networks.splice(this.networks.indexOf(network));
    }

    public FindHostByName(name: string) {
        let result: Host = new Host("");
        this.hosts.forEach((host) => {
            if (host.name == name) result = host;
        });
        return result.name == name ? result : new Host("");
    }

    public FindNetworkByName(name: string) {
        let result: Network = new Network("");
        this.networks.forEach((network) => {
            if (network.name == name) result = network;
        });
        return result.name == name ? result : new Network("");
    }

    public ShowHosts() {
        this.hosts.forEach((host) => {
            console.log(
                `\x1b[0m \x1b[1m${host.name} \x1b[0m(${host.docker?.id})`,
            );
        });
    }

    public ShowNetworks() {
        this.networks.forEach((network) => {
            console.log(
                `\x1b[0m \x1b[1m${network.name} \x1b[0m(${network.docker?.id})`,
            );
        });
    }
}
