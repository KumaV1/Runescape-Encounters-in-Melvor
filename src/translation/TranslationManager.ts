import { Constants } from '../Constants'
import { TinyIconsCompatibility } from '../compatibility/TinyIconsCompatibility'

import { languages } from './languages';

/**
 * Patches a couple name/description getters, so they access our integrated localization
 *
 * IMPORTANT: For certain descriptions, they only run our custom logic, if a custom description has been defined,
 * as otherwise it's an auto generated description (like modifier effects), which are handled by the game's own translations already
 */
export class TranslationManager {
    constructor(private readonly context: Modding.ModContext) { }

    /**
     * Patches multiple name/description getters, so they check our custom injected translations
     */
    public patch() {
        this.context.patch(Item, 'name').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`ITEM_NAME_${this.localID}`);
            }

            return patch();
        });

        this.context.patch(Item, 'description').get(function (patch) {
            // If the item is not of this mod, or does not have a custom description (instead being auto-generated, if having a description at all),
            // then do not run any special logic
            if (this.namespace !== Constants.MOD_NAMESPACE || this._customDescription === undefined) {
                return patch();
            }

            // Otherwise, run custom logic where descriptions may contain placeholders for tiny icons
            let localized = getLangString(`ITEM_DESCRIPTION_${this.localID}`);
            return TinyIconsCompatibility.getModifiedItemDescription(this.localID, localized);
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

        this.context.patch(SlayerArea, 'areaEffectDescription').get(function (patch) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`SLAYER_AREA_EFFECT_${this.localID}`);
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

    /**
     * Creates a list of translations for the current languages and registers it
     */
    public register(): void {
        let lang = setLang;

        if (lang === 'lemon' || lang === 'carrot') {
            lang = 'en';
        }

        // Melvor includes functionality to automatically retrieve translations by category (see "LanguageCategory" in the schema)
        // and entity id - for those calls, a mod prefix isn't necessary, which is why we create this const array
        const keysToNotPrefix = [
            'SHOP_NAME',
            'SHOP_DESCRIPTION',
            'ITEM_NAME',
            'ITEM_DESCRIPTION',
            'MAGIC_SPELL_NAME',
            'MAGIC_AURORA_NAME',
            'COMBAT_AREA_NAME',
            'SLAYER_AREA_NAME',
            'SLAYER_AREA_EFFECT',
            'DUNGEON_NAME',
            'MONSTER_NAME',
            'MONSTER_DESCRIPTION',
            'PET_NAME',
            'SPECIAL_ATTACK_NAME',
            'SPECIAL_ATTACK_DESCRIPTION',
            'PAGE_NAME',
            'PASSIVE_NAME',
            'PASSIVE_DESCRIPTION',
        ];

        // Based on how translation is retrieved,
        // we may or may not have to specify the mod namespace
        for (const [key, value] of Object.entries<string>(languages[lang])) {
            if (keysToNotPrefix.some(prefix => key.includes(prefix))) {
                loadedLangJson[key] = value;
            } else {
                loadedLangJson[`${Constants.MOD_NAMESPACE}_${key}`] = value;
            }
        }
    }
}