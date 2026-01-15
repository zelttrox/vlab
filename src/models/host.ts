export class Host {
  name: string
  image: string
  networks: string[]

  constructor(name: string, image: string) {
    this.name = name
    this.image = image
    this.networks = []
  }
}