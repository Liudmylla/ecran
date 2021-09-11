import React, { createContext, useCallback, useContext, useState } from 'react'
import { useMaintenanceTdbContext } from './ContextMaintenance'

const MaintenanceTdbContextExternalTriggers = createContext({})
const useMaintenanceTdbContextExternalTriggers = () => useContext(MaintenanceTdbContextExternalTriggers)

function UseMaintenanceTdbContextExternalTriggersProvider(props) {

    const[externalPopinIsCalled,setExternalPopinIsCalled] = useState(false)
    const {setLstSignalementUpToDate} = useMaintenanceTdbContext()


    // SIGNALEMENT : consultation par POPIN JSP
    const signalementConsult = useCallback((signalementDatas) => {
        // callback
        const callBackOnPopinClosing = (reload,idElement) => {
           
            setExternalPopinIsCalled(false)
            if(reload){
                 // demande au context de mettre à jour la liste des signalements
                setLstSignalementUpToDate(false)
            }
        }
        setExternalPopinIsCalled(true)

        // Appel externe
        window.appelFromReactTdbModule(signalementDatas.ID,'SIGNALEMENT','CONSULT',callBackOnPopinClosing)

    },[setLstSignalementUpToDate])


    // INTERVENTION : création par POPIN JSP
    const interventionCreate = useCallback((signalementDatas) => {
      // callback
      const callBackOnPopinClosing = (reload,idElement) => {
         
          console.log(`After consult ${idElement} reload=${reload}`)
          setExternalPopinIsCalled(false)
          if(reload){
               // demande au context de mettre à jour la liste des signalements
              setLstSignalementUpToDate(false)
          }    
      }
      setExternalPopinIsCalled(true)
     
      // Appel externe
      window.appelFromReactTdbModule(signalementDatas.ID,'INTERVENTION','CREATE',callBackOnPopinClosing)

  },[setLstSignalementUpToDate])

// INTERVENTION : consultation par POPIN JSP
const interventionConsult = useCallback((interventionDatas) => {
    // callback
    const callBackOnPopinClosing = (reload,idElement) => {
       
        setExternalPopinIsCalled(false)
        if(reload){
             // demande au context de mettre à jour la liste des interventions
            setLstSignalementUpToDate(false)
        }
    }
    setExternalPopinIsCalled(true)

    // Appel externe
    window.appelFromReactTdbModule(interventionDatas.ID,'INTERVENTION','CONSULT',callBackOnPopinClosing)

},[setLstSignalementUpToDate])


  return <MaintenanceTdbContextExternalTriggers.Provider value={{
    signalementConsult,
    interventionCreate,
    interventionConsult,
    externalPopinIsCalled,
    setExternalPopinIsCalled
  }} {...props} />
}

export { UseMaintenanceTdbContextExternalTriggersProvider, useMaintenanceTdbContextExternalTriggers }
