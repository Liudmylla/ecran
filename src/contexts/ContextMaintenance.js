import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getEndPointDeleteDossier, getEndPointDeleteIntervention, getEndPointDeleteSignalement, getEndPointLstDossier, getEndPointLstEtats, getEndPointLstIntervention, getEndPointLstSignalement, getEndPointUpdateDossier, getEndPointUpdateIntervention, getEndPointUpdateSignalement } from '../api/endPoints'
import makeRequest from '../api/makeRequest'
import mockEquipes from '../mock/json/maintenance/tdb/mock-equipes.json'
//import mockEtats from '../mock/json/maintenance/tdb/mock-etats.json'
import mockContratCouches from '../mock/json/maintenance/tdb/mock-contrat-couches.json'
import ContratCoucheMapper from '../components/maintenance/tdb/contrat-couches/ContratCoucheMapper'
import { useContextI18n } from './ContextI18n'
import { notifySuccess, notifyError } from '../components/maintenance/tdb/commons/notification/notification'

const MaintenanceTdbContext = createContext({})
const useMaintenanceTdbContext = () => useContext(MaintenanceTdbContext)

function UseMaintenanceTdbContextProvider(props) {

  const [lstDossier, setLstDossier] = useState()
  const [lstDossierUpToDate, setLstDossierUpToDate] = useState(false)
  const [lastGridDossier, setLastGridDossier] = useState()

  const [lstSignalement, setLstSignalement] = useState()
  const [lstSignalementUpToDate, setLstSignalementUpToDate] = useState(false)
  const [lastGridSignalement, setLastGridSignalement] = useState()

  const [lstIntervention, setLstIntervention] = useState()
  const [lstInterventionUpToDate, setLstInterventionUpToDate] = useState(false)
  const [lastGridIntervention, setLastGridIntervention] = useState()

  const [etats, setEtats] = useState()
  const [etatsUpToDate, setEtatsUpToDate] = useState(false)

  const { i18n } = useContextI18n()

  const urlApi = props.urlApi

  // États ---------------------------------------------
  const resolveEtats = useCallback(async () => {
    
    if (!etatsUpToDate) {
      try {
        const response = await makeRequest(getEndPointLstEtats(urlApi))
        // test erreur
        // const response = await makeRequest(getEndPointLstEtats(urlApi)+'test-erreur') 
        if (!!response?.erreur) throw response.erreur

        setEtats(response?.lstEtats)
        setEtatsUpToDate(true)

        notifySuccess(i18n('maintenance.tdb.context.load.etats.success'))

      } catch (e) {
        notifyError(e)
      }
    }
  }, [etatsUpToDate, i18n, urlApi])

  useEffect(() => {
    resolveEtats()
  }, [resolveEtats])


  // Equipes et members ---------------------------------------------
  const members = mockEquipes.lstMembers
  const getMember = (id) => {
    const member = members.find(m => m.id === id)
    return member
  }
  const setCompoMembers = (e) => {
    const compo = e.compositionIdList.map(id => { return getMember(id) })
    e.composition = compo
    return e
  }
  const equipes = mockEquipes.lstEquipes;
  equipes.map(e => setCompoMembers(e))


  // Contrat-couches ---------------------------------------------
  const lstCC = mockContratCouches.lstContratCouche
  const [lstContratCouches, setLstContratCouches] = useState([])

  const resolveContratCouches = useCallback(() => {
    
    const lstCCMappees = lstCC.map(cc => ContratCoucheMapper(cc))
    setLstContratCouches(lstCCMappees)

  }, [lstCC])

  useEffect(() => {
    resolveContratCouches()
  }, [resolveContratCouches])

  const getContratCouche = (id) => {
    return lstContratCouches.find(cc => cc.id === id)
  }


  // DOSSIERS --------------------------------------------------------

  const resolveLstDossier = useCallback(async () => {
    if (!lstDossierUpToDate) {
      try {
        const response = await makeRequest(getEndPointLstDossier(urlApi))
        if (!!response?.erreur) throw response.erreur

        setLstDossier(response?.lstDossiers)
        setLstDossierUpToDate(true)
        if (!!lastGridDossier?.cancelEditData) {
          lastGridDossier.cancelEditData() //reset des cellules indiquées comme modifiées
        }
        notifySuccess(i18n('maintenance.tdb.context.load.dossiers.success'))
      } catch (e) {
        notifyError(e)
      }
    }
  }, [lstDossierUpToDate, urlApi, lastGridDossier, i18n])

  // DOSSIER BATCH UPDATE 
  const dossierUpdatesBatchRequest = useCallback(async (datas, component) => {

    try {
      const contentPayload = { 'batchContent': datas }
      const response = await makeRequest(getEndPointUpdateDossier(urlApi), 'POST', contentPayload)
      if (!!response?.erreur) throw response.erreur
      notifySuccess(i18n('maintenance.tdb.context.update.dossier.success'))
      setLastGridDossier(component) // permet de faire le component.cancelEditData() une fois les datas chargées
      setLstDossierUpToDate(false) // déclanche le resolveLstDossier()

    } catch (e) {
      notifyError(e)
    }

  }, [i18n, urlApi])

  // DOSSIER DELETE
  const dossierSupprRequest = useCallback(async (dossier) => {

    try {
      const contentPayload = { 'dossier': dossier }
      const response = await makeRequest(getEndPointDeleteDossier(urlApi), 'POST', contentPayload)
      if (!!response?.erreur) throw response.erreur
      notifySuccess(i18n('maintenance.tdb.context.suppr.dossier.success'))
      setLstDossierUpToDate(false) // déclanche le resolveLstDossier

    } catch (e) {
      notifyError(e)
    }

  }, [i18n, urlApi])


  // SIGNALEMENTS --------------------------------------------------------
  const resolveLstSignalement = useCallback(async () => {
    if (!lstSignalementUpToDate) {
      try {
        const response = await makeRequest(getEndPointLstSignalement(urlApi))
        if (!!response?.erreur) throw response.erreur
        setLstSignalement(response?.lstSignalements)
        setLstSignalementUpToDate(true)
        if (!!lastGridSignalement?.cancelEditData) {
          lastGridSignalement.cancelEditData() // reset des cellules indiquées comme modifiées
        }
        notifySuccess(i18n('maintenance.tdb.context.load.signalements.success'))
      } catch (e) {
        notifyError(e)
      }
    }

  }, [lstSignalementUpToDate, urlApi, lastGridSignalement, i18n])



  // SIGNALEMENT BATCH UPDATE 
  const signalementUpdatesBatchRequest = useCallback(async (datas, component) => {

    try {
      const contentPayload = { 'batchContent': datas }
      const response = await makeRequest(getEndPointUpdateSignalement(urlApi), 'POST', contentPayload)
      if (!!response?.erreur) throw response.erreur
      setLastGridSignalement(component) // permet de faire le component.cancelEditData() une fois les datas chargées
      setLstSignalementUpToDate(false) // déclanche le resolveLstSignalement()
      notifySuccess(i18n('maintenance.tdb.context.update.signalement.success'))

    } catch (e) {
      notifyError(e)
    }

  }, [i18n, urlApi])

  // SIGNALEMENT DELETE
  const signalementSupprRequest = useCallback(async (signalement) => {

    try {
      const contentPayload = { 'signalement': signalement }
      const response = await makeRequest(getEndPointDeleteSignalement(urlApi), 'POST', contentPayload)
      if (!!response?.erreur) throw response.erreur
      notifySuccess(i18n('maintenance.tdb.context.suppr.signalement.success'))
      setLstSignalementUpToDate(false) // déclanche le resolveLstSignalement()
    } catch (e) {
      notifyError(e)
    }

  }, [i18n, urlApi])



  // const signalementCreateIntervention = useCallback(async (signalement) => {

  //   notifySuccess("Todo Créer une intervention ","warning",1500)
  //   console.log("signalementCreateIntervention")
  //   console.table(signalement)

  // }, [])


  // INTERVENTIONS --------------------------------------------------------
  const resolveLstIntervention = useCallback(async () => {
    if (!lstInterventionUpToDate) {
      try {
        const response = await makeRequest(getEndPointLstIntervention(urlApi))
        if (!!response?.erreur) throw response.erreur
        setLstIntervention(response?.lstInterventions)
        setLstInterventionUpToDate(true)
        if (!!lastGridIntervention?.cancelEditData) {
          lastGridIntervention.cancelEditData() //reset des cellules indiquées comme modifiées
        }
        notifySuccess(i18n('maintenance.tdb.context.load.interventions.success'))
      } catch (e) {
        notifyError(e)
      }
    }

  }, [lstInterventionUpToDate, urlApi, lastGridIntervention, i18n])


  // INTERVENTIONS BATCH UPDATE 
  const interventionUpdatesBatchRequest = useCallback(async (datas, component) => {

    try {
    const contentPayload = { 'batchContent': datas }
    const response = await makeRequest(getEndPointUpdateIntervention(urlApi), 'POST', contentPayload)
    if (!!response?.erreur) throw response.erreur
    notifySuccess(i18n('maintenance.tdb.context.update.intervention.success'))
    setLastGridIntervention(component) // permet de faire le component.cancelEditData() une fois les datas chargées
    setLstInterventionUpToDate(false) // déclanche le resolveLstInterventions()
  } catch (e) {
    notifyError(e)
  }
  }, [i18n, urlApi])

  // INTERVENTIONS DELETE
  const interventionSupprRequest = useCallback(async (intervention) => {

    try {
    const contentPayload = { 'intervention': intervention }
    const response = await makeRequest(getEndPointDeleteIntervention(urlApi), 'POST', contentPayload)
    if (!!response?.erreur) throw response.erreur
    notifySuccess(i18n('maintenance.tdb.context.suppr.intervention.success'))
    setLstInterventionUpToDate(false) // déclanche le resolveLstInterventions()
  } catch (e) {
    notifyError(e)
  }
  }, [i18n, urlApi])


  useEffect(() => {
    if (!lstDossierUpToDate) resolveLstDossier()
    if (!lstSignalementUpToDate) resolveLstSignalement()
    if (!lstInterventionUpToDate) resolveLstIntervention()
  }, [lstDossierUpToDate, lstInterventionUpToDate, lstSignalementUpToDate, resolveLstDossier, resolveLstIntervention, resolveLstSignalement])


  return <MaintenanceTdbContext.Provider value={{
    urlApi,
    // dossiers
    lstDossier,
    dossierUpdatesBatchRequest,
    dossierSupprRequest,
    setLstDossierUpToDate,
    //signalements
    lstSignalement,
    signalementUpdatesBatchRequest,
    signalementSupprRequest,
    //signalementCreateIntervention,
    setLstSignalementUpToDate,
    //interventions
    lstIntervention,
    interventionUpdatesBatchRequest,
    interventionSupprRequest,
    setLstInterventionUpToDate,
    //autres
    etats,
    equipes,
    getContratCouche,

  }} {...props} />
}

export { UseMaintenanceTdbContextProvider, useMaintenanceTdbContext }
