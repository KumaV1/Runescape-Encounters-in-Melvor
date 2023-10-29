import { Constants } from '../Constants'

/**
 * Patches a couple of language implementation structures, to run localization for custom text
 * TODO: Explain better
 * 
 * IMPORTANT: For certain descriptions, those are only replaced if a custom description has been defined,
 * as otherwise it's an auto generated one (like modifier effects), which are handled by the game's own translations already
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
            if (this.namespace === Constants.MOD_NAMESPACE && this._customDescription !== undefined) {
                return getLangString(`ITEM_DESCRIPTION_${this.localID}`);
            }

            return patch();
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

        this.context.patch(CombatArea, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`COMBAT_AREA_NAME_${this.localID}`);
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

        // === CUSTOM ONES (NOT FROM MYTH MUSIC) ===
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
        // === CUSTOM ONES (NOT FROM MYTH MUSIC) ===

        this.context.patch(HerbloreRecipe, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`POTION_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(Pet, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`PET_NAME_${this.localID}`);
            }

            return patch();
        });
    }
}