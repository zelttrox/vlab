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
}