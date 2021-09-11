
import React from 'react'
import PropTypes from 'prop-types'
import './MaintenanceViewer.scss'
import { UseMaintenanceTdbContextProvider } from '../../contexts/ContextMaintenance';
import { UseMaintenanceTdbContextExternalTriggersProvider } from '../../contexts/ContextMaintenanceExternalTriggers';
import MaintenanceViewerElements from './MaintenanceViewerElements';


const MaintenanceViewer = ({urlApi}) => {

  
    try{
    return (
        <UseMaintenanceTdbContextProvider urlApi={urlApi}>
            <UseMaintenanceTdbContextExternalTriggersProvider>
                <MaintenanceViewerElements />
            </UseMaintenanceTdbContextExternalTriggersProvider>
        </UseMaintenanceTdbContextProvider>
    )
    }catch(e){
        console.log(e)
    }
}


MaintenanceViewer.propTypes = {
     urlApi: PropTypes.string.isRequired,
}

export default MaintenanceViewer