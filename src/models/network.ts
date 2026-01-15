export class Network {
  name: string
  ip: string
  networks: string[]

  constructor(name: string, ip: string) {
    this.name = name
    this.ip = ip
    this.networks = []
  }
}