
/*
    retourne un objet simplifié
    avec la structure suivante :

    id: 531
    libelle: "Panne foyer"
    lstOnglets: Array(1)
        0:
            id: 0
            libelle: "Détails du signalement"
            lstAttributs: Array(9)
                0: {id: 13, type: "FILE", libelle: "Echange mail", options: {…}, codeUser: "ECHANGEMAIL", …}
                1: {id: 2, type: "CHOIX_SIMPLE", libelle: "Niveau d'urgence", options: {…}, codeUser: "NIVEAUDURGEN", …}
                2: {id: 5, type: "CHOIX_SIMPLE", libelle: "Signalement effectué par : ", options: {…}, codeUser: "SIGNALEMENTE", …}
                3: {id: 8, type: "CHOIX_SIMPLE", libelle: "Demande effectuée via :", options: {…}, codeUser: "DEMANDEEFFEC", …}
                4: {id: 6, type: "ALPHA_NUMERIC", libelle: "Contact", options: {…}, codeUser: "TLPHONE", …}
                5: {id: 9, type: "TELEPHONE", libelle: "Téléphone", options: {…}, codeUser: "TLPHONE", …}
                6: {id: 10, type: "CHOIX_SIMPLE", libelle: "Type de Panne", options: {…}, codeUser: "TYPEDEPANNE", …}
                7: {id: 11, type: "CHOIX_SIMPLE", libelle: "Cause de la Panne", options: {…}, codeUser: "CAUSEDELAPAN", …}
                8: {id: 12, type: "ALPHA_NUMERIC", libelle: "Description de la panne", options: {…}, codeUser:

*/

const MapperAttributList = (json) => {

    return json.lstLignes?.flatMap(l => {

        const lst = Object.values(l.mapLstAttributs)
        return lst.flatMap(aa => {

            const lstAttributs = Object.values(aa)

            return lstAttributs.flatMap(a => {

                // OPTIONS inversion kv to vk
                const optionsKV = a.options
             //   console.log(a.options)
                const optionsVK =  Object.entries(optionsKV).map(([libelle, value]) => {
                   return {value,libelle}
                })

                return {
                    "id": a.id,
                    "type": a.type,
                    "libelle": a.libelle,
                    "options": optionsVK, 
                    "codeUser": a.codeUser,
                    "visible": a.parametresSysteme?.isVisible ?? false
                }
            })
        })
    })
}


const MapperOnglet = (json) => {

    const onglet = { "id": json.id, "libelle": json.title }
    onglet.lstAttributs = json.lstThemeMetier?.flatMap(t => MapperAttributList(t))
    return onglet
}


const ContratCoucheMapper = (json) => {

    const cc = { "id": json.id, "libelle": json.libelle }
    cc.lstOnglets = json?.fiche?.lstOnglet?.map(o => MapperOnglet(o))

   //  console.log(cc)
    return cc

}

export default ContratCoucheMapper