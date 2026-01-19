import { Network } from "./network"

export type HostStatus = 'defined' | 'created' | 'running' | 'stopped'

export class Host {
  // Config
  public name: string
  public image: string
  public shell: string
  public networks: Network[]
  public ports: number[]
  // Docker
  public containerId?: string
  public status: HostStatus
  public createdAt?: Date
  public startedAt?: Date

  constructor(name: string, image: string ='ubuntu', shell: string = '/bin/bash') {
    this.name = name
    this.image = image
    this.shell = shell
    this.networks = []
    this.ports = []
    this.status = 'defined'
  }

  // TODO: ADD REAL DISPLAY FUNC
  public CheckHost() {return this}
}
