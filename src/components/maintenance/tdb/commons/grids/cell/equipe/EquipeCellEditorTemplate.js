import React, { useState } from 'react'

import './EquipeCellEditorTemplate.scss'

import MemberAvatar from './MemberAvatar'
import DropDownBox from 'devextreme-react/drop-down-box'
import { useMaintenanceTdbContext } from '../../../../../../../contexts/ContextMaintenance'
import EquipeCell from './EquipeCell'
import { useContextI18n } from '../../../../../../../contexts/ContextI18n'
import { PersonIcon } from '@primer/octicons-react'

const EquipeCellEditorTemplate = ({value,setValue}) => {

    const [currentValue, setCurrentValue] = useState(value)
    const { urlApi, equipes } = useMaintenanceTdbContext()
    const [openEditor, setOpenEditor] = useState(true)
    const {i18n} = useContextI18n()

    const selectEquipe = (id) => {

       console.log("selection "+id)
       setCurrentValue(id)
       
       setValue(id,"")
       setOpenEditor(false)
    }

    const itemRender = (equipe) => {
        
        const lstAvatars = equipe.composition.map(m => MemberAvatar(m,urlApi))
        const isSelected = (currentValue === equipe.id)

        return (
            <div key={equipe.id} className={`equipe-cell-editor-item ${isSelected?'selected':''}`} onClick={()=>selectEquipe(equipe.id)} >
                <div><span className="equipe-nom">{equipe.nom}</span></div>
                <div className="equipe-cell-editor-avatars">{lstAvatars}</div>
            </div>
        )
    }

    const contentRender = () => {

        console.log(currentValue)
        const lstEquipes = equipes.map(e => itemRender(e))

        return (
            <div className="list-equipe-dropdown">
                {lstEquipes}
            </div>
        )
    }


    const dropDownOptions = { width: 200 };

    if(openEditor){

        const caption = i18n('maintenance.tdb.signalement.grid.cell.edit.equipe.caption')

        return (
            <div className="editor-drop-down-equipes">          
                
                <DropDownBox
                    className="drop-down-equipes"
                    opened={true}
                    dropDownOptions={dropDownOptions}
                    dataSource={equipes}
                    value={currentValue}
                    displayExpr="nom"
                    valueExpr="id"
                    contentRender={contentRender}>
                </DropDownBox>
                <span className="caption"><PersonIcon size={16} /> {caption}</span>   
                </div>

        )
    }else{

        const cellData = {'data':{'EQUIPE':currentValue}}
        const cell = EquipeCell(cellData,equipes)
        return (
            <div className="cell-editor-mode-update-closed" onClick={()=>setOpenEditor(true)}>
                {cell}
            </div>
        )
    }
    

    
}



export default EquipeCellEditorTemplate