# Summary
This mod adds several new combat encounters from both OSRS and RS3 to the world of [Melvor Idle](https://www.melvoridle.com/). Of course, this comes with a multitude of new drops, including a lot of new equipment.

# Prefice
I will not add GWD1 for now, [as a mod for that already exists](https://mod.io/g/melvoridle/m/godwars-recreation). Maybe it keeps being its own mod, maybe it will be merged into this one, would have to contact the mod creator first to decide.

# Credits
* [Jagex Ltd](https://www.jagex.com/de-DE/)
  * Publisher of [Melvor Idle](https://www.melvoridle.com/), which this mod is created for
  * Creator of [Runescape](https://www.runescape.com) and [Old School Runescape](https://oldschool.runescape.com), all content of this mod being based on those games
* [Old School Runescape Wiki](https://oldschool.runescape.wiki/) and [Runescape Wiki](https://runescape.wiki/) for providing transparent images for all non-Melvor assets, as well as being awesome sources of information in general
* [MaybeAsu](https://mod.io/g/melvoridle/u/maybeasu) for his [Old School Runescape GWD1](https://mod.io/g/melvoridle/m/godwars-recreation) dungeon mod, which inspired me to start this mod and was also helpful for guidance when getting started

## Contributors
The following people contributed to this Mod and helped and being where it is now
* DefinitelyNotMe

# Mod Settings ideas (if implementable)
* Toggling visibility of each combat area/slayer area/dungeon, to avoid cluttering the UI, if the mod happens to become bigger (alternatively/in addition, some UI customization to add new section?)
  * Probably by removing all custom entries on character load, followed by immediately recreating them through the existing "combat-area-menu" component, using a vue condition based on the respective toggle property in settings
* Allow toggling between image paths of assets, if they exist in both OSRS and RS3, so you can choose wichever you prefer
  * There will still be probably only one implementation respectively, with rewards based on one version (e.g. Nex would likely have the OSRS rewards, rather than RS3 and other GWD1 bosses wouldn't have items that were later added in RS3)
* Maybe be able to toggle whether you can see RS3/OSRS content? As there might be some people that just really don't want to deal with one version of the game...

# Plans / Ideas
* Improve images used, as some are very small, making them very blurry
* Improve balancing across the board
* Improve descriptions across the board
* Enabling localization
  * Can personally only provide English and German translations
  * Updated would initially only consist those languages, having to be added by someone else (unless machine translation is used)
* More encounters
  * Telos
    * I feel like just slapping some generic passives / special attacks on him isn't really doing im justice
    * That said, there are mechanics, that do not yet seem to exist in Melvor and might be hard (or at least a lot of effort) to implement
      * E.g. "On stun, re-roll what attack to do, if current next attack is a certain special attack"
      * E.g. "On next attack selection, if attack is certain special, greatly lower attack interval, to simulate charging up (and allow for cancellation)"
      * E.g. "On death/spawn, add/remove x stacks of a debuff" (I think there are already some debuffs and corresponding modifiers like that)
  * Kbd and Chaos Elemental as part of a low level "Wilderness / Forinthy" area, if someone has ideas for rewards
  * GWD3 (very high level)
    * Bosses would drop T3 troves
    * Using resonant anima to buy T1/T2 troves from shop, for additional resources
      * Shop purchase to be able to gain Resonant anima of Bik through skilling
      * Shop purchase to be able to buy T3 Bik troves in shop, instead of just T1/T2
    * Scriptures / Manuscripts as Consumables
    * Weapons being (among) the generally strongest for "Melvor Full", at least purely offensively
    * If an idea comes to mind, then a Tzhaar combat area and Tzekhaar front would drop Tokkul to spend on something
    * One time shop purchase per front, akin to the elemental dungeon purchases
  * Others (any ideas? feel free to share them and we can see what we can do)

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
  * For example, GWD2 bosses having chance based drop, that has to be combined and then used for a shop purchase to unlock Telos (and similar with Nex in GWD1)

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

## Boss encounters

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
  * There is no "niche" for the armour though, assuming the GWD1 rewards are based on OSRS, considering Nex would only drop armour for one combat style (as the main difference between Nex armour and GWD2 armour is that the latter does not provide prayer/hp bonus)
    * Have the niche be low defense but accuracy in exchange for that defense

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
* Aside from a boss fight, could probably make a shop purchase using a new modifier, implementing getting anima akin to Bird's nests, and then buy t3 troves from shop

#### TzKal-Zuk / The Tzekhaar front
* This is the RS3 "farmable/more easy" version of the Zuk encounter, **not** meant to be (equal to) the Inferno of OSRS.
* High enemy count encounter, switching between normal mobs, Jads/Har-Aken, a non-attacking Zuk (maybe) and the final confrontation with Zuk himself
  * Overall HP pool supposed to be higher than the other 3, somewhat representing the wave-based encounter and the time it takes from RS3
* Rewards
  * Ek-ZekKil
    * Special attack possibly based on RS3 version (bleed-focused)
  * Scripture of Ful (new equip slot?) or Manuscripts of Ful for the consumable slot
  * TokKul - can be gotten here or from a new combat area (the latter being easier on the required stats) with a bunch of shop purchases requiring it (some little stat boosts, jad and har-aken pet, maybe a chest containing some loot? the last one would basically be similar to the god dungeon shards)
  * Mechanic ideas
    * A **lot** of floors and enemies, making it not necessarily the hardest but definitely longst encounter
	* On every monster hit, there is a chance of Zuk doing the flame wall (what is accuracy and damage based on? Look for existing cases of this for inspiration)
	* Sitting Zuk as enemy, with extreeemly slow attack interval, but if he attacks even once, it's lights out (Accuracy & Damage threshold) as in that case he has made up his mind not to entertain you further
	* I wonder how Jads/Har-Aken could be integrated (Har-Aken with passives and stacks I guess, but what about the supposed Jad niche, which wouldn't fit afking the dungeon)
  
#### Zamorakian Undercity
* Two different implementations
  * A farmable one being only the Zamorak encounter and without P7 (so 6 Zammy phases with 6 Channelers and maybe some demons inbetween)
    * Would reward the BotlG
	  * Special attack (and maybe passive) possibly based on RS3 version (increase hit count or alternatively attack speed)
  * A one time dungeon encounter, representing the entirety of the Elite Dungeon + Boss fight, this time including P7
    * P7 would probably be like a DPS race and/or HP+DR check in order to finish him before, or being able to survive, his nuke (requiring top-notch equipment, being meant to be among the hardest encounters of the game)
	* Some nice reward for said one-time completion (Different pet than "normal mode"? Some other passive unlock? An item? ...?)
	* Possible reflect damage to limit damage output of player, so they don't "one-shot" themselves over their Auto-Eat-Threshold?