import DragonkinLampWithoutAodPackage from '../../data/_Shared/dragonkin-lamp-without-aod.json'
import DragonkinLampWithAodPackage from '../../data/_Shared/dragonkin-lamp-with-aod.json'

/**
 * There may be some exceptions when loading/defining game data,
 * likely primarily when it comes to AoD skills and the fact that not everything has "Modification Data"
 * available, so in some cases we may simply have to deal with multiple data.json files for the same item or what-have-you,
 * of which only one is chosen based on the expansions the user has
 *
 * REARK: An alternative (and possibly cleaner) implementation would be to use the "expansion-less"
 * version in the .json files, while then using this class to manually add modifications
 */
export class ExpansionsCompatibility {
    constructor(private readonly context: Modding.ModContext) { }

    public loadConditionalGamePackages() {
        if (cloudManager.hasAoDEntitlement) {
            // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
            this.context.gameData.addPackage(DragonkinLampWithAodPackage);
        }
        else {
            // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
            this.context.gameData.addPackage(DragonkinLampWithoutAodPackage);
        }
    }
}