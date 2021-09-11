import React from 'react'

 import { ToolsIcon  } from '@primer/octicons-react';

const InterventionToolbarRenderTotal = (ei, nbInterventions) => {

    // console.log(ei)
    // console.log(nbInterventions)
    return (
       
            <div className="interventions-toolbar-render-total"> 
                <ToolsIcon size={24} /> {nbInterventions} 

            </div>

    )

}

export default InterventionToolbarRenderTotal