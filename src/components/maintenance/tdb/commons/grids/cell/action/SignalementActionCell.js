import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './CommonActionCell.scss'
import { FileSymlinkFileIcon, KebabHorizontalIcon, XCircleIcon } from '@primer/octicons-react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
//import { useMaintenanceTdbContext } from '../../../../../../../contexts/ContextMaintenance';
import { useContextI18n } from '../../../../../../../contexts/ContextI18n';
import { useMaintenanceTdbContext } from '../../../../../../../contexts/ContextMaintenance';
import ModalConfirm from '../../../confirm/ModalConfirm';
import { useMaintenanceTdbContextExternalTriggers } from '../../../../../../../contexts/ContextMaintenanceExternalTriggers';
//import SignalementActionCellPopover from './SignalementActionCellPopover'
//import ModalConfirm from '../../../confirm/ModalConfirm';

//import { useMaintenanceTdbContext } from '../../../../contexts/ContextMaintenance';

const SignalementActionCell = ({ data, cellElement, column }) => {

    const [showModalSuppr, setShowModalSuppr] = useState(false)
    const { signalementSupprRequest } = useMaintenanceTdbContext()
    const { signalementConsult, externalPopinIsCalled } = useMaintenanceTdbContextExternalTriggers()
    const { i18n } = useContextI18n()
    const i18nPrefixe = "maintenance.tdb.signalement.action"
    const captionConsulter = i18n(`${i18nPrefixe}.consulter`)
    const captionSupprimer = i18n(`${i18nPrefixe}.supprimer`)

    const handleClickSuppr = (e) => {
        console.log(e)
        setShowModalSuppr(true)
    }

    const handleClickConsult = (e) => {
        console.log(e)
        //  console.log(data)
        //  notify("ACTION : Accès à la fiche", "success", 1500)
        signalementConsult(data)
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
                        {data.NB_INTERVENTIONS === 0 && (
                            <li>
                                <Button variant="dark" size="sm" onClick={(e) => handleClickSuppr(e)}>
                                    <XCircleIcon size={16} /> {captionSupprimer}
                                </Button>
                            </li>
                        )}

                    </ul>
                </div>
            </Popover.Content>
        </Popover>
    )

    return (
        <>
            {!externalPopinIsCalled && ( // masque l'Overlay si la popin est chargée
                <div className="grid-action-cell-qm" >
                    <OverlayTrigger trigger="click" placement="right-start"
                        overlay={popover} rootClose={true}>
                        <Button variant="default"><KebabHorizontalIcon size={16} /></Button>
                    </OverlayTrigger>
                </div>
            )}
            <ModalConfirm
                action={() => {
                    signalementSupprRequest(data)
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

SignalementActionCell.propTypes = {
    data: PropTypes.object.isRequired
}

export default SignalementActionCell