// Modules
// You can import script modules and have full type completion
import { Constants } from './Constants';
import { CustomModifiersInMelvorCompatibility } from './compatibility/CustomModifiersInMelvorCompatibility';
import { ExpansionsCompatibility } from './compatibility/ExpansionsCompatibility';
import { GlobalDroptableManager } from './globalDroptable/GlobalDroptableManager';
import { GlobalDroptableOverview } from './globalDroptable/GlobalDroptableOverview';
import { TinyIconsCompatibility } from './compatibility/TinyIconsCompatibility';
import { TranslationManager } from './translation/TranslationManager';

import { languages } from './translation/languages'

// Data
// Game data for registration
import SharedModData from '../data/_Shared/data.json'
import DkModData from '../data/Dagannoth Kings/data.json';
import RmModData from '../data/Rex Matriarchs/data.json';
import Gwd2ModData from '../data/God Wars 2/data.json';
import AutomataModData from '../data/Automata/data.json';
import GlacorModData from '../data/Glacors/data.json'

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
import '../assets/items/Glacors/Armadyl_Battlestaff.png'
import '../assets/items/Glacors/Armadyl_Rune.png'
import '../assets/items/Glacors/Dust_Of_Armadyl.png'
import '../assets/items/Glacors/Glaiven_Boots.png'
import '../assets/items/Glacors/Orb_Of_Armadyl.png'
import '../assets/items/Glacors/Ragefire_Boots.png'
import '../assets/items/Glacors/Shards_Of_Armadyl.png'
import '../assets/items/Glacors/Steadfast_Boots.png'
import '../assets/items/Automata/Pneumatic_Gloves.png'
import '../assets/items/Automata/Tracking_Gloves.png'
import '../assets/items/Automata/Static_Gloves.png'
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
import '../assets/monsters/Glacors/Glacor.png'
import '../assets/monsters/Glacors/Enduring_Glacyte.png'
import '../assets/monsters/Glacors/Sapping_Glacyte.png'
import '../assets/monsters/Glacors/Unstable_Glacyte.png'
import '../assets/monsters/Automata/Automaton_Guardian.png'
import '../assets/monsters/Automata/Automaton_Tracer.png'
import '../assets/monsters/Automata/Automaton_Generator.png'
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
import '../assets/pets/Automata/Cresbot.png'
import '../assets/pets/Glacors/Glacy.png'
import '../assets/status/Rex Matriarchs/Corrosion.png'
import '../assets/spells/Glacors/Storm_Of_Armadyl.png'
import '../assets/_Shared/Logo.png'
import '../assets/_Shared/Shop.png'
import '../assets/_Shared/Weapon_Special_Attack.png'
import '../assets/status/Bleed_Up_Negative.svg'

import '../src/globalDroptable/globalDroptableOverview.css'
// #endregion

export async function setup(ctx: Modding.ModContext) {
    initTranslation(ctx);

    // Register our GameData
    // @ts-ignore: Supposedly non-matching type (e.g. "InsertEnd" vs. "InsertAfter" shop category order)
    await ctx.gameData.addPackage(SharedModData);

    // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
    await ctx.gameData.addPackage(DkModData);

    // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
    await ctx.gameData.addPackage(RmModData);

    // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
    await ctx.gameData.addPackage(Gwd2ModData);

    // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
    await ctx.gameData.addPackage(GlacorModData);

    // @ts-ignore: Supposed non-matching type (e.g. "WeaponItemData" despite not being a weapon)
    await ctx.gameData.addPackage(AutomataModData);

    initGlobalDroptable(ctx);
    initOverviewContainer(ctx);
    initCompatibility(ctx);
}

/**
 * Patches multiple name/description getters, so they check our custom injected translations
 * Also creates a list of translations for the current languages and registers it
 * @param ctx
 */
function initTranslation(ctx: Modding.ModContext) {
    const tm = new TranslationManager(ctx);

    tm.patch();
    tm.register();
}

/**
 *
 * @param ctx
 */
function initGlobalDroptable(ctx: Modding.ModContext) {
    const gdm = new GlobalDroptableManager(ctx);

    gdm.patchMethods();
}

/**
 * Initializes the container that is then accessed through an entry in the sidebar
 * @param ctx
 */
function initOverviewContainer(ctx: Modding.ModContext) {
    // Because we're loading our templates.min.html file via the manifest.json,
    // the templates aren't available until after the setup() function runs
    ctx.onInterfaceReady(() => {
        // @ts-ignore: The container is guaranteed to exist
        const contentContainerElement: Element = document.getElementById('main-container');

        // Add template to container
        // Create overview by using component and template definitions
        ui.create(GlobalDroptableOverview(), contentContainerElement);
    });
}

/**
 * Initializes certain functionality, to enable/inject specialized compatibility
 * based on expansions and mods
 * @param ctx
 */
function initCompatibility(ctx: Modding.ModContext) {
    const expansionsCompatibility = new ExpansionsCompatibility(ctx);
    expansionsCompatibility.loadConditionalGamePackages();

    const cmimCompatiblity = new CustomModifiersInMelvorCompatibility(ctx);
    cmimCompatiblity.patch();

    TinyIconsCompatibility.initialize(ctx);
}