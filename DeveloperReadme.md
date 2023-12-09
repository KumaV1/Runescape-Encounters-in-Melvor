# Good to know 
* As of now, any effect, item, asset or what-have-you, that is used for more than one boss (folder) is put into the "_Shared" folder
* While assets are grouped through sub folders, the final built doesn't have sub folders, so data files have to reference "assets/IMAGE_NAME.png"
* Assets are currently imported one by one (hopefully changed in the future) - please feel free to let me know if you add a lot of assets, as I quickly created a cmd to help me with this
* Run `npm install` in the root directory to download all relevant packages
* Run `npm run buildzip`, if you want to build a zip file (can be used for both testinmg through Creator Toolkit and mod update uploads)
  * The zip can be found in the `package` folder

# Remarks
* I myself am basically an RS3 only player, so faithful creations of OSRS bosses/raids may likely depend on other contributors
* Should this mod reach the realm of creating its own (combat) modifiers, then it might be worthwile to create a "Custom Modifiers" base mod, that could then be re-used by other mods as well.
* Regarding the idea of ancient effigies, implementation would be based on mastery tokens, being:
  * Create a custom modifier (named "ancientEffigy" for example)	
  * Create effigy item as "Token" type and add to its modifier property this newly created modifier
  * Patch the "bank.claimItemOnClick" function, to also check for this modifier and "consume" this item
  * Maybe implement a custom "increasedSkillXp" (flat) modifier, to be able to add dragonkin lamps as consumable
* Custom modifiers
  * If dependant on enemy/battle state, overwrite "character.getMaxHitModifier"
	* It calls "modifiers.getMaxHitModifier(type)", but also checks for battle states, which we can add custom stuff to
# Helpful commands (use [dev.Console](https://mod.io/g/melvoridle/m/devconsole) mod)
## Directly add a certain item to the bank, e.g. to quickly check a new item upgrade
_The creation of this list will surely be automated at some point (before new content I reckon)_
```js
game.bank.addItemByID("runescapeEncountersInMelvor:XXXXX", 1, false, true, true);

game.items.namespaceMaps.get("runescapeEncountersInMelvor").forEach(function(item) {
  game.bank.addItemByID(item.id, 1, false, true, true);
});
```

# Mechanical ideas
## Custom modifiers applying the given modifier to X following enemies in same dungeon
For example, a monster could have a "shield" special attack, that if being able to cast it before dying, 
all monsters on the same floor of a dungeon will have 25% more damage reduction

Applying the modifier on special attack, and checking it during the "OnEnemyDeath" event, would be easy enough.
The question would be, how much the CombatManager can be enhanced, 
without having to customize it to an extent that would increase likelyhood of not being compatible with other mods.

## Based on "The Ambassador" spinners and "TzKal Zuk" challenge waves
Minion during dungeon fight, which have slow attack interval 
and on attack put a stack of a debuff on you, 
while also adding "increasedDamageTakenPerAttack"-Modifier on themselves with value '100', 
meaning the next player attack instantly kills them.

Well, either that or just an extremely powerful burn or other effect, that instantly hits itself for its max hp.