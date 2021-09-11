import React from 'react'
import { UseContextI18nProvider } from '../../../../contexts/ContextI18n'
import { UseMaintenanceTdbContextProvider } from '../../../../contexts/ContextMaintenance'
import { UseMaintenanceTdbContextExternalTriggersProvider } from '../../../../contexts/ContextMaintenanceExternalTriggers'
import MockServer from '../../../../mock/MockServer'

import GridInterventions from './GridInterventions'

const GridInterventions_stories = {

    title: 'SIGMR/Maintenance/TDB/GridInterventions',
    component: GridInterventions,
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
    return (
        <UseContextI18nProvider>
             <UseMaintenanceTdbContextProvider urlApi={urlApi}>
                <UseMaintenanceTdbContextExternalTriggersProvider>
                    <GridInterventions {...args} />
                </UseMaintenanceTdbContextExternalTriggersProvider>
            </UseMaintenanceTdbContextProvider>
        </UseContextI18nProvider>
    )
}

export const Grid_Sub_Signalement_136 = Template.bind({})

Grid_Sub_Signalement_136.args = {
    idSignalement : 136
}

export const Grid_ROOT = Template.bind({})

Grid_ROOT.args = {
  
}


export default GridInterventions_stories