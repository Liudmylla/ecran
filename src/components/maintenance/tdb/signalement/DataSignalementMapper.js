import { stringInfosCC } from "../contrat-couches/CCMatcher"

const DataSignalementMapper = (json,lstIntervention,getContratCouche,lstDossier,getJJMMAAAA_HHMM) => {

   // console.log(`{"id":${json.etat?.id} ,"name":"${json.etat?.libelle}"`)
    
   // console.log(json)

    const getLib = () => {
        const undefinedLib = `Signalement [${json.id}]`
        if(!!json?.lstAttributs?.length){
            const attrLib = json.lstAttributs.find(a => a.id === -1)
            if(!!attrLib?.value){
                return attrLib.value
            }else{ return undefinedLib }
        }else{ return undefinedLib }   
    }

    const getLibDossier = () => {
        const undefinedLib = `Dossier [${json.idParent}]`
        if(!!lstDossier){
            const dossier = lstDossier.find(d => d.id === json.idParent)
            if(!!dossier){
                const attrLib = dossier.lstAttributs.find(a => a.id === -1)
                if(!!attrLib?.value){
                    return attrLib.value
                }else{ return undefinedLib }
            }
        }else{ return undefinedLib}
    }

    const nbInterventions = lstIntervention.filter(i => json.id === i.idParent).length

    // information Fiche CONTRAT COUCHE
    const CCId = json?.contratCouche?.id
    const contratCouche = getContratCouche(CCId)

    const getInfosCC = () => {
        const undefinedLib = `Infos type [${CCId}]`
        if(!!contratCouche && !!json?.lstAttributs){
            return stringInfosCC(contratCouche,json.lstAttributs,getJJMMAAAA_HHMM)
        }else{
            return undefinedLib
        }
    }


    const signalementObj = {

        ID : json.id,
        ID_PARENT : json.idParent,
        LIBELLE: getLib(),
        LIB_PARENT: getLibDossier(),
        EQUIPE: json.idEquipe,
        DATE_CREATION :  json.dateCreation,
        DATE_MODIFICATION : json.dateModification,
        DATE_ECHEANCE : json.dateEcheance,
        ETAT : json.etat?.id,
        ETAT_LIB : json.etat?.libelle,
        NB_INTERVENTIONS : nbInterventions,
        LOT_ID : json?.lot?.id, 
        LOT : json?.lot?.libelle, 
        TYPE : contratCouche?.libelle ?? '-',
        CC_ID : CCId,
        CC_INFOS : getInfosCC(),

    }

    return signalementObj

}



export default DataSignalementMapper