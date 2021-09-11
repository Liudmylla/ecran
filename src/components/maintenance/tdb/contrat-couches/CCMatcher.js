
const getAttributValue = (aCC,attributs,i18nGetJJMMAAAA_HHMM) => {
    
    const attr = attributs.find(a => a.id===aCC.id)
    
    if(aCC?.type === 'CHOIX_SIMPLE' && !!aCC?.options){   
        const option = aCC.options.find( o => o.value === attr?.value)
        return option?.libelle

    }else if(aCC?.type === 'DATE' && !!attr && attr?.value !== 'null'){

      
        try{  
            //console.log(attr?.value)
            if(!attr?.value){
                return null
            }
            const date = new Date(attr?.value)
            //console.log(i18nGetJJMMAAAA_HHMM(date))
            return i18nGetJJMMAAAA_HHMM(date)
        }catch(e){
            console.warn("Impossible de formater la date", e)
        }
        
    }else{
       // console.log(aCC?.type)
        return attr?.value === 'null' ? undefined: attr?.value
    }
}

/* Retourne un objet avec les attributs valorisés
{
    "id": 531,
    "libelle": "Panne foyer",
    "lstOnglets": [
        {
            "id": 0,
            "libelle": "Détails du signalement",
            "lstAttributs": [
                {
                    "id": 13,
                    "type": "FILE",
                    "libelle": "Echange mail",
                    "options": [],
                    "codeUser": "ECHANGEMAIL",
                    "visible": true,
                    "value": "3"
                }
            ]
        }
    ]
}
*/

export const valoriseCCWithElementAttributs = (contratCouche, attributs, i18nGetJJMMAAAA_HHMM) => {

    const cc = {...contratCouche}
    cc.lstOnglets.map(o => {

 
        return o.lstAttributs.map(a => {
           
            const v = getAttributValue(a,attributs,i18nGetJJMMAAAA_HHMM)
            return a.value = v
        })
    })
    return cc
}


export const getMapKvInfosCC = (contratCouche, attributs, i18nGetJJMMAAAA_HHMM) => {

 
    const ccValo = valoriseCCWithElementAttributs(contratCouche, attributs, i18nGetJJMMAAAA_HHMM)
    const infos = {}
    ccValo.lstOnglets.forEach(o => {
         o.lstAttributs.forEach(a => {
             infos[a.libelle] = a.value            
        })
    })
   // console.log(infos)
    return infos

}

export const getNbInfos = (ccValorisee) => {
    let count = 0;
    ccValorisee.lstOnglets.forEach(o => {
        o.lstAttributs.forEach(a => {
           if(!!a.value) count++  
       })
   })
    return count
}

export const stringInfosCC = (contratCouche, attributs, i18nGetJJMMAAAA_HHMM) => {

    const m = getMapKvInfosCC(contratCouche, attributs, i18nGetJJMMAAAA_HHMM)

    
    const lstInfosKV = Object.keys(m).map(k => {
        return m[k] ? `${k} ${m[k]}` : '_nd_'
    })

    return lstInfosKV.filter(v => v!=='_nd_').join(" - ")
}