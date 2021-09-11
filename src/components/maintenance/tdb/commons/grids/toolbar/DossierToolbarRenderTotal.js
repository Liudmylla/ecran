import React from 'react'

import { InboxIcon  } from '@primer/octicons-react';


const DossierToolbarRenderTotal = (e, nbSignalements) => {

    //console.log(e)
    return (

        <div className="dossier-toolbar-render-total"> 
            <InboxIcon size={24} /> {nbSignalements}
        </div>
    )

}

export default DossierToolbarRenderTotal