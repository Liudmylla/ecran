/******************************* */
/*     les ENDPOINTS de l'API    */
/******************************* */

export const actionReactListDossier = 'reactListDossier'
export const actionReactListSignalement = 'reactListSignalement'
export const actionReactListIntervention = 'reactListIntervention'
export const actionReactCrudDossier = 'reactCrudDossier'
export const actionReactCrudSignalement = 'reactCrudSignalement'
export const actionReactCrudIntervention = 'reactCrudIntervention'

export const actionReactListEquipe = 'reactListEquipe'
export const actionReactListContratCouche = 'reactListContratCouche'
export const actionReactListLots = 'reactListLots'
export const actionReactListEtats = 'reactListEtats'


const makeEndPoint = (urlApi,action) => {
    return `${urlApi}?action=${action}`
}

const makeEndPointWithParams = (urlApi,action,params) => {
    const endPoint = `${urlApi}?action=${action}`
    const paramsWithPipeSeparator = params.map(p => {return `|${p}`})
    return `${endPoint}${paramsWithPipeSeparator}`
}

// --------------------------------- Les LISTES -------------------------------------------------

// ENDPOINT liste des dossiers
export const getEndPointLstDossier = (urlApi) => {
    return makeEndPoint(urlApi,actionReactListDossier)
}

// ENDPOINT liste des signalements
export const getEndPointLstSignalement = (urlApi) => {
    return makeEndPoint(urlApi,actionReactListSignalement)
}

// ENDPOINT liste des interventions
export const getEndPointLstIntervention = (urlApi) => {
    return makeEndPoint(urlApi,actionReactListIntervention)
}

// ENDPOINT liste des équipes
export const getEndPointLstEquipe = (urlApi) => {
    return makeEndPoint(urlApi,actionReactListEquipe)
}

// ENDPOINT liste des contrats couches
export const getEndPointLstContratCouche = (urlApi) => {
    return makeEndPoint(urlApi,actionReactListContratCouche)
}

// ENDPOINT liste des contrats couches
export const getEndPointLstLots = (urlApi) => {
    return makeEndPoint(urlApi,actionReactListLots)
}

// ENDPOINT liste des contrats couches
export const getEndPointLstEtats = (urlApi) => {
    return makeEndPoint(urlApi,actionReactListEtats)
}


// --------------------------------- Les CRUDS -------------------------------------------------


// ENDPOINT updateDossier
export const getEndPointUpdateDossier = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudDossier,['U']) // U = UPDATE
}
// ENDPOINT createDossier
export const getEndPointCreateDossier = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudDossier,['C']) 
}
// ENDPOINT deleteDossier
export const getEndPointDeleteDossier = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudDossier,['D'])
}


// ENDPOINT updateSignalement
export const getEndPointUpdateSignalement = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudSignalement,['U']) // U = UPDATE
}
// ENDPOINT createSignalement
export const getEndPointCreateSignalement = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudSignalement,['C']) 
}
// ENDPOINT deleteSignalement
export const getEndPointDeleteSignalement = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudSignalement,['D'])
}


// ENDPOINT updateIntervention
export const getEndPointUpdateIntervention = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudIntervention,['U']) // U = UPDATE
}
// ENDPOINT createIntervention
export const getEndPointCreateIntervention = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudIntervention,['C'])
}
// ENDPOINT deleteIntervention
export const getEndPointDeleteIntervention = (urlApi) => {
    return makeEndPointWithParams(urlApi,actionReactCrudIntervention,['D'])
}