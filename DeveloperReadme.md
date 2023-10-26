# Introduction
* I myself am basically an RS3 only player, so faithful creations of OSRS bosses/raids may likely depend on other contributors
* As of now, any effect, item, asset or what-have-you, that is used for more than one boss (folder) is put into the "_Shared" folder.
* I should probably check whether the data-file-patch order in the manifest.js is relevant (e.g. Rex Matriarch drops upgrading DK rings)

# Remarks
* Should this mod reach the realm of creating its own (combat) modifiers, then it might be worthwile to create a "Custom Modifiers" base mod, that could then be re-used by other mods as well.
* Regarding the idea of ancient effigies, implementation would be based on mastery tokens, being:
  * Create a custom modifier (named "ancientEffigy" for example)	
  * Create effigy item as "Token" type and add to its modifier property this newly created modifier
  * Patch the "bank.claimItemOnClick" function, to also check for this modifier and "consume" this item

# Helpful commands (use [dev.Console](https://mod.io/g/melvoridle/m/devconsole) mod)
## Directly add a certain item to the bank, e.g. to quickly check a new item upgrade
_The creation of this list will surely be automated at some point (before new content I reckon)_
```js
game.bank.addItemByID("runescapeEncountersInMelvor:XXXXX", 1, false, true, true)
```

```js
game.bank.addItemByID("runescapeEncountersInMelvor:Dagannoth_Bones", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Archers_Ring", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Seers_Ring", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Warrior_Ring", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Berserker_Ring", 1, false, true, true)

game.bank.addItemByID("runescapeEncountersInMelvor:Dinosaur_Bones", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Stalkers_Ring", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Channellers_Ring", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Champions_Ring", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Reavers_Ring", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Heart_Of_The_Archer", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Heart_Of_The_Seer", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Heart_Of_The_Warrior", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Heart_Of_The_Berserker", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Savage_Plume", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Savage_Spear_Cap", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Savage_Spear_Shaft", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Savage_Spear_Tip", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Laniakeas_Spear", 1, false, true, true)

game.bank.addItemByID("runescapeEncountersInMelvor:Dormant_Anima_Core_Helm", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Dormant_Anima_Core_Body", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Dormant_Anima_Core_Legs", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Helm_Of_Seren", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Body_Of_Seren", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Legs_Of_Seren", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Wand_Of_The_Cywir_Elders", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Orb_Of_The_Cywir_Elders", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Crest_Of_Seren", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Helm_Of_Zamorak", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Body_Of_Zamorak", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Legs_Of_Zamorak", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Blade_Of_Nymora", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Blade_Of_Avaryss", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Crest_Of_Zamorak", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Helm_Of_Zaros", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Body_Of_Zaros", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Legs_Of_Zaros", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Dragon_Rider_Lance", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Crest_Of_Zaros", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Helm_Of_Sliske", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Body_Of_Sliske", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Anima_Core_Legs_Of_Sliske", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Shadow_Glaive", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Offhand_Shadow_Glaive", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Crest_Of_Sliske", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Ancient_Sigil_Piece_Seren", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Ancient_Sigil_Piece_Sliske", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Ancient_Sigil_Piece_Zamorak", 1, false, true, true)
game.bank.addItemByID("runescapeEncountersInMelvor:Ancient_Sigil_Piece_Zaros", 1, false, true, true)
```

# Mechanical ideas
## Based on "The Ambassador" spinners and "TzKal Zuk" challenge waves
Minion during dungeon fight, which have slow attack interval 
and on attack put a stack of a debuff on you, 
while also adding "increasedDamageTakenPerAttack"-Modifier on themselves with value '100', 
meaning the next player attack instantly kills them.

Well, either that or just an extremely powerful burn or other effect, that instantly hits itself for its max hp.