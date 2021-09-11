import React from 'react'
// import { UseContextI18nProvider } from '../../../../contexts/ContextI18n'
// import { UseMaintenanceTdbContextProvider } from '../../../../contexts/ContextMaintenance'
//import MockServer from '../../../../mock/MockServer'

import CCInfosPopover from './CCInfosPopover'

const CCInfosPopover_stories = {

    title: 'SIGMR/Maintenance/TDB/signalement/CCInfosPopover',
    component: CCInfosPopover,
    argTypes: {
        // onMinMaxChanged: {action:'Min Max changed !'}
    }
}

const datas = {
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
                    "visible": true
                },
                {
                    "id": 2,
                    "type": "CHOIX_SIMPLE",
                    "libelle": "Niveau d'urgence",
                    "options": [
                        {
                            "value": "1",
                            "libelle": "Urgent < 4 h"
                        },
                        {
                            "value": "3",
                            "libelle": "Normal < 72 h"
                        },
                        {
                            "value": "2",
                            "libelle": "Normal < 48 h "
                        }
                    ],
                    "codeUser": "NIVEAUDURGEN",
                    "visible": true,
                    "value": "Normal < 72 h"
                },
                {
                    "id": 5,
                    "type": "CHOIX_SIMPLE",
                    "libelle": "Signalement effectué par : ",
                    "options": [
                        {
                            "value": "1",
                            "libelle": "Mairie"
                        },
                        {
                            "value": "1",
                            "libelle": "Police"
                        },
                        {
                            "value": "4",
                            "libelle": "Administré"
                        },
                        {
                            "value": "3",
                            "libelle": "Agent du SDE"
                        },
                        {
                            "value": "2",
                            "libelle": "Agent de maintenance"
                        }
                    ],
                    "codeUser": "SIGNALEMENTE",
                    "visible": true,
                    "value": "Mairie"
                },
                {
                    "id": 8,
                    "type": "CHOIX_SIMPLE",
                    "libelle": "Demande effectuée via :",
                    "options": [
                        {
                            "value": "2",
                            "libelle": "Fax"
                        },
                        {
                            "value": "1",
                            "libelle": "SIG"
                        },
                        {
                            "value": "3",
                            "libelle": "email"
                        },
                        {
                            "value": "1",
                            "libelle": "Téléphone"
                        }
                    ],
                    "codeUser": "DEMANDEEFFEC",
                    "visible": true,
                    "value": "SIG"
                },
                {
                    "id": 6,
                    "type": "ALPHA_NUMERIC",
                    "libelle": "Contact",
                    "options": [],
                    "codeUser": "TLPHONE",
                    "visible": true,
                    "value": "Christian"
                },
                {
                    "id": 9,
                    "type": "TELEPHONE",
                    "libelle": "Téléphone",
                    "options": [],
                    "codeUser": "TLPHONE",
                    "visible": true,
                    "value": "123456789.0"
                },
                {
                    "id": 10,
                    "type": "CHOIX_SIMPLE",
                    "libelle": "Type de Panne",
                    "options": [
                        {
                            "value": "4",
                            "libelle": "Autres"
                        },
                        {
                            "value": "3",
                            "libelle": "Rue(s) en panne(s)"
                        },
                        {
                            "value": "5",
                            "libelle": "Tournée de Vérification"
                        },
                        {
                            "value": "1",
                            "libelle": "Foyer(s) Lumineux éteint(s)"
                        },
                        {
                            "value": "2",
                            "libelle": "Foyer(s) lumineux qui clignot(ent)"
                        }
                    ],
                    "codeUser": "TYPEDEPANNE",
                    "visible": true,
                    "value": "Rue(s) en panne(s)"
                },
                {
                    "id": 11,
                    "type": "CHOIX_SIMPLE",
                    "libelle": "Cause de la Panne",
                    "options": [
                        {
                            "value": "1",
                            "libelle": "Accident"
                        },
                        {
                            "value": "3",
                            "libelle": "Vandalisme"
                        },
                        {
                            "value": "1",
                            "libelle": "Indéfinie(s)"
                        },
                        {
                            "value": "2",
                            "libelle": "Défaut réseaux EP"
                        },
                        {
                            "value": "4",
                            "libelle": "Catastrophe naturelle"
                        }
                    ],
                    "codeUser": "CAUSEDELAPAN",
                    "visible": true,
                    "value": "Accident"
                },
                {
                    "id": 12,
                    "type": "ALPHA_NUMERIC",
                    "libelle": "Description de la panne",
                    "options": [],
                    "codeUser": "DESCRIPTIOND",
                    "visible": true,
                    "value": "éteint depuis 3 jours"
                }
            ]
        }
    ]

}

const Template = (args) => {

   // MockServer(urlBidon)
    return (
        // <UseContextI18nProvider>
        //      <UseMaintenanceTdbContextProvider urlApi={urlApi}>
        <>
                <span id="toto">Infos</span>
                <CCInfosPopover {...args} />
        </>
        //     </UseMaintenanceTdbContextProvider>

        // </UseContextI18nProvider>
    )
}

export const Popover_1 = Template.bind({})
Popover_1.args = {
    visible : true,
    idCell : 'toto',
    datas : datas
}



export default CCInfosPopover_stories