import React from 'react'
import { renderEquipe } from './EquipeCell'

import { Badge, Button, OverlayTrigger, Popover } from 'react-bootstrap'

import './EquipeGroup.scss'
import { KebabHorizontalIcon, LocationIcon } from '@primer/octicons-react'
import notify from 'devextreme/ui/notify'


const EquipeGroup = (e, equipes,urlApi) => {

    const idEquipe = e.value

    if (!isNaN(idEquipe)) {

        const equipe = equipes.find(e => +e.id === +idEquipe)
        const cellEquipeWithPictos = renderEquipe(equipe,urlApi)
        const popover = (
            <Popover className="action-cell-qm-popover group">
                <Popover.Content>
                    <div className="action-cell-qm-content group">
                        <ul>
                            <li>
                                <Button variant="dark" size="sm" onClick={(e) => notify("Action : présentation des données en carto.",'success',1500)}>
                                    <LocationIcon  size={16} /> Voir sur la carte
                                </Button>
                            </li>
                          
                        </ul>
                    </div>
                </Popover.Content>
            </Popover>
        )


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
                    <li className="libelle">
                        <Badge variant="secondary">{equipe.nom}</Badge>
                    </li>
                    <li>
                        {cellEquipeWithPictos}
                    </li>
                </ul>

        
            </div>
        )
    } else {
        return <></>
    }
}


export default EquipeGroup