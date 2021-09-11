import React from 'react'
import { UseContextI18nProvider } from '../../../../contexts/ContextI18n'
import { UseMaintenanceTdbContextProvider } from '../../../../contexts/ContextMaintenance'
import { UseMaintenanceTdbContextExternalTriggersProvider } from '../../../../contexts/ContextMaintenanceExternalTriggers'
import MockServer from '../../../../mock/MockServer'

import GridSignalements from './GridSignalements'

const GridSignalements_stories = {

    title: 'SIGMR/Maintenance/TDB/GridSignalements',
    component: GridSignalements,
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
                    <GridSignalements {...args} />
                </UseMaintenanceTdbContextExternalTriggersProvider>
            </UseMaintenanceTdbContextProvider>
        </UseContextI18nProvider>
    )
}

export const Grid_Sub_Dossier_135 = Template.bind({})

Grid_Sub_Dossier_135.args = {
    idDossier : 135
}

export const Grid_ROOT = Template.bind({})

Grid_ROOT.args = {
  
}


export default GridSignalements_stories