import CmimSharedModData from '../../data/_Shared/cmim-data.json'
import CmimGlacorModData from '../../data/Glacors/cmim-data.json'

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
        cmim.addMonsters("Elemental", ["runescapeEncountersInMelvor:Glacor", "runescapeEncountersInMelvor:Enduring_Glacyte", "runescapeEncountersInMelvor:Sapping_Glacyte", "runescapeEncountersInMelvor:Unstable_Glacyte"]);
        cmim.forceBaseModTypeActive("Dragon");
        cmim.forceBaseModTypeActive("Undead");

        this.context.gameData.addPackage(CmimSharedModData);
        this.context.gameData.addPackage(CmimGlacorModData);
    }

    private isLoaded() {
        return mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor');
    }
}