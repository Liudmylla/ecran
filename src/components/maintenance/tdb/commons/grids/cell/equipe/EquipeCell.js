import React from 'react';
import { useMaintenanceTdbContext } from '../../../../../../../contexts/ContextMaintenance';

import './EquipeCell.scss'
import MemberAvatar from './MemberAvatar';

export const renderEquipe = (equipe,urlApi) => {
    if(!!equipe?.composition){
            
        const lstAvatars = equipe.composition.map(m => MemberAvatar(m,urlApi))
        return (
            <div className="equipe-cell-render" title={equipe.nom}>
                {lstAvatars}
            </div>
        )
    }else{
        return <></>
    }

}

const EquipeCell = ({data}) => {

    const { urlApi, equipes } = useMaintenanceTdbContext()
    const idEquipe = data?.EQUIPE

    if(!isNaN(idEquipe)){

        const equipe = equipes.find(e => +e.id === +idEquipe)
        return renderEquipe(equipe,urlApi)
        
    }else{
        return <></>
    }

}

export default EquipeCell