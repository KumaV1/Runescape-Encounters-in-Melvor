import CmimSharedModData from '../../data/_Shared/cmim-data.json'

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

        cmim.addMonsters("Dragon", ["runescapeEncountersInMelvor:Gorvek_And_Vindicta"]);
        cmim.addMonsters("Demon", ["runescapeEncountersInMelvor:Avaryss_And_Nymora"]);
        cmim.forceBaseModTypeActive("Dragon");
        cmim.forceBaseModTypeActive("Undead");

        this.context.gameData.addPackage(CmimSharedModData);
    }

    private isLoaded() {
        return mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor');
    }
}