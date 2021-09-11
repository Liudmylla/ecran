import React from 'react'
import { UseContextI18nProvider } from '../../../../contexts/ContextI18n'
import { UseMaintenanceTdbContextProvider } from '../../../../contexts/ContextMaintenance'
import { UseMaintenanceTdbContextExternalTriggersProvider } from '../../../../contexts/ContextMaintenanceExternalTriggers'
import MockServer from '../../../../mock/MockServer'

import Signalements from './Signalements'

const Signalements_stories = {

    title: 'SIGMR/Maintenance/Fiche/Signalements',
    component: Signalements,
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
                    <Signalements {...args} />
                </UseMaintenanceTdbContextExternalTriggersProvider>
            </UseMaintenanceTdbContextProvider>
        </UseContextI18nProvider>
    )
    }catch(e){
        console.error(e)
    }
}

export const Signalements1 = Template.bind({})

Signalements1.args = {
    //   visible : true
    urlApi : `${urlBidon.nameSpace}/${urlBidon.endPointUrl}`
}


export default Signalements_stories
