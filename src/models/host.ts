import { Network } from "./network"

export class Host {
  // Host identity
  id: string
  name: string
  image: string
  // Host state
  status: string
  createdAt: Date
  startedAt: Date
  // Host network settings
  networks: Network[]
  ipAddress: string
  macAddress: string
  gateway: string
  ports: string[]

  constructor(
    id: string,
    name: string,
    image: string,
    status: string,
    createdAt: Date,
    startedAt: Date,
    networks: Network[],
    ipAddress: string,
    macAddress: string,
    gateway: string,
    ports: string[]
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.status = status
    this.createdAt = createdAt
    this.startedAt = startedAt
    this.networks = networks
    this.ipAddress = ipAddress
    this.macAddress = macAddress
    this.gateway = gateway
    this.ports = ports
  }
}