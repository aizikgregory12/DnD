import React from "react"
import "../styles/AddPlayerForm.css"
import Classes from "../data/Classes"

function AddPlayer({ onAddPlayer, characters, Races }) {

    //Initial state for the form
    const [formData, setFormData] = React.useState(
        {
            name: "",
            level: 1,
            class: "Barbarian",
            race: "Dwarf",
            subRace: "Hill Dwarf",
            size: "Small",
            age: 0,
            height: 0,
            weight: 0,
            stats: {
                Strength: 0,
                Dexterity: 0,
                Constitution: 0,
                Intelligence: 0,
                Wisdom: 0,
                Charisma: 0,
            },
            languages: ["Common", "Dwarvish"],
            chosenLanguage: "Common",
            Inspiration: false,
            setStat: false,
        }
    )

    const languages = ["Common", "Dwarvish", "Elvish", "Giant", "Gnomish", "Goblin", "Halfling", "Orc", "Abyssal", "Celestial", "Draconic", "Deep Speech", "Infernal", "Primordial", "Sylvan", "Undercommon"]
    const characterClass = Classes.find((characterClass) => characterClass.name === formData.class)
    const race = Races.find((race) => race.name === formData.race)
    const [selectedSkills, setSelectedSkills] = React.useState([]);
    const [skillCheckedState, setSkillCheckedState] = React.useState({});

    const initializeSkillCheckedState = (characterClass) => {
        const initialSkillCheckedState = {}
        characterClass.skills.forEach((skill) => {
            initialSkillCheckedState[skill] = false
        });
        setSkillCheckedState(initialSkillCheckedState);
    };

    React.useEffect(() => {
        initializeSkillCheckedState(characterClass)
    }, [characterClass])

    function handleSubmit(event) {
        event.preventDefault()
        let characterExists = false

        if (race.chosenLanguage) {
            setFormData((prevData) => ({
                ...prevData,
                languages: [...prevData.languages, prevData.chosenLanguage],
            }));
        }

        formData.trainedSkills = selectedSkills

        console.log(formData)
        for (let i = 0; i < characters.length; i++) {
            if (characters[i].name === formData.name) {
                characterExists = true
                break
            }
        }

        if (characters.length === 0) {
            onAddPlayer(formData)
            resetForm()
            return
        } else if (characterExists) {
            alert("Character already exists")
        } else {
            onAddPlayer(formData)
            resetForm()
        }
    }

    function addPlayer(event) {
        const { name, value } = event.target;
        const race = Races.find((race) => race.name === value);

        if (name === "race") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                languages: race.languages
            }));
            if (race.subRaces) {
                setFormData((prevData) => ({
                    ...prevData,
                    subRace: race.subRaces[0].name
                }));
            }
        } if (name === "class") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
            setSelectedSkills([])
        } else if (name === "chosenLanguage") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
            addLanguage();
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    function addLanguage() {
        setFormData((prevData) => ({
            ...prevData,
            languages: race.languages,
        }));
        setFormData((prevData) => ({
            ...prevData,
            languages: [...prevData.languages, prevData.chosenLanguage],
        }));
    }

    // Function to reset the form
    function resetForm() {
        setFormData({
            name: "",
            level: 1,
            class: "Barbarian",
            race: "Dwarf",
            subRace: "Hill Dwarf",
            size: "Small",
            age: 0,
            height: 0,
            weight: 0,
            stats: {
                Strength: 0,
                Dexterity: 0,
                Constitution: 0,
                Intelligence: 0,
                Wisdom: 0,
                Charisma: 0,
            },
            languages: ["Common", "Dwarvish"],
            chosenLanguage: "Common",
            Inspiration: false,
            setStat: false,
        })
        initializeSkillCheckedState(characterClass)
    }

    const handleSkillChange = (event) => {
        const skill = event.target.value;
        const updatedSkills = [...selectedSkills];

        if (event.target.checked) {
            updatedSkills.push(skill);
        } else {
            const index = updatedSkills.indexOf(skill);
            if (index !== -1) {
                updatedSkills.splice(index, 1);
            }
        }

        setSelectedSkills(updatedSkills);

        // Update the skillCheckedState
        setSkillCheckedState((prevSkillCheckedState) => ({
            ...prevSkillCheckedState,
            [skill]: event.target.checked,
        }));
    }

    function handleCheck(event) {
        const { name, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    }

    function inform() {
        alert("Selecting this will use the set value provided for all stats that allow it. For example, a Barbarian will use given value of 7 instead of 1d12 for calculating HP yessir.")
    }

    // Return the form
    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <div className="basicInfoForm">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        placeholder="Character Name"
                        onChange={addPlayer}
                        name="name"
                        required={true}
                        value={formData.name}
                        maxLength={30}
                    />
                    <label htmlFor="level">Level: </label>
                    <input
                        type="number"
                        placeholder="Level"
                        onChange={addPlayer}
                        name="level"
                        required={true}
                        value={formData.level}
                    />
                    <label htmlFor="class">Class: </label>
                    <select
                        name="class"
                        onChange={addPlayer}
                        required={true}
                        value={formData.class}
                    >
                        {Classes.map((characterClass, index) => (
                            <option key={index} value={characterClass.name}>
                                {characterClass.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="race">Race: </label>
                    <select
                        name="race"
                        onChange={addPlayer}
                        required={true}
                        value={formData.race}
                    >
                        {Races.map((race, index) => (
                            <option key={index} value={race.name}>
                                {race.name}
                            </option>
                        ))}
                    </select>
                    {race.subRaces && <div id="race">
                        <label htmlFor="subRace">Sub Race: </label>
                        <select
                            name="subRace"
                            onChange={addPlayer}
                            required={true}
                            value={formData.subRace}
                        >
                            {race.subRaces.map((subRace, index) => (
                                <option key={index} value={subRace.name}>
                                    {subRace.name}
                                </option>
                            ))}
                        </select>
                    </div>}
                </div>
                <div className="characteristicsForm">
                    <label htmlFor="size">Size: </label>
                    <select
                        name="size"
                        onChange={addPlayer}
                        value={formData.size}
                    >
                        <option value="0">Small</option>
                        <option value="1">Medium</option>
                        <option value="2">Large</option>
                    </select>
                    <label htmlFor="age">Age: </label>
                    <input
                        type="number"
                        step=".1"
                        placeholder="Age"
                        onChange={addPlayer}
                        name="age"
                        value={formData.age}
                    />
                    <label htmlFor="height">Height: </label>
                    <input
                        type="number"
                        step=".1"
                        placeholder="Height"
                        onChange={addPlayer}
                        name="height"
                        value={formData.height}
                    />
                    <label htmlFor="weight">Weight: </label>
                    <input
                        type="number"
                        step=".1"
                        placeholder="Weight"
                        onChange={addPlayer}
                        name="weight"
                        value={formData.weight}
                    />
                </div>
                <div className="statsForm">
                    {Object.keys(formData.stats).map((stat, index) => (
                        <div key={index}>
                            <label htmlFor={stat}>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</label>
                            <input
                                type="number"
                                name={stat}
                                value={formData.stats[stat]}
                                onChange={(e) => {
                                    const { name, value } = e.target
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        stats: {
                                            ...prevData.stats,
                                            [name]: parseFloat(value),
                                        },
                                    }))
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="extraInformation">
                    {race.chooseLanguage &&
                        <div className="formLanguages">
                            <label htmlFor="languages">Additional Language: </label>
                            <select
                                name="chosenLanguage"
                                onChange={addPlayer}
                            >
                                {languages.map((language, index) => (
                                    <option key={index} value={language}>
                                        {language}
                                    </option>
                                ))}
                            </select>
                        </div>}
                    {formData.class === "Fighter" && (
                        <div className="proficiencyChocie">
                            <label htmlFor="proficiencyChoice">Proficiency Choice:</label>
                            <div id="choiceStrength">
                                <input
                                    type="radio"
                                    name="proficiencyChoice"
                                    value="Strength"
                                    onChange={addPlayer}
                                    checked={formData.proficiencyChoice === "Strength"}
                                />
                                <label htmlFor="strengthProficiency">Strength</label>
                            </div>
                            <div id="choiceDexterity">
                                <input
                                    type="radio"
                                    name="proficiencyChoice"
                                    value="Dexterity"
                                    onChange={addPlayer}
                                    checked={formData.proficiencyChoice === "Dexterity"}
                                />
                                <label htmlFor="dexterityProficiency">Dexterity</label>
                            </div>
                        </div>
                    )}
                </div>
                <div className="trainedSkills">
                    {characterClass.skills.map((skill, index) => (
                        <div key={index} className="skillSelect">
                            <label htmlFor={skill}>{skill}</label>
                            <input
                                type="checkbox"
                                name={skill}
                                value={skill}
                                onChange={handleSkillChange}
                                disabled={selectedSkills.length >= characterClass.choosableSkills && !selectedSkills.includes(skill)}
                                checked={skillCheckedState[skill]}
                            />
                        </div>
                    ))}
                </div>
                <div className="optionalChoices">
                    <div id="inspiration">
                        <label htmlFor="Inspiration">Playing with Inspiration?</label>
                        <input
                            type="checkbox"
                            name="Inspiration"
                            checked={formData.Inspiration}
                            onChange={handleCheck}
                        />
                    </div>
                    <div id="setStat">
                        <label htmlFor="setStat" onClick={inform}>Set Stats? ⓘ </label>
                        <input
                            type="checkbox"
                            name="setStat"
                            checked={formData.setStat}
                            onChange={handleCheck}
                            defaultChecked={false}
                        />
                    </div>
                </div>
                <button>Add Player</button>
            </form >
            {
                characters.map((characters, index) => (
                    <li key={index}>{characters.name} </li>
                ))
            }
        </div >
    )
}


export default AddPlayer