import * as manager from "./src/core/cli"

const action = process.argv[2]
const type = process.argv[3]
const obect = process.argv[4]
const option = process.argv[5]

manager.RunCommand(action, type, obect, option)