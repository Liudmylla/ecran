import React from 'react'
import PropTypes from 'prop-types'
import GridInterventions from '../intervention/GridInterventions'
import './MasterDetailSignalement.scss'
import ActionBarSignalement from './ActionBarSignalement'

const MasterDetailSignalement = ({data,index}) => {

    const dataSignalement = data?.data

    if(!!dataSignalement && !!dataSignalement.ID){
       
        return(
            <div className="master-detail-signalement">
                <div><ActionBarSignalement data={data} index={index} /></div>
                 <div className="master-detail-signalement-grid-container">
                    <GridInterventions 
                        idDossier={dataSignalement.ID_DOSSIER} // pour pouvoir faire sans le niveau signalement
                        idSignalement={dataSignalement.ID} />
                </div> 
            </div>
        )
    }else{
        return(<em>No datas available</em>)
    }
}


MasterDetailSignalement.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number
}

export default MasterDetailSignalement