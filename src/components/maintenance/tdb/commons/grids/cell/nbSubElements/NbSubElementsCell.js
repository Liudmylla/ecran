import { GitForkIcon, MegaphoneIcon, ToolsIcon } from '@primer/octicons-react';
import React from 'react';

import './NbSubElementsCell.scss'

const NbSubElementsCell = (cellData) => {

    const nbSignalements = cellData.data.NB_SIGNALEMENTS
    const nbInterv = cellData.data.NB_INTERVENTIONS

    const className = nbInterv + (nbSignalements ?? 0) === 0 ? 'nb-empty' : 'nb-some'

    const className2 = `${(nbSignalements ?? 0) === 0 ? 's0' : 'sn'} ${nbInterv>0 ? 'in' : 'i0'}`

    const titleInterventions = `${nbInterv} ${nbInterv > 1 ? 'interventions' : 'intervention'}`
    const titleSignalements = (!!nbSignalements || nbSignalements===0) ?
         `${nbSignalements} ${nbSignalements > 1 ? 'signalements' : 'signalement'} / ` : ''

    return (
  
        <div className="nb-sub-elements" title={`${titleSignalements}${titleInterventions}`}>
            <div className={`icon-container ${className}`}>
                <div className="arbo"><GitForkIcon size={16} /> </div>
                {(!!nbSignalements || nbSignalements===0) && (
                    <span className={`nb-items signalements ${className2}`}>{nbSignalements}<MegaphoneIcon size={12} /></span>
                )}
                
                <span className={`nb-items interventions ${className2}`}>{nbInterv}<ToolsIcon size={12} /></span>
                
            </div>
        </div>
       
    )

}

export default NbSubElementsCell