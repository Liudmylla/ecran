import React from 'react'
import Interventions from '../intervention/Interventions'
const Signalement = ({ signalement, onSelect, onReset }) => {
    console.log(signalement)
  return (
    <>
      <li>
        {signalement.dateCreation}
        <button
          className="btn-outline-primary"
          onClick={() => onSelect(signalement.id)}
        >
          Select
        </button>
        <button className="btn-outline-success" onClick={onReset}>
          Reset
        </button>
      </li>
    </>
  )
}
export default Signalement
