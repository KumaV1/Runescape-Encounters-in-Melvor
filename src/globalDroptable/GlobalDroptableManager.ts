import { Constants } from '../Constants'
import { Constants as GlobalDroptableConstants } from './Constants'

/** From "CustomModifiersInMelvor" base mod */
declare global {
    interface Monster {
        isHuman: boolean,
        isDragon: boolean,
        isUndead: boolean
    }
}

export class GlobalDroptableManager {
    constructor(private readonly context: Modding.ModContext) { }

    patchMethods() {
        this.patchOnEnemyDeath();
    }

    /**
     *
     */
    private patchOnEnemyDeath(): void {
        /**
         * Add additional global rolls to enemy death
         * Conditions mimic the patched method, as it's hard to patch right in-between
         */
        this.context.patch(CombatManager, "onEnemyDeath").after(function () {
            this.enemy
            if ((this.selectedArea instanceof Dungeon)) {
                if (this.dungeonProgress === this.selectedArea.monsters.length) {
                    GlobalDroptableManager.rollGlobalDroptable(this);
                }
            } else if (this.activeEvent === undefined) {
                GlobalDroptableManager.rollGlobalDroptable(this);
            }
        });
    }

    /**
     * Roll to possible get one or more additional drops
     * @param cm
     */
    private static rollGlobalDroptable(cm: CombatManager): void {
        GlobalDroptableManager.rollForAncientEffigy(cm);
        GlobalDroptableManager.rollForSpiritGemBag(cm);

        if (mod.api.customModifiersInMelvor) {
            GlobalDroptableManager.rollForSalveAmulet(cm);
            GlobalDroptableManager.rollForDraconicVisage(cm);
        }
    }

    /**
     *
     * @param cm
     * @returns
     */
    private static rollForAncientEffigy(cm: CombatManager): void {
        if (!this.rollCbLevelScalingChance(cm.enemy.monster!,
            GlobalDroptableConstants.ANCIENT_EFFIGY_BASE_DROPRATE,
            GlobalDroptableConstants.ANCIENT_EFFIGY_CHANCE_INCREASE_PER_COMBAT_LEVEL)) {
            return;
        }

        GlobalDroptableManager.grantItem("Ancient_Effigy", cm);
    }

    /**
     *
     * @param cm
     * @returns
     */
    private static rollForSpiritGemBag(cm: CombatManager): void {
        if (!this.rollCbLevelScalingChance(cm.enemy.monster!,
            GlobalDroptableConstants.SPIRIT_GEM_BAG_BASE_DROPRATE,
            GlobalDroptableConstants.SPIRIT_GEM_BAG_CHANCE_INCREASE_PER_COMBAT_LEVEL)) {
            return;
        }

        GlobalDroptableManager.grantItem("Spirit_Gem_Bag", cm);
    }

    /**
     *
     * @param cm
     * @returns
     */
    private static rollForSalveAmulet(cm: CombatManager): void {
        // @ts-ignore Based on "Custom Modifiers in Melvor" mod
        if (!mod.api.customModifiersInMelvor.monsterIsUndead(cm.enemy.monster)) {
            return;
        }

        if (!this.rollCbLevelScalingChance(cm.enemy.monster!,
            GlobalDroptableConstants.SALVE_AMULET_BASE_DROPRATE,
            GlobalDroptableConstants.SALVE_AMULET_CHANCE_INCREASE_PER_COMBAT_LEVEL)) {
            return;
        }

        GlobalDroptableManager.grantItem("Salve_Amulet", cm);
    }

    /**
     *
     * @param cm
     * @returns
     */
    private static rollForDraconicVisage(cm: CombatManager): void {
        // @ts-ignore Based on "Custom Modifiers in Melvor" mod
        if (!mod.api.customModifiersInMelvor.monsterIsDragon(cm.enemy.monster)) {
            return;
        }

        if (!this.rollCbLevelScalingChance(cm.enemy.monster!,
            GlobalDroptableConstants.DRACONIC_VISAGE_BASE_DROPRATE,
            GlobalDroptableConstants.DRACONIC_VISAGE_CHANCE_INCREASE_PER_COMBAT_LEVEL)) {
            return;
        }

        GlobalDroptableManager.grantItem("Draconic_Visage", cm);
    }

    /**
     *
     * @param monster
     * @param baseChance
     * @param chanceIncreasePerCbLvl
     * @returns
     */
    private static rollCbLevelScalingChance(monster: Monster, baseChance: number, chanceIncreasePerCbLvl: number): Boolean {
        return rollPercentage(baseChance + (chanceIncreasePerCbLvl * monster.combatLevel));
    }

    /**
     *
     * @param localItemId
     * @param cm
     */
    private static grantItem(localItemId: string, cm: CombatManager) {
        const item = cm.game.items.getObjectByID(`${Constants.MOD_NAMESPACE}:${localItemId}`);
        if (item === undefined) {
            throw new Error(`Invalid item ID ${localItemId}`);
        }

        cm.bank.addItem(item, 1, true, true, false);
    }
}