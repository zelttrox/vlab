import Docker, { Container } from "dockerode";
import { Network } from "./network";

export type HostStatus = "defined" | "created" | "running" | "stopped";

export class Host {
   // Config
   public name: string;
   public image: string;
   public shell: string;
   public networks: Network[];
   public ports: number[];
   public ipv4?: string;

   public docker?: Docker.Container;

   constructor(
      name: string,
      image: string = "ubuntu",
      shell: string = "/bin/bash",
   ) {
      this.name = name;
      this.image = image;
      this.shell = shell;
      this.networks = [];
      this.ports = [];
   }

   // TODO: ADD REAL DISPLAY FUNC
   public CheckHost() {
      return this;
   }
}
