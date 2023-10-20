# Introduction
* I may or may not take a long time to actually work on this stuff, if it ever comes to fruition at all
* I myself am basically an RS3 only player, so faithful creations of OSRS bosses/raids would likely depend on other contributors
* I'm worried about the sheer amount of possible content that **could** be added and possibly not being able to find a place for every new type of equipment (especially with my lack of overview regarding Melvor combat progression)
* Please take any stats (at least pre v1.0) with a huge grain of salt, as I only recently came back to Melvor Idle and do not know what kind of DR/HP/Damage etc. to expect at certain stages of the game
  * Because of that, basically all "initial stats"/"stat ideas" will be based on 990HP and no DR, which should make it fairly easy to convert them to a more realistic value later on
  * Aside from stats, this would also go for any sort of balancing of special attacks, buffs/debuffs, etc.
* As of now, any effect, item, asset or what-have-you, that is used for more than one boss (folder) is put into the "_Shared" folder.
* I should probably check whether the data-file-patch order in the manifest.js is relevant (e.g. Rex Matriarch drops upgrading DK rings)

# Helpful commands (use [dev.Console](https://mod.io/g/melvoridle/m/devconsole) mod)
## Directly add a certain item to the bank, e.g. to quickly check a new item upgrade
```js
game.bank.addItemByID("runescapeEncountersInMelvor:XXXXX", 1, false, true, true)
```