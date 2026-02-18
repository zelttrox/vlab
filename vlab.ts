import * as handler from "./src/core/handlers";
import * as logs from "./src/beta/logs";

// Clear history
logs.ClearLogs();

// Start VShell
handler.vshell.Start();
