import './Dice.css';
import {nanoid} from 'nanoid';

export default function Dice (props) {

  let faceClass = `dice-${props.value}`
  
  let style = {
    backgroundColor: props.locked ? "dodgerblue" : "tomato",
    color: "white"
  }
  
  let dotStyle = {
    backgroundColor: "white"
  }

  let dots = []
  for (let i = props.value; i > 0; i--) {
    dots.push(<span style={dotStyle} className="dice-dot"></span>)
  }

  return(
    <div
      key={props.keyCode}
      id={props.id}
      className={`dice ${faceClass}`}
      style={style}
      onClick={props.toggleLock}
    >
      {dots}
    </div>
  )
}