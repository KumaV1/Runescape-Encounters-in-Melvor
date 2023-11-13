export class CustomModifiersInMelvorCompatibility {
    constructor(private readonly context: Modding.ModContext) { }

    public patch() {
        if (!this.isLoaded) {
            return;
        }

        const cmim = mod.api.customModifiersInMelvor;
        if (!cmim) {
            return;
        }

        cmim.addDragons(["runescapeEncountersInMelvor:Gorvek_And_Vindicta"]);
    }

    private isLoaded() {
        return mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor');
    }
}