import { Constants } from '../Constants'
import { Constants as GlobalDroptableConstants } from '../globalDroptable/Constants';

interface GlobalDroptableOverviewItem {
    media: string,
    name: string,
    baseChanceDenominator: number,
    chanceIncreaseInfo: string,
    limitations: string[]
}

interface GlobalDroptableOverviewProps {
    items: GlobalDroptableOverviewItem[]
}

// @ts-ignore: 'Component' is unknown for some reason
export function GlobalDroptableOverview(): Component<GlobalDroptableOverviewProps> {
    let props: GlobalDroptableOverviewProps = {
        items: []
    };

    addObject(
        "Ancient_Effigy",
        GlobalDroptableConstants.ANCIENT_EFFIGY_BASE_DROPRATE,
        GlobalDroptableConstants.ANCIENT_EFFIGY_CHANCE_INCREASE_PER_COMBAT_LEVEL
    );
    addObject(
        "Spirit_Gem_Bag",
        GlobalDroptableConstants.SPIRIT_GEM_BAG_BASE_DROPRATE,
        GlobalDroptableConstants.SPIRIT_GEM_BAG_CHANCE_INCREASE_PER_COMBAT_LEVEL
    );
    addObject(
        "Salve_Amulet",
        GlobalDroptableConstants.SALVE_AMULET_BASE_DROPRATE,
        GlobalDroptableConstants.SALVE_AMULET_CHANCE_INCREASE_PER_COMBAT_LEVEL,
        [
            getLangString(`${Constants.MOD_NAMESPACE}_Global_Droptable_Overview_Limitation_Undead_Only`),
            getLangString(`${Constants.MOD_NAMESPACE}_Global_Droptable_Overview_Limitation_Only_Last_In_Dungeons`)
        ]
    );
    addObject(
        "Draconic_Visage",
        GlobalDroptableConstants.DRACONIC_VISAGE_BASE_DROPRATE,
        GlobalDroptableConstants.DRACONIC_VISAGE_CHANCE_INCREASE_PER_COMBAT_LEVEL,
        [
            getLangString(`${Constants.MOD_NAMESPACE}_Global_Droptable_Overview_Limitation_Dragons_Only`),
            getLangString(`${Constants.MOD_NAMESPACE}_Global_Droptable_Overview_Limitation_Only_Last_In_Dungeons`)
        ]
    );

    function addObject(localItemId: string, baseChance: number, chanceIncreasePerCb: number, limitations?: string[] | undefined) {
        const item = game.items.getObjectByID(`${Constants.MOD_NAMESPACE}:${localItemId}`);
        if (item) {
            const itemObj: GlobalDroptableOverviewItem = {
                media: item.media,
                name: getLangString(`ITEM_NAME_${item.localID}`),
                baseChanceDenominator: (1 / baseChance) * 100,
                chanceIncreaseInfo: templateLangString(`${Constants.MOD_NAMESPACE}_Global_Droptable_Overview_Chance_Increase_Per_Cb_Info`, { averageCbPerNumerator: formatNumber(Math.ceil(baseChance / chanceIncreasePerCb)) }),
                limitations: limitations ??= []
            };
            props.items.push(itemObj);
        }
    }

    // Render
    return {
        $template: '#runescape-Encounters-in-Melvor__global-droptable-overview-container-template',
        items: props.items
    }
}