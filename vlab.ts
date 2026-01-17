import * as cli from "./src/models/vshell"
import { Lab } from "./src/models/lab"
import { VLab } from "./src/models/vlab"

// Init VShell & VLab
export var vlab = new VLab()
const vshell = new cli.VShell(vlab)

// Start VShell
vlab.AddLab(new Lab("Testlab"))
vshell.Start()
