import React, { useState } from "react";
import Interventions from "../intervention/Interventions";
import dossierJson from "../../../../mock/json/maintenance/fiche/mock-dossier.json";
import Bookmark from "./Bookmark";
const Signalement = ({ onToggleActive, dateCreation, id, ...signalement }) => {
  const liste = [];
  if (signalement.isActive) {
    signalement.listeIntervention.forEach((intervention) => {
      liste.push(intervention);
    });
  }

  return (
    <>
      <li>
        Signalement id : {id}
        <ul>
          {liste.map((intervention) => (
            <li>Intervention id {intervention.id}</li>
          ))}
        </ul>
        <Bookmark
          id={id}
          isActive={signalement.isActive}
          onToggleActive={onToggleActive}
        />
      </li>
    </>
  );
};
export default Signalement;
