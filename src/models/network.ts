export class Network {
  name: string
  ip: string
  subnets: Network[]

  constructor(name: string) {
    this.name = name
    this.ip = ""
    this.subnets = []
  }

  // TODO: ADD REAL DISPLAY FUNC
  public CheckNetwork() {return this}
}