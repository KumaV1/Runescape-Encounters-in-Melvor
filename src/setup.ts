// Modules
// You can import script modules and have full type completion
import { Constants } from './Constants';
import { Translation } from './translation/Translation';
import { languages } from './translation/languages'

// Data
// Game data for registration
import SharedModData from '../data/_Shared/data.json'
import DkModData from '../data/Dagannoth Kings/data.json';
import RmModData from '../data/Rex Matriarchs/data.json';
import Gwd2ModData from '../data/God Wars 2/data.json';

// Images
// #region Image imports
import '../assets/items/_Shared/Ancient_Effigy.png'
import '../assets/items/_Shared/Draconic_Visage.png'
import '../assets/items/_Shared/Dragonfire_Deflector.png'
import '../assets/items/_Shared/Dragonfire_Ward.png'
import '../assets/items/_Shared/Dragonkin_Lamp.png'
import '../assets/items/_Shared/Salve_Amulet.png'
import '../assets/items/_Shared/Salve_Amulet_Enhanced.png'
import '../assets/items/_Shared/Spirit_Diamond.png'
import '../assets/items/_Shared/Spirit_Dragonstone.png'
import '../assets/items/_Shared/Spirit_Emerald.png'
import '../assets/items/_Shared/Spirit_Gem_Bag.png'
import '../assets/items/_Shared/Spirit_Onyx.png'
import '../assets/items/_Shared/Spirit_Ruby.png'
import '../assets/items/_Shared/Spirit_Sapphire.png'
import '../assets/items/Dagannoth Kings/Archers_ring.png'
import '../assets/items/Dagannoth Kings/Berserker_ring.png'
import '../assets/items/Dagannoth Kings/Dagannoth_bones.png'
import '../assets/items/Dagannoth Kings/Seers_ring.png'
import '../assets/items/Dagannoth Kings/Warrior_ring.png'
import '../assets/items/God Wars 2/Ancient_Sigil.png'
import '../assets/items/God Wars 2/Ancient_Sigil_Piece_Seren.png'
import '../assets/items/God Wars 2/Ancient_Sigil_Piece_Sliske.png'
import '../assets/items/God Wars 2/Ancient_Sigil_Piece_Zamorak.png'
import '../assets/items/God Wars 2/Ancient_Sigil_Piece_Zaros.png'
import '../assets/items/God Wars 2/Anima_Core_Body_Of_Seren.png'
import '../assets/items/God Wars 2/Anima_Core_Body_Of_Sliske.png'
import '../assets/items/God Wars 2/Anima_Core_Body_Of_Zamorak.png'
import '../assets/items/God Wars 2/Anima_Core_Body_Of_Zaros.png'
import '../assets/items/God Wars 2/Anima_Core_Helm_Of_Seren.png'
import '../assets/items/God Wars 2/Anima_Core_Helm_Of_Sliske.png'
import '../assets/items/God Wars 2/Anima_Core_Helm_Of_Zamorak.png'
import '../assets/items/God Wars 2/Anima_Core_Helm_Of_Zaros.png'
import '../assets/items/God Wars 2/Anima_Core_Legs_Of_Seren.png'
import '../assets/items/God Wars 2/Anima_Core_Legs_Of_Sliske.png'
import '../assets/items/God Wars 2/Anima_Core_Legs_Of_Zamorak.png'
import '../assets/items/God Wars 2/Anima_Core_Legs_Of_Zaros.png'
import '../assets/items/God Wars 2/Blade_Of_Avaryss.png'
import '../assets/items/God Wars 2/Blade_Of_Nymora.png'
import '../assets/items/God Wars 2/Crest_Of_Seren.png'
import '../assets/items/God Wars 2/Crest_Of_Sliske.png'
import '../assets/items/God Wars 2/Crest_Of_Zamorak.png'
import '../assets/items/God Wars 2/Crest_Of_Zaros.png'
import '../assets/items/God Wars 2/Dormant_Anima_Core_Body.png'
import '../assets/items/God Wars 2/Dormant_Anima_Core_Helm.png'
import '../assets/items/God Wars 2/Dormant_Anima_Core_Legs.png'
import '../assets/items/God Wars 2/Dragon_Rider_Lance.png'
import '../assets/items/God Wars 2/Offhand_Shadow_Glaive.png'
import '../assets/items/God Wars 2/Orb_Of_The_Cywir_Elders.png'
import '../assets/items/God Wars 2/Shadow_Glaive.png'
import '../assets/items/God Wars 2/Wand_Of_The_Cywir_Elders.png'
import '../assets/items/Rex Matriarchs/Champions_Ring.png'
import '../assets/items/Rex Matriarchs/Channellers_Ring.png'
import '../assets/items/Rex Matriarchs/Dinosaur_Bones.png'
import '../assets/items/Rex Matriarchs/Heart_Of_The_Archer.png'
import '../assets/items/Rex Matriarchs/Heart_Of_The_Berserker.png'
import '../assets/items/Rex Matriarchs/Heart_Of_The_Seer.png'
import '../assets/items/Rex Matriarchs/Heart_Of_The_Warrior.png'
import '../assets/items/Rex Matriarchs/Laniakeas_Spear.png'
import '../assets/items/Rex Matriarchs/Reavers_Ring.png'
import '../assets/items/Rex Matriarchs/Savage_Plume.png'
import '../assets/items/Rex Matriarchs/Savage_Spear_Cap.png'
import '../assets/items/Rex Matriarchs/Savage_Spear_Shaft.png'
import '../assets/items/Rex Matriarchs/Savage_Spear_Tip.png'
import '../assets/items/Rex Matriarchs/Stalkers_Ring.png'
import '../assets/locations/Dagannoth_Kings_Lair.png'
import '../assets/locations/Godwars_Dungeon_2_Lair.png'
import '../assets/locations/Rex_Matriarchs_Lair.png'
import '../assets/monsters/Dagannoth Kings/Dagannoth Prime.png'
import '../assets/monsters/Dagannoth Kings/Dagannoth Supreme.png'
import '../assets/monsters/Dagannoth Kings/Dagannoth_Rex.png'
import '../assets/monsters/God Wars 2/Avaryss_And_Nymora.png'
import '../assets/monsters/God Wars 2/Gorvek_And_Vindicta.png'
import '../assets/monsters/God Wars 2/Gregorovic.png'
import '../assets/monsters/God Wars 2/Helwyr.png'
import '../assets/monsters/Rex Matriarchs/Orikalka.png'
import '../assets/monsters/Rex Matriarchs/Pthentraken.png'
import '../assets/monsters/Rex Matriarchs/Rathis.png'
import '../assets/pets/Dagannoth Kings/Prime_hatchling.png'
import '../assets/pets/Dagannoth Kings/Rex_hatchling.png'
import '../assets/pets/Dagannoth Kings/Supreme_hatchling.png'
import '../assets/pets/God Wars 2/Greg.png'
import '../assets/pets/God Wars 2/Lilwyr.png'
import '../assets/pets/God Wars 2/Nylessa_And_Ava.png'
import '../assets/pets/God Wars 2/Rawrvek_And_Vindiddy.png'
import '../assets/pets/Rex Matriarchs/Bagra.png'
import '../assets/pets/Rex Matriarchs/Corbi.png'
import '../assets/pets/Rex Matriarchs/Pavo.png'
import '../assets/status/Rex Matriarchs/Corrosion.png'
import '../assets/_Shared/Logo.png'
import '../assets/_Shared/Shop.png'
import '../assets/_Shared/Weapon_Special_Attack.png'
// #endregion

