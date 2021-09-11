import React from 'react'
import GridSignalements from '../signalement/GridSignalements'
import ActionBarDossier from './ActionBarDossier'

import './MasterDetailDossier.scss'

const MasterDetailDossier = ({data,index}) => {

    // console.log(`MasterDetailDossier ${index}`)
    // console.table(data?.data)

    const dataDossier = data?.data

    if(!!dataDossier && !!dataDossier.ID){
        return(

            <div className="master-detail-dossier">
                <div><ActionBarDossier data={data} index={index} /></div>
    
                <div className="master-detail-dossier-grid-container">
                    <GridSignalements idDossier={dataDossier.ID} />
                </div>
            </div>
        )
    }else{
        return(<em>No datas available</em>)
    }
    

}


MasterDetailDossier.propTypes = {
    // uuid: PropTypes.string.isRequired,
    // urlApi: PropTypes.string.isRequired,
}

export default MasterDetailDossier