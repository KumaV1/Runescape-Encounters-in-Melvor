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
        const doubleLoot: Boolean = rollPercentage(cm.player.modifiers.combatLootDoubleChance);

        GlobalDroptableManager.rollForAncientEffigy(cm, doubleLoot);
        GlobalDroptableManager.rollForSpiritGemBag(cm, doubleLoot);
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
    private static grantItem(localItemId: string, cm: CombatManager, doubleLoot: Boolean) {
        const item = cm.game.items.getObjectByID(`${Constants.MOD_NAMESPACE}:${localItemId}`);
        if (item === undefined) {
            throw new Error(`Invalid item ID ${localItemId}`);
        }

        cm.bank.addItem(item, doubleLoot ? 2 : 1, true, true, false);
    }
}