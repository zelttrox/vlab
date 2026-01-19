import { Host } from "./host"
import { Network } from "./network"

export class Lab {
  public name: string
  public hosts: Host[]
  public networks: Network[]

  constructor(name: string, hosts: Host[] = [], networks: Network[] = []) {
    this.name = name
    this.hosts = hosts
    this.networks = networks
  }

  public AddHost(host: Host) {
    this.hosts.push(host)
  }

  public AddNetwork(network: Network) {
    this.networks.push(network)
  }

  public DeleteHost(host: Host) {
    this.hosts.splice(this.hosts.indexOf(host))
  }

    public DeleteNetwork(network: Network) {
    this.networks.splice(this.networks.indexOf(network))
  }

  public FindHostByName(name: string) {
    let result: Host = new Host("")
    this.hosts.forEach(host => {if (host.name == name) result = host})
    return result.name == name ? result : new Host("")
  }

  public ShowHosts(): Host[] {
    return this.hosts
  }

  public ShowNetworks(): Network[] {
    return this.networks
  }
}