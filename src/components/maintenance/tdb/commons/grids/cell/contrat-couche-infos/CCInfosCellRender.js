import React, { useState } from 'react'
import { CommentIcon } from '@primer/octicons-react'
import { useMaintenanceTdbContext } from '../../../../../../../contexts/ContextMaintenance';
import { valoriseCCWithElementAttributs, getNbInfos } from '../../../../contrat-couches/CCMatcher';
import './CCInfosCellRender.scss'
import CCInfosPopover from './CCInfosPopover';
import { useContextI18n } from '../../../../../../../contexts/ContextI18n';

const CCInfosCellRender = ({data,rowIndex,columnIndex,lstEtats}) => {

    const { lstSignalement, lstIntervention, getContratCouche } = useMaintenanceTdbContext()
    const { getJJMMAAAA_HHMM} = useContextI18n()
    const [popoverVisible, setPopoverVisible] = useState(false)

    const idCell = `icr_${data.ID}_${rowIndex}_${columnIndex}`
    
    // information Fiche CONTRAT COUCHE
    // const CCId = json?.contratCouche?.id
    const contratCouche = getContratCouche(data.CC_ID)
    // recherche dans les signalements et les interventions
    const objet = [...lstSignalement,...lstIntervention].find(s => s.id === data.ID)
    const lstAttributs = objet?.lstAttributs

    let style = {}
    if(!!lstEtats){
        const etat = lstEtats.find(e => e.id === data?.ETAT)
        style = {'backgroundColor': `${etat?.color??"#dddddd"}7F`}
    }


    const renderEmptyCellInfos = () => {
        return(
            <div id={idCell} style={style} className='cell-cc-infos empty' >
                <CommentIcon size={16} />
                {/* {cell?.text} */}
            </div>
        )
    }
    
    if(!!contratCouche && !!lstAttributs){

        const ccValo = valoriseCCWithElementAttributs(contratCouche, lstAttributs, getJJMMAAAA_HHMM);
        const nb = getNbInfos(ccValo)
        
        if(nb === 0){
            return renderEmptyCellInfos()
        }else{
            return(
                <>
                <div id={idCell} style={style} className='cell-cc-infos' 
                    //title={displayValue} 
                    onMouseEnter={()=>setPopoverVisible(true)}
                    onMouseLeave={()=>setPopoverVisible(false)}
                    >
                    <CommentIcon size={20} />
                    <span className="number">{nb}</span>
                </div>
                <CCInfosPopover visible={popoverVisible} idCell={idCell} datas={ccValo} />
                </>
            )
        }

    }else{
         return renderEmptyCellInfos()
    }

}


export default CCInfosCellRender


