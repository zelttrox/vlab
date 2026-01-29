import * as client from "../docker/client"
import { Host } from "../models/host";

const docker = client.docker;

// Create and return docker container
export async function CreateContainer(host: Host) {
   // docker pull <image>
   docker.pull(host.image, (err: Error) => {
      if (err) console.log("Error pulling image:", err);
   });
   // docker run <param>
   try {
      const container = await docker.createContainer({
         Image: host.image,
         Cmd: [host.shell, "-c", "sleep infinity"],
         name: host.name,
      });
      return container;
   } catch (err) {
      console.log("Error creating container:", err);
   }
}

// Start docker container
export function StartContainer(container: Docker.Container) {
   container.start();
}

// Exec docker container
export async function ExecContainer(container: Docker.Container) {
   console.log("executing", container.id)
   const exec = await container.exec({
      Cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true
   });
}

// Remove all containers
export async function ClearContainers() {
   try {
      const containers = await docker.listContainers({ all: true });
      for (const cont of containers) {
         const container = docker.getContainer(cont.Id);
         await container.stop().catch(() => {});
         await container.remove({ force: true });
      }
   } catch (err) {
      console.log("Error clearing containers:", err);
   }
}