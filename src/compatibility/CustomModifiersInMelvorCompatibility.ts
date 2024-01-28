import CmimSharedModData from '../../data/_Shared/cmim-data.json'

import NoCmimGlacorModData from '../../data/Glacors/data-without-cmim.json'
import CmimGlacorModData from '../../data/Glacors/data-with-cmim.json'
import DelayedGlacorModData from '../../data/Glacors/data-after-cmim-evaluation.json'

import NoCmimAutomataModData from '../../data/Automata/data-without-cmim.json'
import CmimAutomataModData from '../../data/Automata/data-with-cmim.json'
import DelayedAutomataModData from '../../data/Automata/data-after-cmim-evaluation.json'

import { Constants } from '../Constants';

export class CustomModifiersInMelvorCompatibility {
    /** A list of local ids that will be checked to append a "CMiM missing" sort of notice to descriptions */
    private static _items: string[] = [
        "Dragonkin_Lamp",
        "Salve_Amulet",
        "Salve_Amulet_Enhanced"
    ];

    /** A list of local ids that will be checked to append a "CMiM missing" sort of notice to descriptions */
    private static _pets: string[] = [
        "Glacy",
        "Cresbot"
    ];

    /** A list of local ids that will be checked to append a "CMiM missing" sort of notice to descriptions */
    private static _specialAttacks: string[] = [

    ];

    /** A list of local ids that will be checked to append a "CMiM missing" sort of notice to descriptions */
    private static _passives: string[] = [
        "Glacor_Elemental_Weakness"
    ];

    constructor(private readonly context: Modding.ModContext) { }

    public patch() {
        // Mod loaded?
        if (!CustomModifiersInMelvorCompatibility.isLoaded()) {
            this.context.gameData.addPackage(NoCmimGlacorModData);
            this.context.gameData.addPackage(DelayedGlacorModData);
            this.context.gameData.addPackage(NoCmimAutomataModData);
            this.context.gameData.addPackage(DelayedAutomataModData);
            return;
        }

        // Register data
        this.context.gameData.addPackage(CmimSharedModData);
        this.context.gameData.addPackage(CmimGlacorModData);
        this.context.gameData.addPackage(DelayedGlacorModData);
        this.context.gameData.addPackage(CmimAutomataModData);
        this.context.gameData.addPackage(DelayedAutomataModData);

        // Use api, if available
        const cmim = mod.api.customModifiersInMelvor;
        if (!cmim) {
            return;
        }

        cmim.addMonsters(MonsterType.Dragon, [`${Constants.MOD_NAMESPACE}:Gorvek_And_Vindicta`]);
        cmim.addMonsters(MonsterType.Demon, [`${Constants.MOD_NAMESPACE}:Avaryss_And_Nymora`]);
        cmim.forceBaseModTypeActive(MonsterType.Dragon);
        cmim.forceBaseModTypeActive(MonsterType.Undead);

        cmim.addMonsters("Elf", [`${Constants.MOD_NAMESPACE}:Helwyr`]);
        cmim.addMonsters("Robot", [`${Constants.MOD_NAMESPACE}:Automaton_Guardian`, `${Constants.MOD_NAMESPACE}:Automaton_Tracer`, `${Constants.MOD_NAMESPACE}:Automaton_Generator`]);
        cmim.addMonsters(MonsterType.Elemental, [`${Constants.MOD_NAMESPACE}:Enduring_Glacyte`, `${Constants.MOD_NAMESPACE}:Sapping_Glacyte`, `${Constants.MOD_NAMESPACE}:Unstable_Glacyte`, `${Constants.MOD_NAMESPACE}:Glacor`]);
    }

    /**
     * Check item, to possibly append its description with a CMiM notice
     * @param localItemId id of item, through which to check whether a CMiM notice should be added
     * @param description description to possibly modify
     */
    public static getModifiedItemDescription(localItemId: string, description: string): string {
        return CustomModifiersInMelvorCompatibility.getModifiedDescription(localItemId, description, '<br>', this._items);
    }

    /**
     * Check pet, to possibly append its description with a CMiM notice
     * @param localPetId id of pet, through which to check whether a CMiM notice should be added
     * @param description description to possibly modify
     */
    public static getModifiedPetDescription(localPetId: string, description: string): string {
        return CustomModifiersInMelvorCompatibility.getModifiedDescription(localPetId, description, '<br>', this._pets);
    }

    /**
     * Check special attack, to possibly append its description with a CMiM notice
     * @param localSpecialAttackId id of special attack, through which to check whether a CMiM notice should be added
     * @param description description to possibly modify
     */
    public static getModifiedSpecialAttackDescription(localSpecialAttackId: string, description: string): string {
        return CustomModifiersInMelvorCompatibility.getModifiedDescription(localSpecialAttackId, description, ' - ', this._specialAttacks);
    }

    /**
     * Check passive, to possibly append its description with a CMiM notice
     * @param localPassiveId id of passive, through which to check whether a CMiM notice should be added
     * @param description description to possibly modify
     */
    public static getModifiedPassiveDescription(localPassiveId: string, description: string): string {
        return CustomModifiersInMelvorCompatibility.getModifiedDescription(localPassiveId, description, ' - ', this._passives);
    }

    private static isLoaded() {
        return mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor');
    }

    /**
     *
     * @param localId Id of the entry in question for which to possibly modify the description
     * @param description description that may or may not get modified
     * @param collection if the description isn't empty, the string by which to separate the descriptio and the appendix
     * @param collection the collection in which to check the local id
     * @returns
     */
    private static getModifiedDescription(localId: string, description: string, divider: string, collection: string[]): string {
        // If the mod is loaded, then we don't need the Cmim notice at all
        if (CustomModifiersInMelvorCompatibility.isLoaded()) {
            return description;
        }

        // If the collection in question does not contain the relevant id, then the Cmim notice isn't relevant for this entry
        if (!collection.some(id => id === localId)) {
            return description;
        }

        // Otherwise, get description with notice appended
        return `${description}${description === '' ? '' : divider}<span class=\"text-warning\">${getLangString(`${Constants.MOD_NAMESPACE}_Cmim_Modifiers_Missing`)}</span>`;
    }
}