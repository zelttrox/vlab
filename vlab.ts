import * as cli from "./src/core/cli"
import * as data from "./src/core/data"
import { Lab } from "./src/models/lab"

const action = process.argv[2]
const type = process.argv[3]
const obect = process.argv[4]
const option = process.argv[5]

//manager.RunCommand(action, type, obect, option)
export var lab = new Lab("Exo1", [])
const vshell = new cli.VShell(lab)
vshell.Start()
