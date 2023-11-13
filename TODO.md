# GLobal droptable
* Finish up items (full config) [DONE]
* Add translations for item names [DONE]
* Add upgrades for spirit gems and dragonfire shields [DONE]
* Add custom modifier for consuming effigies (CustomModifiersManager) (including translation) [DONE]
* Add shop purchases for effigies (4-5, giving 1% global skill xp each; 100, 500, 1000, 2500, 5000 cost?) [DONE]
* Add global droptable on enemy death (GlobalDroptableManager) [DONE]
* Add dragon type to Vindicta (compatiblity)
* Test all equipment, if they load properly after having been offline

# Automata

# Glacors
* Probably can't do "chance to do x" as passive, because it can only set (permanent) modifiers, but not effects
* Attacks
  * 25% chance for normal attack (mage)
  * 25% chance for ranged special (same damage as range)
  * 20% chance for special that deals 50% of current HP and applies slow+freeze for one turn
  * 10% chance for special that deals 99% of current HP (can kill if freeze is also still applied, so you gotta be fast)
    * When determining glacor attack speed, keep existence of "negative area effect" negation in mind
  * 10% chance for +3 turns of endurance (also mage normal attack)
  * 10% change for +3 turns of prayer sapping one (also mage normal attack)
    * Could possibly adjust "addPrayerPoints" (or rather, call it with negative value), but that will technically (wrongfully?) reduce the prayer-points-earned stat of the player 
    * The only somewhat sensical seems to be "increasedMaxHitBasedOnPrayerCost" or "increasedDamageReductionWithActivePrayer" (but decreased)
    * I guess, depending of state of the game, nullifying "increasedChanceToPreservePrayerPoints" could also have a use (by applying a huge negative value, that couldn't possibly get back to positive)

The glacyte effects might be configurable through a "Compound Effect", aka "Defines a custom compound effect. A meta-effect, randomly applys one of the subsequent effects in the effect array."

# Lost Grove
* Elven ritual shard possibly being a gem-slot item, which doesn't require AoD (-1 prayer point cost or something)
  * Maybe with "Upgrade" to a bone-type-item, so additional ritual shards still have a use

# FINDINGS
"increasedGlobalSkillXPPerLevel" doesn't seem to work (?), at least not as modifier on a consumable item?

"BaseEquipmentItemModificationData" currently doesn't allow to patch the "consumeOn" property. 
Because of that, the dragonkin lamp currently doesn't support actions specific to the AoD expansion, 
as adding them would result in errors for those without the expansion.