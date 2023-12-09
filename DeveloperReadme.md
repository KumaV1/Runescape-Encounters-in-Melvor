# Good to know 
* As of now, any effect, item, asset or what-have-you, that is used for more than one boss (folder) is put into the "_Shared" folder
* While assets are grouped through sub folders, the final built doesn't have sub folders, so data files have to reference "assets/runescapeEncountersInMelvor/IMAGE_NAME.png"
* Run `npm install` in the root directory to download all relevant packages
* Run `npm run buildzip` in the root directory, if you want to build a zip file (can be used for both testing through Creator Toolkit and mod update uploads)
  * The zip can be found in the `package` folder

# Remarks
* I myself am basically an RS3 only player, so faithful creations of OSRS bosses/raids may likely depend on other contributors

# Helpful commands (use [dev.Console](https://mod.io/g/melvoridle/m/devconsole) mod or [enable DevTools for Steam Client](https://wiki.melvoridle.com/w/Mod_Creation/Enabling_DevTools_for_the_Steam_Client))
## Directly add a certain item to the bank, e.g. to quickly check a new item upgrade
```js
game.bank.addItemByID("runescapeEncountersInMelvor:XXXXX", 1, false, true, true);

game.items.namespaceMaps.get("runescapeEncountersInMelvor").forEach(function(item) {
  game.bank.addItemByID(item.id, 1, false, true, true);
});
```

# Mechanical ideas
## Custom modifiers applying the given modifier to X following enemies in same dungeon
_Created an [issue](https://github.com/KumaV1/Custom-Modifiers-in-Melvor/issues/22) in base mod repository._

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