import React from 'react';
//import { lstEtat } from './EtatMock';

import './EtatCell.scss'


export const itemRender = (etat) => {

    if(!!etat){
        return <div className="etat-cell-item"
                    style={{"backgroundColor":etat.color}}>
                 {etat.name}
                </div>
    }else{
        return <></>
    }
}

const EtatCell = (cellData, lstEtats, colorTheBackground) => {

    const idEtat = cellData?.data?.ETAT

    let style = {}
    if(!!lstEtats && colorTheBackground){
        const etat = lstEtats.find(e => e.id === idEtat)
        style = {'backgroundColor': `${etat?.color??"#dddddd"}7F`,
               // 'padding':'0.2rem 0.2rem 0.15rem',
                'minHeight':'24px'
                }
    }

    if(!isNaN(idEtat) && !!lstEtats){

        const etat = lstEtats.find(e => e.id === idEtat)

        if(!!etat){
            const cellContent = itemRender(etat)
            return (
                <div className="etat-cell-render" title={idEtat} style={style}>
                    {cellContent}
                </div>
            )
        }else{ return <div className="etat-cell-render" title={idEtat} style={style}></div>}    

    }else{ return <div className="etat-cell-render" title={idEtat} style={style}></div>}

}

export default EtatCell