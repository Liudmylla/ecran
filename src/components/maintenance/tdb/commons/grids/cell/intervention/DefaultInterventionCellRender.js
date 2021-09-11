import { LockIcon } from '@primer/octicons-react';
import React from 'react';
import './DefaultInterventionCellRender.scss'


const DefaultInterventionCellRender = (cell,lstEtats) => {

    const isEditable = cell?.column?.allowEditing
    const id = `cr_${cell.rowIndex}_${cell.columnIndex}`
    
    const etat = lstEtats?.find(e => e.id === cell?.data?.ETAT)
    const style = {'backgroundColor': `${etat?.color??"#dddddd"}7F`}

    return (
        <div id={id} style={style}
            className={`cell-intervention-default-render ${isEditable ? "editable" : ""} `} title={cell?.text}>
            {
                !isEditable && (
                    <div className="cell-intervention-default-render-icon"><LockIcon size={7} /></div>
                )
            }
         {cell?.text}
        </div>

    )

}


export default DefaultInterventionCellRender


