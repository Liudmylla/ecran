import React from 'react'
import { UseContextI18nProvider } from '../../../../contexts/ContextI18n'
import { UseMaintenanceTdbContextProvider } from '../../../../contexts/ContextMaintenance'
import { UseMaintenanceTdbContextExternalTriggersProvider } from '../../../../contexts/ContextMaintenanceExternalTriggers'
import MockServer from '../../../../mock/MockServer'

import Dossier from './Dossier'

const Dossier_stories = {

    title: 'SIGMR/Maintenance/Fiche/Dossier',
    component: Dossier,
    argTypes: {
        // onMinMaxChanged: {action:'Min Max changed !'}
    }
}

const urlBidon = {  nameSpace:'the/url/test/in',
                    endPointUrl:'storybook'
                }

const urlApi = `${urlBidon.nameSpace}/${urlBidon.endPointUrl}`

const Template = (args) => {

    MockServer(urlBidon)
    try{
    return (
        <UseContextI18nProvider>
             <UseMaintenanceTdbContextProvider urlApi={urlApi}>
                <UseMaintenanceTdbContextExternalTriggersProvider>
                    <Dossier {...args} />
                </UseMaintenanceTdbContextExternalTriggersProvider>
            </UseMaintenanceTdbContextProvider>
        </UseContextI18nProvider>
    )
    }catch(e){
        console.error(e)
    }
}

export const Dossier1 = Template.bind({})

Dossier1.args = {
    //   visible : true
    urlApi : `${urlBidon.nameSpace}/${urlBidon.endPointUrl}`
}


export default Dossier_stories
