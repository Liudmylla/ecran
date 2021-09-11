import React, { useState } from 'react'
import dossierJson from '../../../../mock/json/maintenance/fiche/mock-dossier.json'
import Signalement from './Signalement'

const Signalements = () => {
  const initialState = dossierJson.listeSignalement
  const [listeSignalement, setListeSignalement] = useState(initialState)
  const handleSelect = (id) => {
    setListeSignalement(
      listeSignalement.filter((signalement) => signalement.id === id),
    )
  }
  const handleReset = () => {
    setListeSignalement(initialState)
  }

  return (
    <>
      <ul>
        {listeSignalement.map((signalement) => (
          <Signalement 
         onSelect= {handleSelect}
         onReset = {handleReset}
         signalement ={signalement}
          />
        ))}
      </ul>
    </>
  )
}

export default Signalements
