import * as Docker from "dockerode"
export class Network {
  name: string
  driver?: string
  ipRange?: string
  subnet?: string
  gateway?: string
  docker?: Docker.Network

  constructor(name: string) {
    this.name = name
  }

  // TODO: ADD REAL DISPLAY FUNC
  public CheckNetwork() {return this}
}