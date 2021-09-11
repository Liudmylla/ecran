import React from 'react'
import dossierJson from '../../../../mock/json/maintenance/fiche/mock-dossier.json'
import Signalement from '../signalement/Signalement'

const Interventions = () => {
const listeIntervention =[]
    dossierJson.listeSignalement.forEach(signalement => {
        signalement.listeIntervention.forEach(intervention=>{
            listeIntervention.push(intervention)
        })
    });
  return (
    <>
      <ul>
        {listeIntervention.map((intervention) => (
          <li>{intervention.id}</li>
        ))}
      </ul>
    </>
  )
}

export default Interventions
