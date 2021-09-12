import React, { useState } from "react";
import dossierJson from "../../../../mock/json/maintenance/fiche/mock-dossier.json";
import Signalement from "./Signalement";

const Signalements = () => {
  const initialState = dossierJson.listeSignalement;
  const [listeSignalement, setListeSignalement] = useState(initialState);

  const handleToggleActive = (id) => {
    const newListeSignalement = [...listeSignalement];
    const index = newListeSignalement.findIndex((item) => item.id === id);
    newListeSignalement[index].isActive = !newListeSignalement[index].isActive;
    setListeSignalement(newListeSignalement);
  };

  return (
    <>
      <ul>
        {listeSignalement.map((signalement) => (
          <Signalement onToggleActive={handleToggleActive} {...signalement} />
        ))}
      </ul>
    </>
  );
};

export default Signalements;
