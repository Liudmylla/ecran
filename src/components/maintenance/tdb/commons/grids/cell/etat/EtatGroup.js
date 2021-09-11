import React from 'react';
import { itemRender } from './EtatCell';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import './EtatGroup.scss'
import { KebabHorizontalIcon, LocationIcon } from '@primer/octicons-react';
import notify from 'devextreme/ui/notify';



const EtatGroup = (e, etats, i18n) => {

    const idEtat = e.value

    const popover = (
        <Popover className="action-cell-qm-popover group">
            <Popover.Content>
                <div className="action-cell-qm-content group">
                    <ul>
                        <li>
                            <Button variant="dark" size="sm" onClick={(e) => notify("Action : présentation des données en carto.", 'success', 1500)}>
                                <LocationIcon size={16} /> Voir sur la carte
                            </Button>
                        </li>

                    </ul>
                </div>
            </Popover.Content>
        </Popover>
    )

    const returnUndefined = () => {

        const i18nPrefixe = "maintenance.tdb.signalement.grid"
        const libelle = i18n(`${i18nPrefixe}.etat.undefined`)

        return <em className="undefined">{libelle}</em>

    }

    if (!isNaN(idEtat)) {

        const etat = etats.find(e => +e.id === +idEtat)
        if (!!etat) {
            const cellContent = itemRender(etat)
            return (

                <div className="equipe-group-render">
                    <ul>
                        <li>
                            <div className="grid-action-cell-qm" >
                                <OverlayTrigger trigger="click" placement="bottom-start"
                                    overlay={popover} rootClose={true}>
                                    <Button variant="default"><KebabHorizontalIcon size={16} /></Button>
                                </OverlayTrigger>
                            </div>
                        </li>
                        <li className="etat">
                            <div className="etat-group-render">
                                <div className="etat-cell-render" title={idEtat} >
                                    {cellContent}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        } else {
            const nd = returnUndefined()
            return <div className="etat-group-render"><ul><li className="etat">{nd}</li></ul></div>
        }

    } else {
        const nd = returnUndefined()
        return <div className="etat-group-render"><ul><li className="etat">{nd}</li></ul></div>
    }
}


export default EtatGroup