import React from 'react'
import { UseContextI18nProvider } from '../../../../contexts/ContextI18n'
import { UseMaintenanceTdbContextProvider } from '../../../../contexts/ContextMaintenance'
import { UseMaintenanceTdbContextExternalTriggersProvider } from '../../../../contexts/ContextMaintenanceExternalTriggers'
import MockServer from '../../../../mock/MockServer'
import ControlledTables from './ControlledTables'



const ControlledTables_stories = {

    title: 'SIGMR/Maintenance/Fiche/ControlledTables',
    component: ControlledTables,
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
                    <ControlledTables {...args} />
                </UseMaintenanceTdbContextExternalTriggersProvider>
            </UseMaintenanceTdbContextProvider>
        </UseContextI18nProvider>
    )
    }catch(e){
        console.error(e)
    }
}

export const ControlledTables1 = Template.bind({})

ControlledTables1.args = {
    //   visible : true
    
}


export default ControlledTables_stories
