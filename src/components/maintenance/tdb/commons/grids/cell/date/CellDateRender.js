import { LockIcon } from '@primer/octicons-react';
import React from 'react';
import './CellDateRender.scss'


const CellDateRender = (cell) => {

    const isEditable = cell?.column?.allowEditing
   // console.log(cell)
    return (
        <div
            title={cell.text} 
            className={`cell-date-render ${isEditable ? "editable" : ""}`}>
            {
                !isEditable && (
                    <div className="cell-date-render-icon"><LockIcon size={7} /></div>
                )
            }
         {cell?.text}
        </div>
    )

}


export default CellDateRender