export async function setup(ctx: Modding.ModContext) {
    initTranslation(ctx);
    initLanguage(ctx);

    // Register our GameData
    // @ts-ignore: Supposedly non-matching type (e.g. "InsertEnd" vs. "InsertAfter" shop category order)
    await ctx.gameData.addPackage(SharedModData);

    // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
    await ctx.gameData.addPackage(DkModData);

    // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
    await ctx.gameData.addPackage(RmModData);

    // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
    await ctx.gameData.addPackage(Gwd2ModData);
}

/**
 * Patches multiple name/description getters, so they check our custom injected translations
 * @param ctx
 */
function initTranslation(ctx: Modding.ModContext) {
    const translation = new Translation(ctx);

    translation.init();
}

/**
 * Creates a list of translations for the current languages and registers it
 * @param ctx
 */
function initLanguage(ctx: Modding.ModContext) {
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
        'COMBAT_AREA_NAME',
        'COMBAT_SLAYER_NAME',
        'COMBAT_DUNGEON_NAME',
        'MODIFIER_DATA',
        'MONSTER_NAME',
        'MONSTER_DESCRIPTION',
        'PET_NAME',
        'SPECIAL_ATTACK_NAME',
        'SPECIAL_ATTACK_DESCRIPTION',
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

/**
 *
 * @param ctx
 */
function initDataPackages(ctx: Modding.ModContext) {

}