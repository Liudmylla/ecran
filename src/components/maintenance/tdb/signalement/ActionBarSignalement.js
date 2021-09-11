import React from 'react'
import PropTypes from 'prop-types'
import './ActionBarSignalement.scss'
import { Button } from 'react-bootstrap'
import { PlusCircleIcon, WorkflowIcon } from '@primer/octicons-react'
import { useContextI18n } from '../../../../contexts/ContextI18n'
import { useMaintenanceTdbContextExternalTriggers } from '../../../../contexts/ContextMaintenanceExternalTriggers'

const ActionBarSignalement = ({ data, index }) => {


    const dataSignalement = data?.data
    const { interventionCreate, externalPopinIsCalled } = useMaintenanceTdbContextExternalTriggers()

    const { i18n } = useContextI18n()
    const i18nPrefixe = "maintenance.tdb.signalement.action"
    // const captionConsulter = i18n(`${i18nPrefixe}.consulter`)
    // const captionSupprimer = i18n(`${i18nPrefixe}.supprimer`)
    const captionCreer = i18n(`${i18nPrefixe}.creer.intervention`)

    const handleClickCreateIntervention = (e) => {
        console.log(e)
        console.log(data)
        //  notify("ACTION : Accès à la fiche", "success", 1500)
        interventionCreate(dataSignalement)
    }

    if (!!dataSignalement) {
        return (
            <>
                {!externalPopinIsCalled && (
                    <div className="action-bar-signalement">
                        <span className="work"><WorkflowIcon size={12} /></span>

                        {/* {dataSignalement.NB_INTERVENTIONS === 0 && (
                        <Button variant="dark" size="sm" onClick={() => setShowModalSuppr(true)}>
                            <XCircleIcon size={16} /> {captionSupprimer}
                        </Button>
                    )}
                    <Button variant="dark" size="sm" onClick={() => signalementConsult(dataSignalement)}>
                        <FileSymlinkFileIcon size={16} /> {captionConsulter}
                    </Button> */}

                        <Button variant="dark" size="sm" onClick={handleClickCreateIntervention}>
                            <PlusCircleIcon size={16} /> {captionCreer}
                        </Button>
                    </div>
                )}

            </>
        )
    } else {
        return (<></>)
    }
}


ActionBarSignalement.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number
}

export default ActionBarSignalement