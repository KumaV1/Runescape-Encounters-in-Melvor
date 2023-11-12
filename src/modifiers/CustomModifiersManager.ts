import { Constants } from './Constants'

declare global {
    interface StandardModifierObject<Standard> {
        ancientEffigy: Standard
    }

    interface PlayerModifiers {
        /* Boolean | Alternatively, could make this the xp definition and each tier of effigy its own item */
        ancientEffigy: number
    }
}

export class CustomModifiersManager {
    constructor(private readonly context: Modding.ModContext) {}

    /**
     *
     */
    public registerModifiers() {
        this.registerAncientEffigyModifier();
    }

    /**
     *
     */
    public patchMethods() {
        this.patchBank();
    }

    /**
     *
     */
    private registerAncientEffigyModifier() {
        modifierData.ancientEffigy = {
            get langDescription() {
                return getLangString('MODIFIER_DATA_ancientEffigy');
            },
            description: '',
            isSkill: false,
            isNegative: false,
            tags: [],
        };
    }

    /**
     *
     */
    private patchBank() {
        this.context.patch(Bank, "claimItemOnClick").after(function (undefined, item, quantity): void {
            const bankItem = this.items.get(item);
            if (!bankItem) {
                return;
            }

            quantity = Math.min(bankItem.quantity, quantity);
            if (item.modifiers.ancientEffigy !== undefined) {
                // Each property will represent a skill, with the value being the amount of xp to grant
                const rollableSkills: AnySkill[] = this.game.skills.filter(s => s.isUnlocked);
                const highestIndex = rollableSkills.length - 1;

                // Roll experience for skills
                for (var i = 0; i < quantity; i++) {
                    let xpDistribution: { [key: string]: number } = {};

                    for (var j = 0; j < Constants.ANCIENT_EFFIGY_XP_ROLLS.length; j++) {
                        // Roll skill
                        const rolledSkill = rollableSkills[rollInteger(0, highestIndex)];

                        // Initialize property with value 0, if not yet existent
                        xpDistribution[rolledSkill.id] ??= 0;

                        // Add xp
                        xpDistribution[rolledSkill.id] += Constants.ANCIENT_EFFIGY_XP_ROLLS[j] * rolledSkill.level;
                    }

                    // Add xp and create skill xp notifications (utils), if it doesn't happen automantically
                    // REMARK: Run in the loop, as too many effigies at once seem to be able to cause "overflow"
                    Object.entries(xpDistribution).forEach(([key, value]) => {
                        const skill = this.game.skills.getObjectByID(key)!;
                        skill.addXP(value);
                    });
                    // Grant dragonkin lamps
                    this.game.bank.addItemByID("runescapeEncountersInMelvor:Dragonkin_Lamp", 1, false, true, true);
                }
            }
        });
    }
}