import React from "react"
import NavBar from '../components/NavBar'
import AddPlayer from '../components/AddPlayer'
import Characters from "../data/Characters"
import PlayerDisplay from "../components/PlayerDisplay"
import Races from "../data/Races"
import '../styles/App.css'

function App() {

  const [display, setDisplay] = React.useState(
    {
      playerForm: true,
      playerDisplay: false
    })

  const [characters, setCharacters] = React.useState(() => {
    try {
      const savedCharacters = localStorage.getItem('characters');
      return savedCharacters ? JSON.parse(savedCharacters) : Characters;
    } catch (error) {
      return Characters;
    }
  });
  const [character, setCharacter] = React.useState(() => {
    return characters.length > 0 ? characters[0] : null;
  });

  function changeDisplay(event) {
    if (characters.length === 0 && event.target.value === 'playerDisplay') {
      alert('You must add a player first!')
      setDisplay((prevDisplay) => ({
        ...!prevDisplay,
        playerForm: true
      }))
    } else {
      setDisplay((prevDisplay) => ({
        ...!prevDisplay,
        [event.target.value]: true
      }))
    }
  }

  function addPlayer(newPlayer) {
    if (characters.length === 0) {
      setCharacter(newPlayer)
    }
    addAbilityScores(newPlayer)
    const updatedCharacters = [...characters, newPlayer];
    setCharacters(updatedCharacters);
    saveCharacterData(updatedCharacters);
  }

  function selectPlayer(event) {
    const character = characters.find((character) => character.name === event.target.value)
    setCharacter(character)
  }

  function addAbilityScores(character) {
    const race = Races.find((race) => race.name === character.race)
    for (let ability in race.abilityScoreIncrease) {
      for (let stat in character.stats) {
        if (stat === ability) {
          character.stats[stat] += race.abilityScoreIncrease[ability]
        }
      }
    }
    if (race.subRaces) {
      const subRace = race.subRaces.find((subRace) => subRace.name === character.subRace)
      for (let ability in subRace.abilityScoreIncrease) {
        for (let stat in character.stats) {
          if (stat === ability) {
            character.stats[stat] += subRace.abilityScoreIncrease[ability]
          }
        }
      }
    }
  }

  React.useEffect(() => {
    saveCharacterData(characters);
  }, [characters]);

  const clearLocalStorage = () => {
    localStorage.clear();
    setCharacters([]);
    saveCharacterData([]);
    setDisplay((prevDisplay) => ({
      ...!prevDisplay,
      playerForm: true
    }))
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar changeDisplay={changeDisplay} />
        <button onClick={clearLocalStorage}>
          Clear Local Storage
        </button>
      </header>
      <div>
        {display.playerForm === true && <AddPlayer onAddPlayer={addPlayer} characters={characters} Races={Races} />}
        {display.playerDisplay === true && <PlayerDisplay characters={characters} character={character} selectPlayer={selectPlayer} Races={Races} />}
      </div>
    </div>
  );
}

export default App;

function saveCharacterData(characters) {
  localStorage.setItem('characters', JSON.stringify(characters));
}