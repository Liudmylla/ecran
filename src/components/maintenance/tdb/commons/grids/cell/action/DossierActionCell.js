import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './CommonActionCell.scss'
import { KebabHorizontalIcon, XCircleIcon } from '@primer/octicons-react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { useContextI18n } from '../../../../../../../contexts/ContextI18n';
import { useMaintenanceTdbContext } from '../../../../../../../contexts/ContextMaintenance';
import ModalConfirm from '../../../confirm/ModalConfirm';
import { useMaintenanceTdbContextExternalTriggers } from '../../../../../../../contexts/ContextMaintenanceExternalTriggers';

const DossierActionCell = ({ data, cellElement, column }) => {

    const [showModalSuppr, setShowModalSuppr] = useState(false)
    const { dossierSupprRequest } = useMaintenanceTdbContext()
    const { externalPopinIsCalled } = useMaintenanceTdbContextExternalTriggers()
    const { i18n } = useContextI18n()
    const i18nPrefixe = "maintenance.tdb.dossier.action"
    //const captionConsulter = i18n(`${i18nPrefixe}.consulter`)
    const captionSupprimer = i18n(`${i18nPrefixe}.supprimer`)
    const captionNoAction = i18n(`${i18nPrefixe}.no.action`)

    const handleClickSuppr = (e) => {
        console.log(e)
        setShowModalSuppr(true)
    }

    // const handleClickConsult = (e) => {
    //     console.log(e)
    //     //  console.log(data)
    //     //  notify("ACTION : Accès à la fiche", "success", 1500)
    //     dossierConsult(data)
    // }

    const popover = (
        <Popover className="action-cell-qm-popover">
            <Popover.Content>
                <div className="action-cell-qm-content">
                    <ul>
                        {/* <li>
                            <Button variant="dark" size="sm" onClick={(e) => handleClickConsult(e)}>
                                <FileSymlinkFileIcon size={16} /> {captionConsulter}
                            </Button>
                        </li> */}
                        {data.NB_SIGNALEMENTS === 0 && (
                            <li>
                                <Button variant="dark" size="sm" onClick={(e) => handleClickSuppr(e)}>
                                    <XCircleIcon size={16} /> {captionSupprimer}
                                </Button>
                            </li>
                        )}
                        {data.NB_SIGNALEMENTS > 0 && (
                            <li>
                                <span className="no-action">{captionNoAction}</span>
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
                    dossierSupprRequest(data)
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

DossierActionCell.propTypes = {
    data: PropTypes.object.isRequired
}

export default DossierActionCell