import { LockIcon } from '@primer/octicons-react';
import React from 'react';
import './DefaultCellRender.scss'

const DefaultCellRender = (cell) => {

    const isEditable = cell?.column?.allowEditing
    const id = `cr_${cell.rowIndex}_${cell.columnIndex}`

    return (
        
        <div id={id} className={`cell-default-render ${isEditable ? "editable" : ""}`} title={cell?.text}>
            {
                !isEditable && (
                    <div className="cell-default-render-icon-lock"><LockIcon size={7} /></div>
                )
            }
         {cell?.text}
        </div>

    )

}


export default DefaultCellRender


