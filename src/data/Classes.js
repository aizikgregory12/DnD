const Classes = [
    {
        name: "Barbarian",
        hitDie: 12,
        setHP: 7,
        primaryAbility: ["Strength"],
        skills: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"],
        choosableSkills: 2,
        proficiencies: {
            armor: ["Light Armor", "Medium Armor", "Shields"],
            weapons: ["Simple Weapons", "Martial Weapons"],
            savingThrows: ["Strength", "Constitution"],
        }
    },
    {
        name: "Bard",
        hitDie: 8,
        setHP: 5,
        primaryAbility: ["Charisma"],
        skills: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"],
        choosableSkills: 3,
        proficiencies: {
            armor: ["Light Armor"],
            weapons: ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
            savingThrows: ["Dexterity", "Charisma"],
        }
    },
    {
        name: "Cleric",
        hitDie: 8,
        setHP: 5,
        primaryAbility: ["Wisdom"],
        skills: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
        choosableSkills: 2,
        proficiencies: {
            armor: ["Light Armor", "Medium Armor", "Shields"],
            weapons: ["Simple Weapons"],
            savingThrows: ["Wisdom", "Charisma"],
        }
    },
    {
        name: "Druid",
        hitDie: 8,
        setHP: 5,
        primaryAbility: ["Wisdom"],
        skills: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"],
        choosableSkills: 2,
        proficiencies: {
            armor: ["Light Armor", "Medium Armor Non-Metal", "Shields Non-Metal"],
            weapons: ["Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars", "Sickles", "Slings", "Spears"],
            savingThrows: ["Intelligence", "Wisdom"],
        }
    },
    {
        name: "Fighter",
        hitDie: 10,
        setHP: 6,
        primaryAbility: [""],
        skills: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],
        choosableSkills: 2,
        proficiencies: {
            armor: ["Armor", "Shields"],
            weapons: ["Simple Weapons", "Martial Weapons"],
            savingThrows: ["Strength", "Constitution"],
        }
    },
    {
        name: "Monk",
        hitDie: 8,
        setHP: 5,
        primaryAbility: ["Dexterity", "Wisdom",],
        skills: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"],
        choosableSkills: 2,
        proficiencies: {
            weapons: ["Simple Weapons", "Shortswords"],
            savingThrows: ["Strength", "Dexterity"],
        }
    },
    {
        name: "Paladin",
        hitDie: 10,
        setHP: 6,
        primaryAbility: ["Strength", "Charisma"],
        skills: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"],
        choosableSkills: 2,
        proficiencies: {
            armor: ["Armor", "Shields"],
            weapons: ["Simple Weapons", "Martial Weapons"],
            savingThrows: ["Wisdom", "Charisma"],
        }
    },
    {
        name: "Ranger",
        hitDie: 10,
        setHP: 6,
        primaryAbility: ["Dexterity", "Wisdom"],
        skills: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"],
        choosableSkills: 3,
        proficiencies: {
            armor: ["Light Armor", "Medium Armor", "Shields"],
            weapons: ["Simple Weapons", "Martial Weapons"],
            savingThrows: ["Strength", "Dexterity"],
        }
    },
    {
        name: "Rogue",
        hitDie: 8,
        setHP: 5,
        primaryAbility: ["Dexterity"],
        skills: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"],
        choosableSkills: 4,
        proficiencies: {
            armor: ["Light Armor"],
            weapons: ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
            savingThrows: ["Dexterity", "Intelligence"],
        }
    },
    {
        name: "Sorcerer",
        hitDie: 6,
        setHP: 4,
        primaryAbility: ["Charisma"],
        skills: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"],
        choosableSkills: 2,
        proficiencies: {
            weapons: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
            savingThrows: ["Constitution", "Charisma"],
        }
    },
    {
        name: "Warlock",
        hitDie: 8,
        setHP: 5,
        primaryAbility: ["Charisma"],
        skills: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"],
        choosableSkills: 2,
        proficiencies: {
            armor: ["Light Armor"],
            weapons: ["Simple Weapons"],
            savingThrows: ["Wisdom", "Charisma"],
        }
    },
    {
        name: "Wizard",
        hitDie: 6,
        setHP: 4,
        primaryAbility: ["Intelligence"],
        skills: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"],
        choosableSkills: 2,
        proficiencies: {
            weapons: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
            savingThrows: ["Intelligence", "Wisdom"],
        }
    }
]

export default Classes