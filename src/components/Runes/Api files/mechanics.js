let mechanics = [
      {
        "name": "Sacrifice",
        "key": "sacrifice",
        "description": "Unpreventable unit destruction does not trigger any any on death events"
      },
      {
        "name": "Cleansed",
        "key": "cleansed",
        "description": "All negative conditions are removed"
      },
      {
        "name": "Loss of Life",
        "key": "lossoflife",
        "description": "Loss of life occurs when a unit loses health without taking damage"
      },
      {
        "name": "Web Terrain",
        "key": "web_terrain",
        "description": "Champions entering this space become Ensnared for 2 turns, unless they have <condition value=flying>Flying</condition> or are Race: Arthropod"
      },
      {
        "name": "Dead Magic Zone",
        "key": "dead_magic_zone",
        "description": "Enemy spells cannot be targeted in this space."
      },
      {
        "name": "Deployment Zone",
        "key": "deployment_zone",
        "description": "An area around Shrine or a font where Champions and Relics can be brought into play  "
      },
      {
        "name": "Chasm",
        "key": "chasm",
        "description": "When a non-Flying champion occupies this space, it is destroyed"
      },
      {
        "name": "Knockback",
        "key": "knockback",
        "description": "Pushes a target a number of spaces away. If the target hits an obstacle, both take 5 Physical damage for each remaining space. Non-flying units will use all their AP to prevent from being pushed off a chasm."
      },
      {
        "name": "Slowed",
        "key": "slowed",
        "description": "This champion has -2 SPD"
      },
      {
        "name": "Hallowed Ground",
        "key": "hallowed_ground",
        "description": "At beginning of your turn, friendly Priests, Shamans, and Paladins are cleansed and healed for 5 HP, and terrain modifications are removed from this space"
      },
      {
        "name": "Poison Cloud",
        "key": "poison_cloud",
        "description": "When a champion enters the poison cloud it becomes <condition value=poisoned>Poisoned</condition> for 2 turns. Champion in the cloud when its spawned (or champions spawned inside the cloud) take 6 damage. Any champions that move within the cloud take 3 damage. This damage ignores DEF."
      },
      {
        "name": "Dragonkin",
        "key": "dragonkin",
        "description": "Any champion with Race: Dragon, Race: Draksar or Race: Skeezick"
      },
      {
        "name": "Unstable Ground",
        "key": "unstableground",
        "description": "When a champion without <condition value=flying>Flying</condition> enters one of the affected spaces through normal movement, it takes 5 Physical damage"
      },
      {
        "name": "Shifting Ground",
        "key": "shiftingground",
        "description": "At the end of your turns, enemy champions on Shifting Ground lose all AP"
      },
      {
        "name": "Ice Terrain",
        "key": "ice_terrain",
        "description": "Champions occupying this space gets -1 SPD, unless they have <ability value=600>Arctic</ability>"
      },
      {
        "name": "Dispelled",
        "key": "dispelled",
        "description": "All positive conditions are removed"
      },
      {
        "name": "Immobile",
        "key": "immobile",
        "description": "This unit cannot move"
      },
      {
        "name": "Pacified",
        "key": "pacified",
        "description": "This unit cannot attack or use abilities to attack, cannot engage other champions. This effect cannot be cleansed"
      }
    ]

export {mechanics}    