import { Host } from "./host"

export class Lab {
  public name: string
  private hosts: Host[]

  constructor(name: string, hosts: Host[]) {
    this.name = name
    this.hosts = hosts
  }
}