let conditions = [
      {
        "name": "Crystallize",
        "key": "crystallize",
        "description": "This champion is Shielded and may not move, attack, or activate special abilities. At the beginning of your turn, this champion heals 4 HP."
      },
      {
        "name": "Soul Tapped",
        "key": "soultapped",
        "description": "At the beginning of the affected units turn, all soultapped champions lose 2 life and you gain nora for every point of life lost this way"
      },
      {
        "name": "Illusion",
        "key": "illusion",
        "description": "Appears real but cannot attack or activate abilities, and will die if it takes any damage. Illusion death is unpreventable"
      },
      {
        "name": "Enraged",
        "key": "enraged3",
        "description": "+7 DMG for 2 turns"
      },
      {
        "name": "Impregnable",
        "key": "impregnable",
        "description": "Cannot take damage"
      },
      {
        "name": "Intoxicated",
        "key": "intoxicated",
        "description": "Dwarves and Brutes gain +2 dmg and +5hp. All other champions have damage reduced by 3 and lose all AP at the end each turn."
      },
      {
        "name": "Twisted",
        "key": "twisted",
        "description": "When this champion is successfully attacked, the attacking champion heals for 4 HP. This does not stack."
      },
      {
        "name": "Diseased",
        "key": "diseased",
        "description": "At the start of each turn, this unit takes Disease damage equal to this condition's duration."
      },
      {
        "name": "Immobile",
        "key": "immobile",
        "description": "This unit cannot move."
      },
      {
        "name": "Paralyzed",
        "key": "paralyzed_nobreak",
        "description": "Can not move, attack or use abilities. Has -2 DEF, cannot engage other champions and loses all AP at the start of each turn. "
      },
      {
        "name": "Frightened",
        "key": "frightened",
        "description": "This champion has -3 DMG and may not attack the unit that frightened it."
      },
      {
        "name": "Cursed",
        "key": "cursed",
        "description": "-1 DMG, -1 DEF, -1 SPD"
      },
      {
        "name": "Dogpiled",
        "key": "dogpiled",
        "description": "Receives +1 DMG from Hyaenids. This condition stacks."
      },
      {
        "name": "Shrunken",
        "key": "shrunken",
        "description": "This unit has its DMG, DEF and SPD reduced by 50%. This does not stack"
      },
      {
        "name": "Inhibited",
        "key": "inhibited",
        "description": "Cannot be healed."
      },
      {
        "name": "Gored",
        "key": "gored",
        "description": "Loses 1 life at the beginning of each turn. This condition does not stack."
      },
      {
        "name": "Shocked",
        "key": "shocked",
        "description": "At the start of each turn, this unit takes Electrical damage equal to this condition's duration."
      },
      {
        "name": "Enflamed",
        "key": "enflamed",
        "description": "At the end of source's turn, this unit deals 6 Fire damage to each champion within 2 spaces."
      },
      {
        "name": "Decaying",
        "key": "decaying",
        "description": "Whenever this unit would be healed, it instead loses HP equal to 50% of the heal."
      },
      {
        "name": "Reverie",
        "key": "reverie",
        "description": "This unit has +1 DMG. This does not stack."
      },
      {
        "name": "Bloodied",
        "key": "bloodied",
        "description": "This unit cannot stealth."
      },
      {
        "name": "Sandblasted",
        "key": "sandblasted",
        "description": "This champion has -3 DMG. This does not stack."
      },
      {
        "name": "Stunned",
        "key": "stunned",
        "description": "-2 DEF, cannot attack, move, activate abilities, or engage other Champions."
      },
      {
        "name": "Tagged",
        "key": "tagged",
        "description": "Enemies within 5 spaces gain Beset."
      },
      {
        "name": "Nora Shielded",
        "key": "norashielded",
        "description": "Whenever this champion takes damage, its owner recovers 1 point of nora per point of damage taken."
      },
      {
        "name": "Petrified",
        "key": "petrified",
        "description": "Has <ability value=35>Immunity: Physical,</ability> <ability value=757>Immobile,</ability> cannot gain AP, and cannot activate abilities"
      },
      {
        "name": "Buffered",
        "key": "buffered",
        "description": "While this champion is buffered damage to the champion is prevented and applied to the Buffer instead."
      },
      {
        "name": "Pacified",
        "key": "pacified",
        "description": "This champion cannot attack or use abilities to attack, and cannot engage other champions. This cannot be cleansed."
      },
      {
        "name": "Flying",
        "key": "flying",
        "description": "This unit ignores restrictions and penalties imposed by terrain and may move across chasm spaces without dying."
      },
      {
        "name": "Debilitated",
        "key": "debilitated",
        "description": "This champion's SPD is reduced by 1 at the beginning of every other of its owner's turns. The champion's SPD can not be reduced below 3."
      },
      {
        "name": "Branded",
        "key": "branded",
        "description": "When a Paladin or Priest makes a basic attack against this champion, the target takes 2 additional fire damage (ignores DEF). This does not stack."
      },
      {
        "name": "Incorporeal",
        "key": "incorporeal",
        "description": "This champion has Flying and cannot attack. It has Immunity - Physical and takes 75% less damage from all non-Magical sources. If it loses this condition whilst occupying impasssable terrain, it will die."
      },
      {
        "name": "Confused",
        "key": "confused",
        "description": "All upgrade abilities are lost"
      },
      {
        "name": "Impervious",
        "key": "impervious",
        "description": "Damage dealt to this champion is reduced to 0."
      },
      {
        "name": "Infectious",
        "key": "infectious",
        "description": "At the start of each turn, adjacent units become Diseased equal to this condition's duration."
      },
      {
        "name": "Defiled",
        "key": "defiled",
        "description": "Cannot be cleansed"
      },
      {
        "name": "Stealthed",
        "key": "stealthed",
        "description": "Unit's location is hidden from your opponent."
      },
      {
        "name": "Eviscerated",
        "key": "eviscerated",
        "description": "At the start of each turn, this unit takes Physical damage equal to this condition's duration."
      },
      {
        "name": "Crippled",
        "key": "crippled",
        "description": "This champion's DEF is reduced by 1 at the beginning of each of its turns."
      },
      {
        "name": "Solid",
        "key": "solid",
        "description": "This unit cannot become Incorporeal."
      },
      {
        "name": "Charred",
        "key": "charred",
        "description": "At the start of each turn, this unit takes Fire damage equal to this condition's duration."
      },
      {
        "name": "Engaged",
        "key": "engaged",
        "description": "A Champion may not move on the turn it becomes Engaged. Disengaging on a later turn costs 2 AP in addition to the normal movement cost. "
      },
      {
        "name": "Hunted",
        "key": "hunted",
        "description": "Receives 50% more damage from champions with Declare Hunted"
      },
      {
        "name": "Illuminated",
        "key": "illuminated",
        "description": "This champion has 0 DEF and its opponent gains 2 nora when it is successfully attacked. This effect is removed when triggered."
      },
      {
        "name": "Fatigued",
        "key": "fatigued",
        "description": "This unit has 0 AP"
      },
      {
        "name": "Enraged",
        "key": "enraged1",
        "description": "+3 DMG for 2 turns"
      },
      {
        "name": "Wearied",
        "key": "wearied",
        "description": "This champion's DMG will be reduced by 1 at the beginning of its owner's turn."
      },
      {
        "name": "Shielded",
        "key": "shielded",
        "description": "May not be the target of opposing spells"
      },
      {
        "name": "Grounded",
        "key": "grounded",
        "description": "This unit has lost Flying"
      },
      {
        "name": "Ascended",
        "key": "ascended",
        "description": "This unit has +3 RNG, +2 DEF, +30 HP"
      },
      {
        "name": "Chilled",
        "key": "chilled",
        "description": "At the start of each turn, this unit takes Frost damage equal to this condition's duration."
      },
      {
        "name": "Paralyzed",
        "key": "paralyzed",
        "description": "Can not move, attack or use abilities. Has -2 DEF, cannot engage other champions and loses all AP at the start of each turn. Loses Paralyzed when damaged"
      },
      {
        "name": "Scolded",
        "key": "scolded",
        "description": "This champion's activated abilities (including basic attacks) AP cost is increased by 4."
      },
      {
        "name": "Blinded",
        "key": "blinded",
        "description": "This unit's attacks automatically miss"
      },
      {
        "name": "Lethal",
        "key": "lethal",
        "description": "If a champion has 4 stacks of this condition, it is destroyed."
      },
      {
        "name": "Slowed",
        "key": "slowed",
        "description": "This champion has -2 SPD"
      },
      {
        "name": "Benediction",
        "key": "benediction",
        "description": "This unit has +3 DMG, +2 SPD, and +1 DEF. This does not stack."
      },
      {
        "name": "Burred",
        "key": "burred",
        "description": "When this champion moves a space through normal movement, it takes 1 Physical damage. When this champion activates a special ability that results in movement (such as Leap or Teleport), it takes 5 Physical damage."
      },
      {
        "name": "Stationary",
        "key": "stationary",
        "description": "This unit may not spend AP on normal movement. Relocation effects are not affected."
      },
      {
        "name": "Frozen",
        "key": "frozen",
        "description": "Has -1 DMG, -1 DEF and -1 SPD"
      },
      {
        "name": "Turtled",
        "key": "turtled",
        "description": "This unit becomes Impervious, Immobile, Pacified, and has an AP cap of 0 for 2 turns."
      },
      {
        "name": "Enraged",
        "key": "enraged2",
        "description": "+5 DMG for 2 turns"
      },
      {
        "name": "Poisoned",
        "key": "poisoned",
        "description": "At the start of each turn, this unit takes Poison damage equal to this condition's duration."
      },
      {
        "name": "Cocooned",
        "key": "cocoon",
        "description": "This champion is Pacified, Impervious and Immobile. After 3 turns, this champion loses Cooconed and gains +1 DEF, +1 SPD and +2 DMG. This effect does not stack."
      },
      {
        "name": "Summoned",
        "key": "summoned",
        "description": "Can not capture fonts or contest those of your opponent. Leaves no nora globe when destroyed, and has no spell presence."
      },
      {
        "name": "Distracted",
        "key": "distracted",
        "description": "This unit may only activate basic attacks"
      },
      {
        "name": "Scoured",
        "key": "scoured",
        "description": "At the start of each turn, this unit takes Acid damage equal to this condition's duration."
      },
      {
        "name": "Possessed",
        "key": "possessed",
        "description": "Controlled by the opponent"
      },
      {
        "name": "Sundered",
        "key": "sundered",
        "description": "Has -2 DEF. This condition stacks"
      },
      {
        "name": "Awestruck",
        "key": "awestruck",
        "description": "Has its DMG reduced by 50% and -1 SPD."
      },
      {
        "name": "Ensnared",
        "key": "ensnared",
        "description": "Movement by this champion costs 2 additional AP"
      },
      {
        "name": "Restrained",
        "key": "restrained",
        "description": ""
      },
      {
        "name": "Rooted",
        "key": "rooted",
        "description": "This champion may not move"
      },
      {
        "name": "Charmed",
        "key": "charmed",
        "description": "Has -2 DMG and may not attack or use abilities on the unit that Charmed it."
      }
    ]
 export {conditions}