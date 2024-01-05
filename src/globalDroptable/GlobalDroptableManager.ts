import { Constants } from '../Constants'
import { Constants as GlobalDroptableConstants } from './Constants'

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
            const doubleLoot: Boolean = rollPercentage(this.player.modifiers.combatLootDoubleChance);

            // While inside a dungeon
            if (this.selectedArea instanceof Dungeon) {
                GlobalDroptableManager.rollGlobalDroptableAnyDeath(this, doubleLoot);
                if (this.dungeonProgress === this.selectedArea.monsters.length) {
                    GlobalDroptableManager.rollGlobalDroptableNonDungeonMinionDeath(this, doubleLoot);
                }
            }

            // While outside a dungeon and also not in an event (aka "Impending Darkness")
            else if (this.activeEvent === undefined) {
                GlobalDroptableManager.rollGlobalDroptableAnyDeath(this, doubleLoot);
                GlobalDroptableManager.rollGlobalDroptableNonDungeonMinionDeath(this, doubleLoot);
            }
        });
    }

    /**
     * Roll items that are dropped by absolutely every monster
     * @param cm
     * @param doubleLoot
     */
    private static rollGlobalDroptableAnyDeath(cm: CombatManager, doubleLoot: Boolean): void {
        GlobalDroptableManager.rollForAncientEffigy(cm, doubleLoot);
        GlobalDroptableManager.rollForSpiritGemBag(cm, doubleLoot);
    }

    /**
     * Roll items that can be dropped by most monsters,
     * except in dungeons where it can only drop from the last monster
     * @param cm
     * @param doubleLoot
     */
    private static rollGlobalDroptableNonDungeonMinionDeath(cm: CombatManager, doubleLoot: Boolean): void {
        GlobalDroptableManager.rollForSalveAmulet(cm, doubleLoot);
        GlobalDroptableManager.rollForDraconicVisage(cm, doubleLoot);
    }

    /**
     *
     * @param cm
     * @param doubleLoot
     * @returns
     */
    private static rollForAncientEffigy(cm: CombatManager, doubleLoot: Boolean): void {
        if (!this.rollCbLevelScalingChance(cm.enemy.monster!,
            GlobalDroptableConstants.ANCIENT_EFFIGY_BASE_DROPRATE,
            GlobalDroptableConstants.ANCIENT_EFFIGY_CHANCE_INCREASE_PER_COMBAT_LEVEL)) {
            return;
        }

        GlobalDroptableManager.grantItem("Ancient_Effigy", cm, doubleLoot);
    }

    /**
     *
     * @param cm
     * @param doubleLoot
     * @returns
     */
    private static rollForSpiritGemBag(cm: CombatManager, doubleLoot: Boolean): void {
        if (!this.rollCbLevelScalingChance(cm.enemy.monster!,
            GlobalDroptableConstants.SPIRIT_GEM_BAG_BASE_DROPRATE,
            GlobalDroptableConstants.SPIRIT_GEM_BAG_CHANCE_INCREASE_PER_COMBAT_LEVEL)) {
            return;
        }

        GlobalDroptableManager.grantItem("Spirit_Gem_Bag", cm, doubleLoot);
    }

    /**
     *
     * @param cm
     * @param doubleLoot
     * @returns
     */
    private static rollForSalveAmulet(cm: CombatManager, doubleLoot: Boolean): void {
        if (!cm.player.target.isUndead) {
            return;
        }

        if (!this.rollCbLevelScalingChance(cm.enemy.monster!,
            GlobalDroptableConstants.SALVE_AMULET_BASE_DROPRATE,
            GlobalDroptableConstants.SALVE_AMULET_CHANCE_INCREASE_PER_COMBAT_LEVEL)) {
            return;
        }

        GlobalDroptableManager.grantItem("Salve_Amulet", cm, doubleLoot);
    }

    /**
     *
     * @param cm
     * @param doubleLoot
     * @returns
     */
    private static rollForDraconicVisage(cm: CombatManager, doubleLoot: Boolean): void {
        if (!cm.player.target.isDragon) {
            return;
        }

        if (!this.rollCbLevelScalingChance(cm.enemy.monster!,
            GlobalDroptableConstants.DRACONIC_VISAGE_BASE_DROPRATE,
            GlobalDroptableConstants.DRACONIC_VISAGE_CHANCE_INCREASE_PER_COMBAT_LEVEL)) {
            return;
        }

        GlobalDroptableManager.grantItem("Draconic_Visage", cm, doubleLoot);
    }

    /**
     * Roll whether to drop the corresponding item
     * @param monster the monster being fought, whose combat level has an effect on the final droprate
     * @param baseChance the base chance for the item, without taking combat level into account at all
     * @param chanceIncreasePerCbLvl the flat increase to the base chance per combat level
     * @returns
     */
    private static rollCbLevelScalingChance(monster: Monster, baseChance: number, chanceIncreasePerCbLvl: number): Boolean {
        return rollPercentage(baseChance + (chanceIncreasePerCbLvl * monster.combatLevel));
    }

    /**
     * Adds 1 of the given item straight into the bank, as long as the bank isn't full
     * @param localItemId id without mod namespace, as this method currently only grants items specific to this mod
     * @param cm instance of the combat manager
     * @param doubleLoot whether to grant 2 instead of 1 of the given item
     */
    private static grantItem(localItemId: string, cm: CombatManager, doubleLoot: Boolean) {
        const item = cm.game.items.getObjectByID(`${Constants.MOD_NAMESPACE}:${localItemId}`);
        if (item === undefined) {
            throw new Error(`Invalid item ID ${localItemId}`);
        }

        cm.bank.addItem(item, doubleLoot ? 2 : 1, true, true, false);
    }
}