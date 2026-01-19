import { Lab } from "./lab";

export class VLab {
    public labs: Lab[]
    private currentLab: Lab | null = null

    constructor() {
        this.labs = []
        this.currentLab = null
    }

    public AddLab(lab: Lab) {
        this.labs.push(lab)
    }

    public FindLabByName(name: string): Lab {
        let result: Lab = new Lab("")
        this.labs.forEach(lab => {if (lab.name == name) result = lab})
        return result.name == name ? result : new Lab("")
    }

    public DeleteLab(lab: Lab) {
        this.labs.splice(this.labs.indexOf(lab))
    }

    // TODO: Make the display prettier + with colors
    public ShowLab(lab: Lab) {
        console.log(`   [Lab: ${lab.name}]`)
        console.log("   << Hosts >>")
        if (!this.currentLab) return
        if (this.currentLab.hosts = []) console.log("   none")
            this.currentLab.hosts.forEach(host => {
                console.log(`    - ${host.name} (${host.image})`)
            })
            console.log("   << Networks >>")
        if (this.currentLab.networks = []) console.log("   none")
            this.currentLab.networks.forEach(network => {
                console.log(`    - ${network.name}`)
        })
    }

    public EnterLab(lab: Lab) {
        this.currentLab = lab
    }

    public GetCurrentLab(): Lab | null {
        return this.currentLab
    }

    public SetCurrentLab(lab: Lab | null) {
        this.currentLab = lab
    }
}