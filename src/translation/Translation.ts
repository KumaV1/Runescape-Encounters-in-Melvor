import { Constants } from '../Constants'
import { TinyIconsCompatibility } from '../compatibility/TinyIconsCompatibility'

/**
 * Patches a couple name/description getters, so they access our integrated localization
 *
 * IMPORTANT: For certain descriptions, they only run our custom logic, if a custom description has been defined,
 * as otherwise it's an auto generated descriütion (like modifier effects), which are handled by the game's own translations already
 */
export class Translation {
    constructor(private readonly context: Modding.ModContext) { }

    public init() {
        this.context.patch(Item, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`ITEM_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(Item, 'description').get(function (patch) {
            // If the item is not of this mod, or does not have a custom description (instead being auto-generated if having a description at all),
            // then do not run any special logic
            if (this.namespace !== Constants.MOD_NAMESPACE || this._customDescription === undefined) {
                return patch();
            }

            const localized = getLangString(`ITEM_DESCRIPTION_${this.localID}`);

            // If the item is not one of those that deserve/require special treatment, just return the lang string
            if (this.localID !== "Armadyl_Battlestaff") {
                return localized;
            }

            // Currently, said special treatment is just injecting tiny icons into custom descriptions.
            // The tiny icons mod has an endpoint to retrieve that, which also honors its "secondary icon" setting (the value parameter is technically redundant for non SkillModifier-type modifiers, though)
            return TinyIconsCompatibility.globalIconsEnabled()
                ? localized.replace("${modifierTinyIcons0}", mod.api.tinyIcons.getIconHTMLForModifier("increasedMaxAirSpellDmg", 200, true) ?? "")
                : localized.replace("${modifierTinyIcons0}", "");

            // REMARK: Above code could be moved to a method, with a standardized name of placeholders
            // and the method checking the "modifier object" and looping through it to run the replace functionality
        });

        this.context.patch(ShopPurchase, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE && this._customName !== undefined) {
                return getLangString(`SHOP_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(ShopPurchase, 'description').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE && this._customDescription !== undefined) {
                return getLangString(`SHOP_DESCRIPTION_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(Monster, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`MONSTER_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(Monster, 'description').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`MONSTER_DESCRIPTION_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(CombatArea, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`COMBAT_AREA_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(SlayerArea, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`SLAYER_AREA_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(Dungeon, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`DUNGEON_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(SpecialAttack, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`SPECIAL_ATTACK_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(SpecialAttack, 'description').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return templateString(
                    getLangString(`SPECIAL_ATTACK_DESCRIPTION_${this.localID}`),
                    this.descriptionTemplateData
                );
            }

            return patch();
        });

        this.context.patch(CombatPassive, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`PASSIVE_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(CombatPassive, 'description').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE && this._customDescription !== undefined) {
                return getLangString(`PASSIVE_DESCRIPTION_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(Pet, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`PET_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(Page, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`PAGE_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(StandardSpell, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`MAGIC_SPELL_NAME_${this.localID}`);
            }

            return patch();
        })

        this.context.patch(AuroraSpell, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`MAGIC_AURORA_NAME_${this.localID}`);
            }

            return patch();
        })
    }
}