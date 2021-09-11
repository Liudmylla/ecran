import { stringInfosCC } from "../contrat-couches/CCMatcher"

const DataInterventionMapper = (json, lstDossier, lstSignalement, getContratCouche, getJJMMAAAA_HHMM) => {

   
    const lib = json?.lstAttributs?.length ?
        json.lstAttributs[0].value : '...'

    const getSignalement = () => {
        if (!!lstSignalement) return lstSignalement.find(d => d.id === json.idParent)

    }

    const getLibSignalement = () => {
        const signalement = getSignalement()
        if (!!signalement) {
            const attrLib = signalement.lstAttributs.find(a => a.id === -1)
            if (!!attrLib?.value) {
                return attrLib.value
            } else { return '-' }
        }
    }

    const getDossier = () => {
        const signalement = getSignalement()
        if (!!signalement && !!lstDossier) {
            return lstDossier.find(d => d.id === signalement.idParent)
        }
    }

    const getLibDossier = () => {
        const undefinedLib = `Dossier [${json.idParent}]`
        const dossier = getDossier()
        if (!!dossier) {
            const attrLib = dossier.lstAttributs?.find(a => a.id === -1)
            if (!!attrLib?.value) {
                return attrLib.value
            } else { return undefinedLib }
        }

    }

     // information Fiche CONTRAT COUCHE
     const CCId = json?.contratCouche?.id
     const contratCouche = getContratCouche(CCId)
 
     const getInfosCC = () => {
         const undefinedLib = `Infos type [${CCId}]`
         if(!!contratCouche && !!json?.lstAttributs){

           const stringInfos = stringInfosCC(contratCouche,json.lstAttributs,getJJMMAAAA_HHMM)
           // console.log(stringInfos)
            return stringInfos

         }else{
             return undefinedLib
         }
 
     }

    const intervObj = {

        ID: json.id,
        ID_DOSSIER: getDossier()?.id,
        LIB_DOSSIER: getLibDossier(),
        ID_PARENT: json.idParent,
        LIB_PARENT: getLibSignalement(),
        LIBELLE: lib,
        EQUIPE: json.idEquipe,
        DATE_CREATION: json.dateCreation,
        DATE_MODIFICATION: json.dateModification,
        DATE_ECHEANCE: json.dateEcheance,
        DATE_PLANIFICATION_DEBUT: json.tsDuree?.debut,
        DATE_PLANIFICATION_FIN: json.tsDuree?.fin,
        ETAT : json.etat?.id,
        LOT_ID : json?.lot?.id, 
        LOT : json?.lot?.libelle, 
        TYPE : contratCouche?.libelle ?? '-',
        CC_ID : CCId,
        CC_INFOS : getInfosCC(),
    }

    return intervObj

}



export default DataInterventionMapper