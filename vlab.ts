import * as cli from "./src/models/vshell"
import { VLab } from "./src/models/vlab"

// Init VShell & VLab
export var vlab = new VLab()
export const vshell = new cli.VShell(vlab)

// Start VShell
vshell.Start()
