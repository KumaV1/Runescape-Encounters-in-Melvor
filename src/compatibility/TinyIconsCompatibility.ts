export class TinyIconsCompatibility {
    private static _specialItems: { [key: string]: string[] } = {
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
     * @param localItemId id of item by, through which relevant modifiers are determined
     * @param description description in which to replace tiny-icons placeholders
     */
    public static getModifiedItemDescription(localItemId: string, description: string): string {
        const modifiers: string[] | undefined = this._specialItems[localItemId];

        // If no modifiers were found, then the item doesn't require any description adjustments
        if (!modifiers) {
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
}