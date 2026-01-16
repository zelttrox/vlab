import { Network } from "./network"

export class Host {
  // Host identity
  id: string
  name: string
  image: string
  // Host state
  status: string
  created_at: Date
  started_at: Date
  // Host network settings
  networks: Network[]
  ip_addr: string
  mac_addr: string
  gateway: string
  ports: string[]

  constructor(
    id: string,
    name: string,
    image: string,
    status: string,
    created_at: Date,
    started_at: Date,
    networks: Network[],
    ip_addr: string,
    mac_addr: string,
    gateway: string,
    ports: string[]
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.status = status
    this.created_at = created_at
    this.started_at = started_at
    this.networks = networks
    this.ip_addr = ip_addr
    this.mac_addr = mac_addr
    this.gateway = gateway
    this.ports = ports
  }
}