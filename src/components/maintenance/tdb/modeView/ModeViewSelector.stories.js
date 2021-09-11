import React from 'react'
import { UseContextI18nProvider } from '../../../../contexts/ContextI18n'
import { MODE_VIEW_DOSSIER, MODE_VIEW_INTERVENTION, MODE_VIEW_SIGNALEMENT } from './modes'


import ModeViewSelector from './ModeViewSerlector' 

const ModeViewSelector_stories = {

    title: 'SIGMR/Maintenance/TDB/ModeViewSelector',
    component: ModeViewSelector,
    argTypes: {

        defaultMode: {
            name: 'Mode de vue',
            options: ['Dossier','Signalement','Intervention'],
            mapping: {Dossier : MODE_VIEW_DOSSIER, Signalement : MODE_VIEW_SIGNALEMENT, Intervention : MODE_VIEW_INTERVENTION},
            control: {type: 'radio', 
                labels: {Dossier : 'Dossiers', Signalement : 'Signalements', Intervention : 'Interventions'}
            },
            defaultValue: 'Signalement'
        },

        onChangeMode: {
            action:'onChangeMode',
            table: { disable: true }
        }
    }
}



const Template = (args) => {

    return (
        <UseContextI18nProvider>
        <div style={{padding: '20px', maxWidth: '340px'}}>

            <ModeViewSelector {...args} />
        </div>
        </UseContextI18nProvider>
    )
}

export const ModeViewSelector1 = Template.bind({})

ModeViewSelector1.args = {
 //   defaultMode : MODE_VIEW_DOSSIER
}



export default ModeViewSelector_stories