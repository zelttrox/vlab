import * as client from "../docker/client"
import { Network } from "../models/network";

const docker = client.docker;

// Remove all networks
export async function ClearNetworks() {
   const preDefined = ["bridge", "host", "none"];
   try {
      const networks = await docker.listNetworks();
      for (const netw of networks) {
         if (!preDefined.includes(netw.Name)) {
            const network = docker.getNetwork(netw.Id);
            await network.remove({ force: true });
         }
      }
   } catch (err) {
      console.log("Error clearing networks:", err);
   }
}

// Create network
export function CreateNetwork(network: Network) {
   try {
      const netw = docker.createNetwork({
         Name: network.name,
         Driver: network.driver,
         IPAM: {
            Config: [
               {
                  Subnet: network.subnet,
                  IPRange: network.ipRange,
                  Gateway: network.gateway,
               },
            ],
         },
      });
      return netw;
   } catch (err) {
      console.error("Error creating network:", err);
   }
}

// Attach network to host
export async function ConnectNetwork(network: Network, host: Host) {
   console.log("connecting", host.name, "to", network.name);
   await network.docker?.connect({
      Container: host.name,
      EndpointConfig: {
         IPAMConfig: {
            IPv4Address: host.ipv4,
         },
      },
   });
}
