
import React, { useState } from 'react'
import './MaintenanceViewer.scss'
import GridDossier from './tdb/dossier/GridDossier'
import ModeViewSelector from './tdb/modeView/ModeViewSerlector';
import { MODE_VIEW_DOSSIER, MODE_VIEW_INTERVENTION, MODE_VIEW_SIGNALEMENT } from './tdb/modeView/modes';
import GridSignalements from './tdb/signalement/GridSignalements';
import GridInterventions from './tdb/intervention/GridInterventions';
import { Col, Row } from 'react-bootstrap';
import { useMaintenanceTdbContextExternalTriggers } from '../../contexts/ContextMaintenanceExternalTriggers';


const MaintenanceViewerElements = () => {

    const [modeView, setModeView] = useState(MODE_VIEW_DOSSIER)
    const { externalPopinIsCalled, setExternalPopinIsCalled } = useMaintenanceTdbContextExternalTriggers()

    return (
        <>
        {externalPopinIsCalled && <p className="external-popin-called">
                TDB - maintenance : external popin is called 
                    [<span onClick={()=> setExternalPopinIsCalled(false)}>Force stop</span>]
                </p>}
        <div className="sigmr-maintenance" 
                style={{'visibility': externalPopinIsCalled ? 'hidden':'visible'}}
        >
          
                <Row>
                    <Col lg={3} xs={6}>
                        <ModeViewSelector defaultMode={modeView} onChangeMode={setModeView} />
                    </Col>
                </Row>
          
            {modeView === MODE_VIEW_DOSSIER && <GridDossier />}
            {modeView === MODE_VIEW_SIGNALEMENT && <GridSignalements />}
            {modeView === MODE_VIEW_INTERVENTION && <GridInterventions />}
        </div>
        </>

    )

}


MaintenanceViewerElements.propTypes = {
    //urlApi: PropTypes.string.isRequired,
}

export default MaintenanceViewerElements