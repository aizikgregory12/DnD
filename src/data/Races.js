const Races = [
    {
        name: "Dwarf",
        abilityScoreIncrease: {
            Constitution: 2,
        },
        speed: 25,
        traits: ["Dwarven Resilience", "Stonecunning", "Darkvision"],
        proficiences: {
            weapon: ["Battleaxe", "Handaxe", "Light Hammer", "Warhammer"],
            tool: ["Smith's Tools", "Brewer's Supplies", "Mason's Tools"],
        },
        languages: ["Common", "Dwarvish"],
        subRaces: [
            {
                name: "Hill Dwarf",
                abilityScoreIncrease: {
                    Wisdom: 1,
                },
                traits: ["Dwarven Toughness"],
            },
            {
                name: "Mountain Dwarf",
                abilityScoreIncrease: {
                    Strength: 2,
                },
                traits: ["Dwarven Armor Training"],
            }
        ]
    },
    {
        name: "Elf",
        abilityScoreIncrease: {
            Dexterity: 2,
        },
        speed: 30,
        traits: ["Keen Senses", "Fey Ancestry", "Trance", "Darkvision"],
        languages: ["Common", "Elvish"],
        subRaces: [
            {
                name: "High Elf",
                abilityScoreIncrease: {
                    Intelligence: 1,
                },
                proficiences: {
                    weapon: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
                },
                cantrip: true,
                extraLanguage: true,
            },
            {
                name: "Wood Elf",
                abilityScoreIncrease: {
                    Wisdom: 1,
                },
                proficiences: {
                    weapon: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
                },
                traits: ["Fleet of Foot", "Mask of the Wild"],
            },
            {
                name: "Dark Elf",
                abilityScoreIncrease: {
                    Charisma: 1,
                },
                proficiences: {
                    weapon: ["Rapier", "Shortsword", "Crossbow"],
                },
                traits: ["Superior Dark", "Sunlight Sensitivity", "Drow Magic"],
            }
        ],
    },
    {
        name: "Halfling",
        abilityScoreIncrease: {
            Dexterity: 2,
        },
        speed: 25,
        traits: ["Lucky", "Brave", "Halfling Nimbleness"],
        languages: ["Common", "Halfling"],
        subRaces: [
            {
                name: "Lightfoot Halfling",
                abilityScoreIncrease: {
                    Charisma: 1,
                },
                traits: ["Naturally Stealthy"],
            },
            {
                name: "Stout Halfling",
                abilityScoreIncrease: {
                    Constitution: 1,
                },
                traits: ["Stout Resilience"],
            }
        ],
    },
    {
        name: "Human",
        abilityScoreIncrease: {
            Strength: 1,
            Dexterity: 1,
            Constitution: 1,
            Intelligence: 1,
            Wisdom: 1,
            Charisma: 1,
        },
        speed: 30,
        languages: ["Common"],
        chooseLanguage: true,
    },
    {
        name: "Dragonborn",
        abilityScoreIncrease: {
            Strength: 2,
            Charisma: 1,
        },
        speed: 30,
        traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
        languages: ["Common", "Draconic"],
        subRaces: [
            {
                name: "Black",
                type: "Acid",
            },
            {
                name: "Blue",
                type: "Lightning",
            },
            {
                name: "Brass",
                type: "Fire",
            },
            {
                name: "Bronze",
                type: "Lightning",
            },
            {
                name: "Copper",
                type: "Acid",
            },
            {
                name: "Gold",
                type: "Fire",
            },
            {
                name: "Green",
                type: "Poison",
            },
            {
                name: "Red",
                type: "Fire",
            },
            {
                name: "Silver",
                type: "Cold",
            },
            {
                name: "White",
                type: "Cold",
            },
        ]
    },
    {
        name: "Gnome",
        abilityScoreIncrease: {
            Intelligence: 2,
        },
        speed: 25,
        traits: ["Darkvision", "Gnome Cunning"],
        languages: ["Common", "Gnomish"],
        subRaces: [
            {
                name: "Forest Gnome",
                abilityScoreIncrease: {
                    Dexterity: 1,
                },
                traits: ["Natural Illusionist", "Speak with Small Beasts"],
            },
            {
                name: "Rock Gnome",
                abilityScoreIncrease: {
                    Constitution: 1,
                },
                traits: ["Artificer's Lore", "Tinker"],
            }
        ],
    },
    {
        name: "Half-Elf",
        abilityScoreIncrease: {
            Charisma: 2,
        },
        speed: 30,
        traits: ["Darkvision", "Fey Ancestry", "Skill Versatility"],
        languages: ["Common", "Elvish"],
        chooseLanguage: true,
    },
    {
        name: "Half-Orc",
        abilityScoreIncrease: {
            Strength: 2,
            Constitution: 1,
        },
        speed: 30,
        traits: ["Darkvision", "Menacing", "Relentless Endurance", "Savage Attacks"],
        languages: ["Common", "Orc"],
    },
    {
        name: "Tiefling",
        abilityScoreIncrease: {
            Intelligence: 1,
            Charisma: 2,
        },
        speed: 30,
        traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
        languages: ["Common", "Infernal"],
    }
]

export default Races