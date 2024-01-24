import { Constants } from '../Constants'
import { CustomModifiersInMelvorCompatibility } from '../compatibility/CustomModifiersInMelvorCompatibility';
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
        this.context.patch(Item, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`ITEM_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(Item, 'description').get(function (original) {
            // If the item is not of this mod, or does not have a custom description (instead being auto-generated, if having a description at all),
            // then do not run any special logic
            if (this.namespace !== Constants.MOD_NAMESPACE || this._customDescription === undefined) {
                return original();
            }

            // Otherwise, run custom logic where descriptions may contain placeholders for tiny icons
            let localized = getLangString(`ITEM_DESCRIPTION_${this.localID}`);
            return TinyIconsCompatibility.getModifiedItemDescription(this.localID, localized);
        });

        this.context.patch(EquipmentItem, 'description').get(function (original) {
            // If the item is not of this mod, then do not run any special logic
            if (this.namespace !== Constants.MOD_NAMESPACE) {
                return original();
            }

            // Otherwise, we may want to append a CMiM notice at the end of the description
            return CustomModifiersInMelvorCompatibility.getModifiedItemDescription(this.localID, original());
        });

        this.context.patch(ShopPurchase, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE && this._customName !== undefined) {
                return getLangString(`SHOP_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(ShopPurchase, 'description').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE && this._customDescription !== undefined) {
                return getLangString(`SHOP_DESCRIPTION_${this.localID}`);
            }

            return original();
        });

        this.context.patch(Monster, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`MONSTER_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(Monster, 'description').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`MONSTER_DESCRIPTION_${this.localID}`);
            }

            return original();
        });

        this.context.patch(CombatArea, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`COMBAT_AREA_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(SlayerArea, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`SLAYER_AREA_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(SlayerArea, 'areaEffectDescription').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`SLAYER_AREA_EFFECT_${this.localID}`);
            }

            return original();
        });

        this.context.patch(Dungeon, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`DUNGEON_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(SpecialAttack, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`SPECIAL_ATTACK_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(SpecialAttack, 'description').get(function (original) {
            // If the attack is not of this mod, then do not run any special logic
            if (this.namespace !== Constants.MOD_NAMESPACE) {
                return original();
            }

            // Otherwise, we want to use custom/self-defined text, which we may further modify,
            // by replacing placeholders or appending additional texts
            let localized = templateString(
                getLangString(`SPECIAL_ATTACK_DESCRIPTION_${this.localID}`),
                this.descriptionTemplateData
            )
            localized = TinyIconsCompatibility.getModifiedSpecialAttackDescription(this.localID, localized);
            localized = CustomModifiersInMelvorCompatibility.getModifiedSpecialAttackDescription(this.localID, localized);

            return localized;
        });

        this.context.patch(CombatPassive, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`PASSIVE_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(CombatPassive, 'description').get(function (original) {
            // If the passive is not of this mod, then do not run any special logic
            if (this.namespace !== Constants.MOD_NAMESPACE) {
                return original();
            }

            // If the passive is of this mod and has a generated description (or none at all),
            // then we may only want to append a CMiM notice at the end of the unmodified original logic
            if (this._customDescription === undefined) {
                return CustomModifiersInMelvorCompatibility.getModifiedPassiveDescription(this.localID, original());
            }

            // Otherwise, we want to use a custom text, which we may further modify,
            // by replacing placeholders or appending additional text
            let localized = getLangString(`PASSIVE_DESCRIPTION_${this.localID}`);
            localized = TinyIconsCompatibility.getModifiedPassiveDescription(this.localID, localized);
            localized = CustomModifiersInMelvorCompatibility.getModifiedPassiveDescription(this.localID, localized);

            return localized;
        });

        this.context.patch(Pet, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`PET_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(Pet, 'acquiredBy').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return TranslationManager.getPetHint(this.localID);
            }

            return original();
        });

        this.context.patch(Pet, 'description').get(function (original) {
            // If the pet is not of this mod, then do not run any special logic
            if (this.namespace !== Constants.MOD_NAMESPACE) {
                return original();
            }

            // Otherwise, we may want to append a CMiM notice at the end of the description
            return CustomModifiersInMelvorCompatibility.getModifiedPetDescription(this.localID, original());
        });

        this.context.patch(Page, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`PAGE_NAME_${this.localID}`);
            }

            return original();
        });

        this.context.patch(StandardSpell, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`MAGIC_SPELL_NAME_${this.localID}`);
            }

            return original();
        })

        this.context.patch(AuroraSpell, 'name').get(function (original) {
            if (this.namespace === Constants.MOD_NAMESPACE) {
                return getLangString(`MAGIC_AURORA_NAME_${this.localID}`);
            }

            return original();
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

        // Delayed, register pet hints dynamically
        this.context.onModsLoaded(function () {
            const combatAreas: Map<string, CombatArea> | undefined = game.combatAreas.namespaceMaps.get(Constants.MOD_NAMESPACE);
            const slayerAreas: Map<string, SlayerArea> | undefined = game.slayerAreas.namespaceMaps.get(Constants.MOD_NAMESPACE);

            if (combatAreas !== undefined) {
                combatAreas.forEach(function (combatArea) {
                    combatArea.monsters.forEach(function (monster) {
                        if (monster.pet !== undefined) {
                            TranslationManager.addOrUpdatePetHint(monster.pet.pet.localID, combatArea.name);
                        }
                    })
                });
            }
            if (slayerAreas !== undefined) {
                slayerAreas.forEach(function (slayerArea) {
                    slayerArea.monsters.forEach(function (monster) {
                        if (monster.pet !== undefined) {
                            TranslationManager.addOrUpdatePetHint(monster.pet.pet.localID, slayerArea.name);
                        }
                    })
                    if (slayerArea.pet !== undefined) {
                        TranslationManager.addOrUpdatePetHint(slayerArea.pet.pet.localID, slayerArea.name);
                    }
                });
            }
        });
    }

    /**
     * Get hint of where to get the given pet
     * @param petLocalId
     * @returns
     */
    private static getPetHint(petLocalId: string): string {
        return loadedLangJson[`${Constants.MOD_NAMESPACE}_PET_HINT_${petLocalId}`];
    }

    /**
     * Register, or update existing translation, for the hint of where to get a pet
     * @param petLocalId
     * @param source
     */
    private static addOrUpdatePetHint(petLocalId: string, source: string): void {
        const existingSource = loadedLangJson[`${Constants.MOD_NAMESPACE}_PET_HINT_${petLocalId}`];
        loadedLangJson[`${Constants.MOD_NAMESPACE}_PET_HINT_${petLocalId}`] = existingSource && existingSource.length > 0
            ? `${existingSource}, ${source}`
            : `${source}`;
    }
}