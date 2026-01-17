import * as cli from "./src/core/vshell"
import { Lab } from "./src/models/lab"

// Init VShell
const vshell = new cli.VShell()

// Start VShell
vshell.lab = new Lab("testlab")
vshell.Start()
