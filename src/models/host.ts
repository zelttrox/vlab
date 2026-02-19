import Docker, { Container } from "dockerode";
import { Network } from "./network";

export class Host {
    // Config
    public name: string;
    public image: string;
    public shell: string;
    public networks: Network[];
    public ports: number[];
    public ipv4?: string;

    public docker?: Docker.Container;
    public status: string

    constructor(name: string, image: string = "ubuntu", shell: string = "/bin/bash") {
        this.name = name;
        this.image = image;
        this.shell = shell;
        this.networks = [];
        this.ports = [];
        this.status = "down"
    }

    public CheckHost() {
        console.log(`\x1b[0m[\x1b[36mHost \x1b[96m${this.name}\x1b[0m]\x1b[0m`);
        console.log(`  \x1b[36mStatus: \x1b[0m${this.status}`);
        console.log(`  \x1b[36mImage: \x1b[0m${this.image}`);
        console.log(`  \x1b[36mShell: \x1b[0m${this.shell}`);
        console.log(`  \x1b[36mIPv4: \x1b[0m${this.ipv4}`);
        this.networks.forEach(network => {console.log(`  \x1b[36mNetwork: \x1b[0m${network.name}`);})
    }
}
