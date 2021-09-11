import React from 'react'
import { UseContextI18nProvider } from '../../contexts/ContextI18n'
import MockServer from '../../mock/MockServer'

import MaintenanceViewer from './MaintenanceViewer'

const MaintenanceViewer_stories = {

    title: 'SIGMR/Maintenance/TDB/MaintenanceViewer',
    component: MaintenanceViewer,
    argTypes: {
        // onMinMaxChanged: {action:'Min Max changed !'}
    }
}

const urlBidon = {  nameSpace:'the/url/test/in',
                    endPointUrl:'storybook'
                }

const Template = (args) => {
    MockServer(urlBidon)
    return (
        <UseContextI18nProvider>
            <MaintenanceViewer {...args} />
        </UseContextI18nProvider>
    )
}

export const ViewerMock = Template.bind({})

ViewerMock.args = {
    urlApi : `${urlBidon.nameSpace}/${urlBidon.endPointUrl}`
}



export default MaintenanceViewer_stories