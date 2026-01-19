import { Network } from "./network";

export type HostStatus = 'defined' | 'created' | 'running' | 'stopped';

export class Host {
  // Config
  public name: string;
  public image?: string;
  public networks: Network[];
  public ports: number[];
  // Docker
  public containerId?: string;
  public status: HostStatus;
  public createdAt?: Date;
  public startedAt?: Date;

  constructor(name: string) {
    this.name = name;
    this.networks = [];
    this.ports = [];
    this.status = 'defined';
  }

  // TODO: ADD REAL DISPLAY FUNC
  public CheckHost() {return this}
}
