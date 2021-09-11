import React from 'react'

import { MegaphoneIcon  } from '@primer/octicons-react';


const SignalementToolbarRenderTotal = (e, nbSignalements) => {

    //console.log(e)
    return (

        <div className="signalement-toolbar-render-total"> 
            <MegaphoneIcon size={24} /> {nbSignalements}
        </div>
    )

}

export default SignalementToolbarRenderTotal