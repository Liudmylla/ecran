import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './CommonActionCell.scss'
import { FileSymlinkFileIcon, KebabHorizontalIcon, XCircleIcon } from '@primer/octicons-react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { useContextI18n } from '../../../../../../../contexts/ContextI18n';
import { useMaintenanceTdbContext } from '../../../../../../../contexts/ContextMaintenance';
import ModalConfirm from '../../../confirm/ModalConfirm';
import { useMaintenanceTdbContextExternalTriggers } from '../../../../../../../contexts/ContextMaintenanceExternalTriggers';

const InterventionActionCell = ({ data, cellElement, column ,lstEtats}) => {

    const [showModalSuppr, setShowModalSuppr] = useState(false)
    const { interventionSupprRequest } = useMaintenanceTdbContext()
    const { interventionConsult, externalPopinIsCalled } = useMaintenanceTdbContextExternalTriggers()
    const { i18n } = useContextI18n()
    const i18nPrefixe = "maintenance.tdb.intervention.action"
    const captionConsulter = i18n(`${i18nPrefixe}.consulter`)
    const captionSupprimer = i18n(`${i18nPrefixe}.supprimer`)

    const handleClickSuppr = (e) => {
        setShowModalSuppr(true)
    }

    const handleClickConsult = (e) => {
        interventionConsult(data)
    }

    const popover = (
        <Popover className="action-cell-qm-popover">
            <Popover.Content>
                <div className="action-cell-qm-content">
                    <ul>
                        <li>
                            <Button variant="dark" size="sm" onClick={(e) => handleClickConsult(e)}>
                                <FileSymlinkFileIcon size={16} /> {captionConsulter}
                            </Button>
                        </li>
                        
                        <li>
                            <Button variant="dark" size="sm" onClick={(e) => handleClickSuppr(e)}>
                                <XCircleIcon size={16} /> {captionSupprimer}
                            </Button>
                        </li>
                    

                    </ul>
                </div>
            </Popover.Content>
        </Popover>
    )

    let style = {}
    if(!!lstEtats){
        const etat = lstEtats.find(e => e.id === data?.ETAT)
        style = {'backgroundColor': `${etat?.color??"#dddddd"}7F`}
    }


    return (
        <>
            {!externalPopinIsCalled && ( // masque l'Overlay si la popin est chargée
                <div className="grid-action-cell-qm intervention" style={style}>
                    <OverlayTrigger trigger="click" placement="right-start"
                        overlay={popover} rootClose={true}>
                        <Button variant="default"><KebabHorizontalIcon size={16} /></Button>
                    </OverlayTrigger>
                </div>
            )}
            <ModalConfirm
                action={() => {
                    interventionSupprRequest(data)
                    setShowModalSuppr(false)}}
                title={i18n(`${i18nPrefixe}.supprimer.confirm.title`)}
                msg={i18n(`${i18nPrefixe}.supprimer.confirm.msg`, { "libelle": data.LIBELLE })}
                valider={i18n(`${i18nPrefixe}.supprimer.confirm.valider`)}
                validerIcon={<XCircleIcon size={16} />}
                annuler={i18n(`${i18nPrefixe}.supprimer.confirm.annuler`)}
                showModal={showModalSuppr}
                setShowModal={setShowModalSuppr}
            />
        </>
    )

}

InterventionActionCell.propTypes = {
    data: PropTypes.object.isRequired
}

export default InterventionActionCell