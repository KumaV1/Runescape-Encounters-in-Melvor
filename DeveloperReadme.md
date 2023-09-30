# Credits
* [MaybeAsu](https://mod.io/g/melvoridle/u/maybeasu) for his OSRS GWD1 dungeon mod, which helped me quickly understand how to create this mod (bare new mechanics and stuff, if there ever are any)
* The [OSRS Wiki](https://oldschool.runescape.wiki/) and [RS3 Wiki](https://runescape.wiki/) for providing transparent images for all non-Melvor assets

## Contributors
Thank you to the following people that helped in the development of this mod. The mod wouldn't be where it is now without them
* DefinitelyNotMe

# Introduction
* I may or may not take a long time to actually work on this stuff, if it ever comes to fruition at all
* I myself am basically an RS3 only player, so faithful creations of OSRS bosses/raids would likely depend on other contributors
* I'm worried about the sheer amount of possible content that **could** be added and possibly not being able to find a place for every new type of equipment (especially with my lack of overview regarding Melvor combat progression)
* Please take any stats (at least pre v1.0) with a huge grain of salt, as I only recently came back to Melvor Idle and do not know what kind of DR and the like to expect at certain stages of the game
  * Because of that, basically all "initial stats"/"stat ideas" will be based on 990HP and no DR, which should make it fairly easy to convert them to a more realistic value later on
  * Aside from stats, this would also go for any sort of balancing of special attacks, buffs/debuffs, etc.
* As of now, any effect, item, asset or what-have-you, that is used for more than one boss (folder) is put into the "_Shared" folder.

# Implementation ideas / notes

## Prefice 
* All encounters based on bosses, even if only added as normal mob encounters (because they are just so weak, heh), would follow the spirit of having a boss pet
  * For example, I don't feel like forcing low level Dagannoths/Dinosaurs encounters before being able to battle the respective Dagannoth king / Rex matriarch
    * Or should I, just to increase the time it takes for a "clear"?
* I'm not sure if it would have to be its own "expansion" mod, but it might be nice for higher level bosses to be able to drop some ThtH/AoD items

## Shop Purchases (all categorized into a mod-specific section?)
* GWD2 bosses dropping sigils, being able to buy improved drop rates (if possible) specific to the bosses
* Blessing (or whatever to call it) of [...], adding skilling buffs akin to the Elemental Dungeons (example requiring GWD3 anima or dungeon completions?)
* The pontifex upgrade could be a shop item, unlocking a new "combatPassive" that is only active in GWD3 dungeons?
* Unlocking some places through shop unlocks, if they make sense from a "lore" or "item required" perspective

* Maybe put **all** dungeons and slayer areas behind shop purchases, just to be able to add a small description (e.g. "You may get yourself some nice mid-level weapons here")

## Combat Areas

### Lairs of Dagannoth Kings and Rex Matriarchs
* Low-level and Mid-level
* Each king/queen being its own normal mob encounter, only damageable by their respective combat style
  * Rex matriarchs would also have some special attack, probably
* Rewards
  * New rings from Dagannoth Kings
  * Enhancement to said rings from Rex Matriarchs

## Slayer Areas

### Polypore dungeon
* Mid-level slayer req
* Rewards
  * Mid-level magic staff, main drawing point being no rune cost whatsoever (but can only cast one specific spell)
  * Maybe also ganodermic armour (?) - would there be a niche for mid-level offensive magic stats, but also offering high-level-compatible defensive magic stats?
### Raptor's training ground (Living wyverns, Warrior Camels, Ripper demons, Archeon mammoths)
* High-level slayer req
* Rewards
  * Their respective weapons
  * Keys/Key parts that can be combined to then be opened like a chest, giving several possible rewards among the drops of the 4 slayer monsters (including their weapons)

## Dungeons / Boss encounters

### OSRS
I am not too knowledgable, so most would have to be thought of by others, I asumme. Ideas could be
* All 3 raids
* Desert Treasure 2 Bosses

### (Exiled) Kalphite Hives
* Boss being KQ and/or KK
* If KQ is involved, should probably also add Barrows, so that Verac's can be used to actually afk KQ
* Doesn't feel right to award a powerful meele weapon through KK - maybe nerf the stats (or the fact it doesn't have a special) or think of new interesting rewards ("Raptor buff" by defeating each boss once, heh)
  * Monsters have a property defining whether they are a boss, so using .mjs one could probably check kc for every monster that is considered a boss and re-check all bosses every time a boss has its kc increased to "1" (should probably also be checked on each character reload, in case other mobs add other bosses, so the buff isn't necessarily permanent once unlocked at some point)

### Elite Dungeon(s)
* Not thought about yet

### God Wars 1
* Just like what "MaybeAsu" implemented, I reckon (have to ask for approval first)

### God Wars 2 - The Heart
* Reward ideas for all bosses
  * Similar to RS3, have the niche of the weapons be (comparitively to its target level area) mediocre damage but high accuracy

### Elder God Wars
* Reward ideas for all fronts
  * Their respective scripture (new equip slot?) or Manuscripts as consumables
  * Resonant anima and the "Pontifex" ring giving some boosts to the front battles - maybe also add an item combined with Aorfeit's signet ring, that combines their effects, so you do not have to choose (requiring both + big chunk of all anima)

#### Kerapac / The Nodon front
* 4 page Kerapac fight, with maybe Nodon dragonkin enemies before that
* Rewards
  * Fractured staff of Armadyl, a very high-level magic weapon (two-handed)
    * Special attack possibly based on RS3 version (crit-focused)
  * Scripture of Jas (new equip slot?) or Manuscripts of Jas for the consumable slot
  * Maybe also Kerapac's wristbrands as magic gloves with some fitting effect for Melvor

#### Arch-Glacor / The Glacor front
* 1 phase Arch-Glacor fight, with high HP pool and 5 possible special attacks
* Rewards
  * Scripture of Wen (new equip slot?) or Manuscripts of Wen for the consumable slot

#### Croesus / The Croesus front
* Supposed to be a skilling boss, but no idea how one would implement that into Melvor

#### TzKal-Zuk / The Tzekhaar front
* This is the RS3 "farmable/more easy" version of the Zuk encounter, **not** meant to be (equal to) the Inferno of OSRS.
* High enemy count encounter, switching between normal mobs, Jads/Har-Aken, a non-attacking Zuk (maybe) and the final confrontation with Zuk himself
  * Overall HP pool supposed to be higher than the other 3, somewhat representing the wave-based encounter and the time it takes from RS3
* Rewards
  * Ek-ZekKil
    * Special attack possibly based on RS3 version (bleed-focused)
  * Scripture of Ful (new equip slot?) or Manuscripts of Ful for the consumable slot
  
#### Zamorakian Undercity
* Two different implementations
  * A farmable one being only the Zamorak encounter and without P7 (so 6 Zammy phases with 6 Channelers and maybe some demons inbetween)
    * Would reward the BotlG
	  * Special attack (and maybe passive) possibly based on RS3 version (increase hit count or alternatively attack speed)
  * A one time dungeon encounter, representing the entirety of the Elite Dungeon + Boss fight, this time including P7
    * P7 would probably be like a DPS race and/or HP+DR check in order to finish him before, or being able to survive, his nuke (requiring top-notch equipment, being meant to be among the hardest encounters of the game)
	* Some nice reward for said one-time completion (Different pet than "normal mode"? Some other passive unlock? An item? ...?)