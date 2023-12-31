import React from 'react'
import Identifier from '../Mini-Components/Identifier'
import StatDisplay from '../Mini-Components/StatDisplay'
import Skills from '../data/Skills'
import Classes from '../data/Classes'
import Items from '../data/Items'
import '../styles/PlayerDisplay.css'

export default function PlayerDisplay({ characters, character, selectPlayer, Races }) {
    const race = Races.find((race) => race.name === character.race)
    const characterClass = Classes.find((characterClass) => characterClass.name === character.class)
    const [inspiration, setInspiration] = React.useState(0)
    const [initiative, setInitiative] = React.useState(0)

    const getInitialHp = (char) => {
        const storedHp = localStorage.getItem(`hp_${char.name}`);
        if (storedHp) {
            return storedHp;
        } else {
            if (char.level === 1) {
                const maxHp = characterClass.hitDie + calculateModifier("Constitution")
                localStorage.setItem(`hp_${char.name}`, maxHp);
                return maxHp;
            } else {
                const maxHp = character.setStat ? characterClass.setHP + (calculateModifier("Constitution") * char.level) : Math.floor((Math.random() * characterClass.hitDie) + 1) + (calculateModifier("Constitution") * char.level)
                localStorage.setItem(`hp_${char.name}`, maxHp);
                return maxHp;
            }
        }
    };


    const [hitPoints, setHitPoints] = React.useState(() => {
        const storedCurrentHp = localStorage.getItem(`currentHp_${character.name}`);
        const storedTemporaryHp = localStorage.getItem(`temporaryHp_${character.name}`);

        return {
            currentHp: storedCurrentHp ? parseInt(storedCurrentHp) : getInitialHp(character),
            temporaryHp: storedTemporaryHp ? parseInt(storedTemporaryHp) : 0,
        };
    });

    React.useEffect(() => {
        const storedCurrentHp = localStorage.getItem(`currentHp_${character.name}`);
        const storedTemporaryHp = localStorage.getItem(`temporaryHp_${character.name}`);

        setHitPoints({
            currentHp: storedCurrentHp ? parseInt(storedCurrentHp) : getInitialHp(character),
            temporaryHp: storedTemporaryHp ? parseInt(storedTemporaryHp) : 0,
        });
    }, [character]);

    React.useEffect(() => {
        localStorage.setItem(`currentHp_${character.name}`, hitPoints.currentHp);
        localStorage.setItem(`temporaryHp_${character.name}`, hitPoints.temporaryHp);
    }, [hitPoints, character]);

    const handleUpdateHitPoints = (type, value) => {
        setHitPoints((prevHitPoints) => ({
            ...prevHitPoints,
            [type]: parseInt(prevHitPoints[type]) + value,
        }));
    };


    function updateInspiration(event) {
        if (event.target.value === "▲") {
            setInspiration(inspiration + 1)
        } else {
            setInspiration(inspiration - 1)
        }
    }

    function calculateModifier(stat) {
        return Math.floor((character.stats[stat] / 2) - 5)
    }

    function calcProfBonus() {
        if (character.level < 5) {
            return 2
        } else if (character.level < 9) {
            return 3
        } else if (character.level < 13) {
            return 4
        } else if (character.level < 17) {
            return 5
        } else {
            return 6
        }
    }

    function rollForInitiative() {
        setInitiative((Math.floor(Math.random() * 20) + 1) + calculateModifier("Dexterity"))
    }

    function skillCheck(event) {
        console.log(event)
        if (character.trainedSkills.includes(event.target.name)) {
            console.log("trained")
        }
    }



    const [selectedItemToAdd, setSelectedItemToAdd] = React.useState('');
    const [selectedItemToRemove, setSelectedItemToRemove] = React.useState('');
    const [inventory, setInventory] = React.useState([]);
    const [newItem, setNewItem] = React.useState('');

    const saveInventoryToLocalStorage = (inventory) => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    };

    const addItemToInventory = () => {
        if (selectedItemToAdd) {
            const updatedInventory = [...inventory, selectedItemToAdd];
            setInventory(updatedInventory);
            saveInventoryToLocalStorage(updatedInventory);
            setSelectedItemToAdd('')
        }
    };

    const loadInventoryFromLocalStorage = () => {
        const storedInventory = localStorage.getItem('inventory');
        return storedInventory ? JSON.parse(storedInventory) : [];
    };

    React.useEffect(() => {
        const loadedInventory = loadInventoryFromLocalStorage();
        setInventory(loadedInventory);
    }, []);

    const removeItemFromInventory = () => {
        if (selectedItemToRemove !== '') {
            const updatedInventory = inventory.filter((item, index) => index !== parseInt(selectedItemToRemove));
            setInventory(updatedInventory);
            saveInventoryToLocalStorage(updatedInventory);
            setSelectedItemToRemove('')
        }
    };

    const addNewItemToInventory = () => {
        if (newItem) {
            const updatedInventory = [...inventory, { name: newItem }];
            setInventory(updatedInventory);
            saveInventoryToLocalStorage(updatedInventory);
            setNewItem(''); // Clear the input field after adding the item
        }
    };

    return (
        <div className="player-container">
            <div className="select-container">
                <select name="char" onChange={selectPlayer} value={character.name}>
                    {characters.map((character, index) => (
                        <option key={index}>{character.name}</option>
                    ))}
                </select>
            </div>
            <div className='playerIdentification'>
                <Identifier label='Name:' value={character.name} />
                <Identifier label='Level:' value={character.level} id="number" />
                <Identifier label='Class:' value={character.class} />
                <Identifier label='Race: ' value={character.race} />
                {race.subRaces && <Identifier label='Subrace: ' value={character.subRace} />}

            </div>
            <div className='characteristics'>
                <Identifier label="Size: " value={character.size} />
                <Identifier label="Height: " value={character.height} id="number" />
                <Identifier label="Weight: " value={character.weight} id="number" />
                {character.class === "Fighter" ? <Identifier label="Primary Abilities: " value={character.proficiencyChoice} /> : <Identifier label="Primary Abilities: " value={characterClass.primaryAbility.join(", ")} />}
                {character.Inspiration && <div className="inspiration">
                    <Identifier label="Inspiration: " value={inspiration} />
                    <div className='inspirationButtons'>
                        <button value="▲" onClick={updateInspiration}>
                            ▲
                        </button>
                        <button onClick={updateInspiration}>
                            ▼
                        </button>
                    </div>
                </div>}
            </div>
            <div className="secondLayer">
                <div className='stats'>
                    {Object.entries(character.stats).map(([statName, statValue]) => (
                        <StatDisplay
                            key={statName}
                            label={statName}
                            value={statValue}
                            modifier={calculateModifier(statName)}
                        />
                    ))}
                </div>
                <div className="skills">
                    {Skills.map((skill, index) =>
                        <Identifier label={skill.name} value={character.trainedSkills.includes(skill.name) ? <button name={skill.name} id='insideButton' onClick={skillCheck}>{calculateModifier(skill.ability) + calcProfBonus()}</button> : <button name={skill.name} id='insideButton' onClick={skillCheck}>{calculateModifier(skill.ability)}</button>} id="skill" numberID="number" />
                    )}
                </div>
                <div className='otherStuff'>
                    <div className="topRow">
                        <Identifier label="AC" value={10 + calculateModifier("Dexterity")} id="topRowNumber" />
                        <Identifier label={"Initiative"} value={<button onClick={rollForInitiative}>{initiative}</button>} id="topRowNumber" />
                        <Identifier label="Speed" value={race.speed} id="topRowNumber" />
                    </div>
                    <div className="middleRow">
                        <div className='hp'>
                            <div id="maxHitPoints">
                                Max hit points: <u>{getInitialHp(character)}</u>
                            </div>
                            <div id='currentHp'>
                                Current hit points: {hitPoints.currentHp}
                                <div className='inspirationButtons'>
                                    <button name="currentHp" value="▲" onClick={() => handleUpdateHitPoints('currentHp', 1)}>
                                        ▲
                                    </button>
                                    <button name="currentHp" onClick={() => handleUpdateHitPoints('currentHp', -1)}>
                                        ▼
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='temporaryHP'>
                            Temporary hit points: {hitPoints.temporaryHp}
                            <div className='temporaryHpButtons'>
                                <button name="temporaryHp" value="▲" onClick={() => handleUpdateHitPoints('temporaryHp', 1)}>
                                    ▲
                                </button>
                                <button name="temporaryHp" onClick={() => handleUpdateHitPoints('temporaryHp', -1)}>
                                    ▼
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bottomRow">
                        <div className='hitDie'>
                            Hit die: 1d{characterClass.hitDie}
                        </div>
                        <div className='deathSaves'>
                            <div id='success'>
                                Successes:
                                <div>
                                    <input type="checkbox" />
                                    <input type="checkbox" />
                                    <input type="checkbox" />
                                </div>
                            </div>
                            <div id='fails'>
                                Fails:
                                <div>
                                    <input type="checkbox" />
                                    <input type="checkbox" />
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='savingThrows'>
                        {Object.entries(character.stats).map(([statName, statValue]) => (
                            <Identifier
                                label={statName}
                                value={calculateModifier(statName)}
                                id="skill"
                                numberID="number"
                            />
                        ))}
                        <h2 id="savingThrowsLabel">Saving Throws</h2>
                    </div>
                </div>
                <div className='otherStuff' id="inventoryPanel">
                    <h2 id="inventoryLabel">Inventory</h2>
                    <div className='inventoryButtons'>
                        <div>
                            <label>Add Weapon: </label>
                            <select
                                value={selectedItemToAdd}
                                onChange={(e) => setSelectedItemToAdd(JSON.parse(e.target.value))}
                            >
                                <option value="">
                                    {selectedItemToAdd === "" ? "Select an item" : selectedItemToAdd.name}
                                </option>

                                {Object.keys(Items.Weapons).map((weaponCategory) => (
                                    <optgroup label={Items.Weapons[weaponCategory].name}>
                                        {Object.keys(Items.Weapons[weaponCategory]).map((itemName) => (
                                            itemName === "name" ? null : (
                                                <option key={itemName} value={JSON.stringify(Items.Weapons[weaponCategory][itemName])}>
                                                    {Items.Weapons[weaponCategory][itemName].name}
                                                </option>
                                            )
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            <button onClick={addItemToInventory}>Add</button>
                        </div>

                        <div>
                            <label>Add Armor: </label>
                            <select
                                value={selectedItemToAdd}
                                onChange={(e) => setSelectedItemToAdd(JSON.parse(e.target.value))}
                            >
                                <option value="">
                                    {selectedItemToAdd === "" ? "Select an item" : selectedItemToAdd.name}
                                </option>

                                {Object.keys(Items.Armor).map((armorCategory) => (
                                    <optgroup label={Items.Armor[armorCategory].name}>
                                        {Object.keys(Items.Armor[armorCategory]).map((itemName) => (
                                            itemName === "name" ? null : (
                                                <option key={itemName} value={JSON.stringify(Items.Armor[armorCategory][itemName])}>
                                                    {Items.Armor[armorCategory][itemName].name}
                                                </option>
                                            )
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            <button onClick={addItemToInventory}>Add</button>
                        </div>

                        <div>
                            <label>Add Item: </label>
                            <input
                                type="text"
                                value={newItem}
                                placeholder='Enter item name'
                                maxLength={40}
                                onChange={(e) => setNewItem(e.target.value)}
                            />
                            <button onClick={addNewItemToInventory}>Add</button>
                        </div>

                        <div>
                            <label>Remove Item: </label>
                            <select
                                value={selectedItemToRemove}
                                onChange={(e) => setSelectedItemToRemove(e.target.value)}
                            >
                                <option value="" disabled>
                                    {selectedItemToRemove === "" ? "Select an item to remove" : "Select an item to remove"}
                                </option>
                                {inventory.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <button onClick={removeItemFromInventory}>Remove</button>
                        </div>
                    </div>

                    <div>
                        <ul className='inventoryList'>
                            {inventory.map((item, index) => (
                                <li key={index} id='inventoryItem'>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}