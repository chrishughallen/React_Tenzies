import Dice from './Dice.js';
import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti'

import './App.css';

function App() {

  const generateDiceValue = () => Math.floor(Math.random() * 6 + 1)

  function allNewDice() {
    let newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: generateDiceValue(),
        locked: false
      })
    }
    return newDice
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)

  const rollDice = (e) => {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      setRolls(0)
    } else {
      setDice((prev) => prev.map((dice) => {
        return dice.locked ? dice : {...dice, key: nanoid(), value: generateDiceValue()}
      }))
      setRolls(rolls + 1)
    }
  }

  const checkForTenzies = () => {
    if (dice.every((die) => die.locked) && dice.every((die) => die.value === dice[0].value)) {
      setTenzies(true)
    }
  }

  useEffect(() => {
    checkForTenzies()

  }, [dice])

  const lockDie = (id) => {
     setDice((prev) => prev.map((dice) => {
        return dice.id === id ? {...dice, locked: !dice.locked} : dice
      }))
  }

  const diceElements = dice.map((dice) => {
    return <Dice
      tenzies={tenzies}
      key={dice.id}
      keyCode={dice.id}
      toggleLock={() => lockDie(dice.id)}
      locked={dice.locked}
      value={dice.value}
    />
  })

  const buttonStyle = {
    backgroundColor: tenzies ? "dodgerblue" : "tomato",
    color: "white",
    border: tenzies ? "2px solid dodgerblue" : "2px solid tomato"
  }

  return (
    <div className="App">
      {tenzies && <Confetti/>}
      <div className="content">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at it's current value between rolls</p>
        <div className="game">
          {diceElements}
        </div>
        <button style={buttonStyle} onClick={rollDice}>{tenzies ? "Reset Game" : "Roll Dice"}</button>
        <p>Rolls: {rolls}</p>
      </div>
    </div>
  );
}

export default App;
