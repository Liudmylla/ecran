import DropDownBox from 'devextreme-react/drop-down-box';
import React, { useState } from 'react';
import { useContextI18n } from '../../../../../../../contexts/ContextI18n';
import { useMaintenanceTdbContext } from '../../../../../../../contexts/ContextMaintenance';

import './EtatCellEditorTemplate.scss'
import { itemRender } from './EtatCell';


const EtatCellEditorTemplate = ({value,setValue}) => {

    const [currentValue, setCurrentValue] = useState(value)
    const { etats } = useMaintenanceTdbContext()
    const [openEditor, setOpenEditor] = useState(true)
    const {i18n} = useContextI18n()

    const selectEtat = (id) => {

    //   console.log("selection "+id)
       setCurrentValue(id)
       setValue(id,"")
       setOpenEditor(false)
    }

    const itemRenderOption = (etat) => {

        const isSelected = (currentValue === etat.id)
        const item = itemRender(etat)
        return (
            <div  key={etat.id} className={`etat-cell-editor-item ${isSelected?'selected':''}`} onClick={()=>selectEtat(etat.id)} >
                {item}
            </div>
        )
    }

    const contentRender = () => {

        const lstEtats = etats.map(e => itemRenderOption(e))
        return (
            <div className="list-etat-dropdown">
                {lstEtats}
            </div>
        )
    }

    const dropDownOptions = { width: 200 };

    if(openEditor){

        const caption = i18n('maintenance.tdb.signalement.grid.cell.edit.etat.caption')

        return (
            <div className="editor-drop-down-etats">          
                <DropDownBox
                    className="drop-down-etats"
                    opened={true}
                    dropDownOptions={dropDownOptions}
                    dataSource={etats}
                    value={currentValue}
                    displayExpr="nom"
                    valueExpr="id"
                    contentRender={contentRender}>
                </DropDownBox>
                <span className="caption"> {caption}</span>   
                </div>
        )

    }else{

        const currentEtat = etats.find(e => e.id === currentValue)
        const item = itemRender(currentEtat)
        return (
            <div className="cell-editor-mode-update-closed" onClick={()=>setOpenEditor(true)}>
                {item}
            </div>
        )
    }

}

export default EtatCellEditorTemplate