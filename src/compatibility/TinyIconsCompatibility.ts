export class TinyIconsCompatibility {
    private static _items: { [key: string]: string[] } = {
        Anima_Core_Helm_Of_Seren: [
            "increasedMinAirSpellDmg",
            "increasedMinWaterSpellDmg",
            "increasedMinEarthSpellDmg",
            "increasedMinFireSpellDmg"
        ],
        Anima_Core_Body_Of_Seren: [
            "increasedMinAirSpellDmg",
            "increasedMinWaterSpellDmg",
            "increasedMinEarthSpellDmg",
            "increasedMinFireSpellDmg"
        ],
        Anima_Core_Legs_Of_Seren: [
            "increasedMinAirSpellDmg",
            "increasedMinWaterSpellDmg",
            "increasedMinEarthSpellDmg",
            "increasedMinFireSpellDmg"
        ],
        Wand_Of_The_Cywir_Elders: ["increasedGlobalAccuracy"],
        Orb_Of_The_Cywir_Elders: ["increasedGlobalAccuracy"],
        Blade_Of_Nymora: ["increasedGlobalAccuracy"],
        Blade_Of_Avaryss: ["increasedGlobalAccuracy"],
        Shadow_Glaive: ["increasedGlobalAccuracy"],
        Offhand_Shadow_Glaive: ["increasedGlobalAccuracy"],

        Armadyl_Battlestaff: ["increasedMaxAirSpellDmg"],
        Ragefire_Boots: [
            "increasedMinAirSpellDmg",
            "increasedMinWaterSpellDmg",
            "increasedMinEarthSpellDmg",
            "increasedMinFireSpellDmg"
        ],
        Static_Gloves: [
            "increasedMinAirSpellDmg",
            "increasedMinWaterSpellDmg",
            "increasedMinEarthSpellDmg",
            "increasedMinFireSpellDmg"
        ]
    };

    private static _specialAttacks: { [key: string]: string[] } = {
        Rathis_Acid_Bombardment: ["increasedDamageTaken"],
        Orikalka_Frost_Storm: ["increasedAttackIntervalPercent"],
        Helwyr_The_Aid_Of_Nature: ["increasedAttackIntervalPercent"],
        Twin_Furies_Channelled_Bomb: ["increasedDamageTaken"],
        Automaton_Target_Weak_Point: ["increasedBleedDOTDamage"],
        Unstable_Glacyte_Channeled_Energy: ["decreasedDamageReduction"],
        Sapping_Glacyte_Channeled_Energy: ["decreasedFlatPrayerCostReduction"],
        Enduring_Glacyte_Channeled_Energy: ["decreasedDamageTaken"],
        Glacor_Unstable_Glacyte: ["decreasedDamageReduction"],
        Glacor_Sapping_Glacyte: [
            "decreasedFlatPrayerCostReduction",
            "decreasedChanceToPreservePrayerPoints"
        ],
        Glacor_Enduring_Glacyte: ["decreasedDamageTaken"],
        Glacor_Icicle_Slam: [
            "decreasedDamageReduction",
            "increasedAttackIntervalPercent"
        ],
        Armadyl_Battlestaff_Tempest_Of_Armadyl: ["decreasedAttackIntervalPercent"]
    };

    private static _passives: { [key: string]: string[] } = {
        Royal_Hide_Sea_Melee: [
            "meleeImmunity",
            "rangedImmunity"
        ],
        Royal_Hide_Sea_Ranged: [
            "rangedImmunity",
            "magicImmunity"
        ],
        Royal_Hide_Sea_Magic: [
            "meleeImmunity",
            "magicImmunity"
        ],
        Orikalka_Royal_Hide: [
            "meleeImmunity",
            "rangedImmunity",
            "increasedDamageReduction"
        ],
        Rathis_Royal_Hide: [
            "rangedImmunity",
            "magicImmunity",
            "increasedDamageReduction"
        ],
        Pthentraken_Royal_Hide: [
            "meleeImmunity",
            "magicImmunity",
            "increasedDamageReduction"
        ]
    };

    private static _globalIconsEnabled: Boolean = false;

    /**
     * Cache "global icons enabled" setting of Tiny Icons mod, if the mod is found
     * The mod requires you to reload anyway, so we don't have to worry about the value changing after the game has loaded
     * @param ctx
     */
    public static initialize(ctx: Modding.ModContext): void {
        ctx.onInterfaceReady(() => {
            if (!this.isLoaded()) {
                return;
            }

            const modContext = mod.getContext('tinyIcons');
            if (!modContext) {
                return;
            }

            const section = modContext.settings?.section('Tiny Icons');
            if (!section) {
                return;
            }

            const value = section.get('global-icons');
            if (typeof value === 'boolean') {
                TinyIconsCompatibility._globalIconsEnabled = value;
            }
        });
    }

    /**
     * Retrieve item description in which tiny-icons placeholders have been replaced
     * @param localItemId id of item, through which relevant modifiers are determined
     * @param description description in which to replace tiny-icons placeholders
     */
    public static getModifiedItemDescription(localItemId: string, description: string): string {
        return TinyIconsCompatibility.getModifiedDescription(description, this._items[localItemId]);
    }

    /**
     * Retrieve special attack description in which tiny-icons placeholders have been replaced
     * @param localSpecialAttackId id of special, through which relevant modifiers are determined
     * @param description description in which to replace tiny-icons placeholders
     */
    public static getModifiedSpecialAttackDescription(localSpecialAttackId: string, description: string): string {
        return TinyIconsCompatibility.getModifiedDescription(description, this._specialAttacks[localSpecialAttackId]);
    }

    /**
     * Retrieve special attack description in which tiny-icons placeholders have been replaced
     * @param localPassiveId id of passive, through which relevant modifiers are determined
     * @param description description in which to replace tiny-icons placeholders
     */
    public static getModifiedPassivDescription(localPassiveId: string, description: string): string {
        return TinyIconsCompatibility.getModifiedDescription(description, this._passives[localPassiveId]);
    }

    /**
     * Get cached info, whether tiny-icons have been enabled globally
     * @returns
     */
    public static globalIconsEnabled(): Boolean {
        return TinyIconsCompatibility._globalIconsEnabled;
    }

    /**
     * Check whether the mod has been loaded
     * @returns
     */
    private static isLoaded(): Boolean {
        return mod.manager.getLoadedModList().includes('Tiny Icons');
    }

    /**
     * Retrieve description in which tiny-icons placeholders have been replaced
     * @param description description in which to replace tiny-icons placeholders
     * @param modifiers modifier names found for the description
     */
    private static getModifiedDescription(description: string, modifiers: string[] | undefined): string {
        // If no modifiers were provided, then the item doesn't require any description adjustments
        if (modifiers === undefined || modifiers.length === 0) {
            return description;
        }

        // Otherwise, loop through modifiers to replace placeholders
        if (this._globalIconsEnabled) {
            for (var i = 0; i < modifiers.length; i++) {
                description = description.replace(`\$\{modifierTinyIcons${i}\}`, mod.api.tinyIcons.getIconHTMLForModifier(modifiers[i], 1, true) ?? "") // value is actually irrelevant for number-only modifiers
            }
        } else {
            for (var i = 0; i < modifiers.length; i++) {
                description = description.replace(`\$\{modifierTinyIcons${i}\}`, "");
            }
        }

        return description;
    }
}