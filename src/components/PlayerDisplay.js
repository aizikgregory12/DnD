import React from 'react'
import Identifier from '../Mini-Components/Identifier'
import StatDisplay from '../Mini-Components/StatDisplay'
import Skills from '../data/Skills'
import Classes from '../data/Classes'
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

    const getInitialOtherHp = (char) => {
        const storedCurrentHp = localStorage.getItem(`currentHp_${char.name}`);
        const storedTemporaryHp = localStorage.getItem(`temporaryHp_${char.name}`);

        const initialOtherHp = {
            currentHp: storedCurrentHp ? storedCurrentHp : getInitialHp(char),
            temporaryHp: storedTemporaryHp ? storedTemporaryHp : 0,
        };

        return initialOtherHp;
    };
    const [otherHp, setOtherHp] = React.useState(getInitialOtherHp(character))

    React.useEffect(() => {
        localStorage.setItem(`currentHp_${character.name}`, otherHp.currentHp.toString());
        localStorage.setItem(`temporaryHp_${character.name}`, otherHp.temporaryHp.toString());
    }, [otherHp, character]);


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

    function changeOtherHp(event) {
        const { name, value } = event.target;
        if (value === "▲") {
            setOtherHp((prevValue) => {
                return {
                    ...prevValue,
                    [name]: parseInt(prevValue[name]) + 1,
                };
            })
        } else {
            setOtherHp((prevValue) => {
                return {
                    ...prevValue,
                    [name]: parseInt(prevValue[name]) - 1,
                };
            })
        }
    }

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
                        <Identifier label={skill.name} value={character.trainedSkills.includes(skill.name) ? calculateModifier(skill.ability) + calcProfBonus() : calculateModifier(skill.ability)} id="skill" numberID="number" />
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
                                Current hit points: {otherHp.currentHp}
                                <div className='inspirationButtons'>
                                    <button name="currentHp" value="▲" onClick={changeOtherHp}>
                                        ▲
                                    </button>
                                    <button name="currentHp" onClick={changeOtherHp}>
                                        ▼
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='temporaryHP'>
                            Temporary hit points: {otherHp.temporaryHp}
                            <div className='temporaryHpButtons'>
                                <button name="temporaryHp" value="▲" onClick={changeOtherHp}>
                                    ▲
                                </button>
                                <button name="temporaryHp" onClick={changeOtherHp}>
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
            </div>
        </div >
    )
}