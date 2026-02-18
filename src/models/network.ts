import * as Docker from "dockerode";
export class Network {
    name: string;
    driver?: string;
    ipRange?: string;
    subnet?: string;
    gateway?: string;
    docker?: Docker.Network;

    constructor(name: string) {
        this.name = name;
    }

    public CheckNetwork() {
        console.log(`\x1b[0m[\x1b[36mNetwork \x1b[96m${this.name}\x1b[0m]\x1b[0m`);
        console.log(`  \x1b[36mDriver: \x1b[0m${this.driver}`);
        console.log(`  \x1b[36mIP Range: \x1b[0m${this.ipRange}`);
        console.log(`  \x1b[36mSubnet: \x1b[0m${this.subnet}`);
        console.log(`  \x1b[36mGateway: \x1b[0m${this.gateway}`);
    }
}
