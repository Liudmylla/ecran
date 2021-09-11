import { stringInfosCC } from "../contrat-couches/CCMatcher"


const DataDossierMapper = (json,lstSignalement,lstIntervention,getContratCouche,i18n) => {

    const lib = json?.lstAttributs?.length ?
        json.lstAttributs[0].value : '...'


    const idDossier = json?.id

    const lstIdSignalements = lstSignalement?
        (lstSignalement.filter(j => j.idParent === idDossier)
        .map(j => {return j.id})):[]

    //console.log(lstIdSignalements)

    const nbInterventions = lstIntervention.filter(i => lstIdSignalements.includes(i.idParent)).length

    const getInfos = () => {

        // information Fiche CONTRAT COUCHE
       
        const lstDossierSignalements = lstSignalement.filter(j => j.idParent === idDossier)
        const lstInfoCCAttributs = []

        lstDossierSignalements.forEach((e,i)=>{

            const CCId = e?.contratCouche?.id
            const contratCouche = getContratCouche(CCId)

            let attrInfo = `Info type [${CCId}]`

            if(!!contratCouche && !!e?.lstAttributs){
              attrInfo = stringInfosCC(contratCouche,e.lstAttributs,i18n)

            }


            lstInfoCCAttributs.push(attrInfo)
        })
        // retourne les valeurs dédoublonnées separées par des tirets
        return [...new Set(lstInfoCCAttributs)].join(' - ') 
    }



    const dossierObj = {

        ID : idDossier,
        LIBELLE: lib,
        DATE_CREATION :  json.dateCreation,
        DATE_MODIFICATION : json.dateModification,
        NB_SIGNALEMENTS : lstIdSignalements.length,
        NB_INTERVENTIONS : nbInterventions,
        INFOS_INTERVENTIONS_SIGNALEMENTS : getInfos()
    }

    return dossierObj

}



export default DataDossierMapper