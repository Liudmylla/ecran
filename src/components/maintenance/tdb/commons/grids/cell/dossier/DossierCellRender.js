import { InboxIcon, LockIcon } from '@primer/octicons-react';
import React from 'react';
import './DossierCellRender.scss'

const DossierCellRender = (cell) => {

    const isEditable = cell?.column?.allowEditing
    const id = `cr_${cell.rowIndex}_${cell.columnIndex}`

    return (
        
        <div id={id} className={`cell-dossier-render ${isEditable ? "editable" : ""}`} title={cell?.text}>
            {
                !isEditable && (
                    <div className="cell-dossier-render-icon-lock"><LockIcon size={7} /></div>
                )
            }
            <InboxIcon size={12} /> {cell?.text}
        </div>

    )

}


export default DossierCellRender


