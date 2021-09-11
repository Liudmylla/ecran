import { Server } from 'miragejs'
import { actionReactListContratCouche, actionReactListDossier, actionReactListEquipe, actionReactListEtats, actionReactListIntervention, actionReactListLots, actionReactListSignalement } from '../api/endPoints'

import lstDossierJson from './json/maintenance/tdb/mock-dossiers.json'
import lstSignalementJson from './json/maintenance/tdb/mock-signalements.json'
import lstInterventionJson from './json/maintenance/tdb/mock-interventions.json'
import lstEquipeJson from './json/maintenance/tdb/mock-equipes.json'
import lstContratCouchesJson from './json/maintenance/tdb/mock-contrat-couches.json'
import lstLotJson from './json/maintenance/tdb/mock-lots.json'
import lstEtatJson from './json/maintenance/tdb/mock-etats.json'
import erreurJson from './json/maintenance/tdb/mock-erreur.json'

const MockServer = (urlBidon) => new Server({

    routes() {

        //const urlBidon = 'the/url/test/in/storybook'
        this.namespace = urlBidon.nameSpace //début de l'url d'appel

        // GET
        this.get(urlBidon.endPointUrl, (schema, request) => {

            //debugger
            if (request.queryParams?.action === actionReactListDossier) {
                if (!this.dossiers) this.dossiers = lstDossierJson
                return this.dossiers
            }

            if (request.queryParams?.action === actionReactListSignalement) {
                if (!this.signalements) this.signalements = lstSignalementJson
                return this.signalements
            }

            if (request.queryParams?.action === actionReactListIntervention) {
                if (!this.interventions) this.interventions = lstInterventionJson
                return this.interventions
            }

            if (request.queryParams?.action === actionReactListEquipe) {
                if (!this.equipes) this.equipes = lstEquipeJson
                return this.equipes
            }

            if (request.queryParams?.action === actionReactListContratCouche) {
                if (!this.contratCouches) this.contratCouches = lstContratCouchesJson
                return this.contratCouches
            }

            if (request.queryParams?.action === actionReactListLots) {
                if (!this.lots) this.lots = lstLotJson
                return this.lots
            }

            if (request.queryParams?.action === actionReactListEtats) {
                if (!this.etats) this.etats = lstEtatJson
                return this.etats
            }

            if (request.queryParams?.action === actionReactListEtats+'test-erreur') {
               // if (!this.etats) this.etats = lstEtatJson
               return erreurJson
            }

        })

        // POST
        this.post(urlBidon.endPointUrl, (schema, request) => {

            console.table(request.queryParams)
            console.log(request.queryParams?.action)


            if (request.queryParams?.action === 'reactCrudDossier|U') {

                const requestBody = JSON.parse(request.requestBody)

                requestBody?.batchContent?.forEach(element => {

                    const dossier = this.dossiers.lstDossiers.find(s => +s.id === +element.key)

                    if (!!element.data.LIBELLE) {
                        const attrLib = dossier.lstAttributs.find(a => a.id === -1)
                        attrLib.value = element.data.LIBELLE
                    }
                })

                return requestBody

            } else
                if (request.queryParams?.action === 'reactCrudDossier|D') {

                    const requestBody = JSON.parse(request.requestBody)
                    const dossierId = requestBody?.dossier?.ID

                    const index = this.dossiers.lstDossiers.findIndex(d => d.id === dossierId)

                    if (index > -1) {
                        this.dossiers.lstDossiers.splice(index, 1)
                    }

                } else

                    if (request.queryParams?.action === 'reactCrudSignalement|U') {

                        const requestBody = JSON.parse(request.requestBody)

                        requestBody?.batchContent?.forEach(element => {
                            const arrSign = this.signalements.lstSignalements

                            const signalement = arrSign.find(s => +s.id === +element.key)
                            if (!!element.data.EQUIPE) {
                                signalement.idEquipe = element.data.EQUIPE
                            }
                            if (!!element.data.ETAT) {
                                signalement.etat = { id: element.data.ETAT }
                            }
                            if (!!element.data.LIBELLE) {
                                // debugger
                                const attrLib = signalement.lstAttributs.find(a => a.id === -1)
                                attrLib.value = element.data.LIBELLE
                            }
                            if (!!element.data.DATE_ECHEANCE) {
                                signalement.dateEcheance = element.data.DATE_ECHEANCE
                            }

                        })

                        return requestBody

                    } else

                        if (request.queryParams?.action === 'reactCrudSignalement|D') {

                            const requestBody = JSON.parse(request.requestBody)
                            const signalementId = requestBody?.signalement?.ID

                            const index = this.signalements.lstSignalements.findIndex(s => s.id === signalementId)

                            if (index > -1) {
                                this.signalements.lstSignalements.splice(index, 1)
                            }

                    } else

                        if (request.queryParams?.action === 'reactCrudIntervention|U') {
    
                            const requestBody = JSON.parse(request.requestBody)
    
                            requestBody?.batchContent?.forEach(element => {
                                const arrSign = this.interventions.lstInterventions
    
                                const intervention = arrSign.find(s => +s.id === +element.key)
                                if (!!element.data.EQUIPE) {
                                    intervention.idEquipe = element.data.EQUIPE
                                }
                                if (!!element.data.ETAT) {
                                    intervention.etat = { id: element.data.ETAT }
                                }
                                if (!!element.data.LIBELLE) {
                                    // debugger
                                    const attrLib = intervention.lstAttributs.find(a => a.id === -1)
                                    attrLib.value = element.data.LIBELLE
                                }
                                if (!!element.data.DATE_PLANIFICATION_DEBUT) {
                                    if(!intervention.tsDuree){
                                        intervention.tsDuree={}
                                    }
                                    intervention.tsDuree.debut = element.data.DATE_PLANIFICATION_DEBUT
                                }
                                if (!!element.data.DATE_PLANIFICATION_FIN) {
                                    if(!intervention.tsDuree){
                                        intervention.tsDuree={}
                                    }
                                    intervention.tsDuree.fin = element.data.DATE_PLANIFICATION_FIN
                                }
    
                            })
    
                            return requestBody
    
                        } else
    
                            if (request.queryParams?.action === 'reactCrudIntervention|D') {
    
                                const requestBody = JSON.parse(request.requestBody)
                                const interventionId = requestBody?.intervention?.ID
    
                                const index = this.interventions.lstInterventions.findIndex(s => s.id === interventionId)
    
                                if (index > -1) {
                                    this.interventions.lstInterventions.splice(index, 1)
                                }
                            }

        })
    }
})


export default MockServer