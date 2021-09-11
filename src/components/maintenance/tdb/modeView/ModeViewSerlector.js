
import React from 'react'
import PropTypes from 'prop-types'
import { MODES } from './modes'
import './ModeViewSelector.scss'
import SelectBox from 'devextreme-react/select-box'
import TextBox from 'devextreme-react/text-box';
import { useContextI18n } from '../../../../contexts/ContextI18n'


const ModeViewSelector = ({defaultMode,onChangeMode}) => {

    const { i18n } = useContextI18n()

    const triggerChange = (m) => {

     //   console.log(m)

        onChangeMode(m)
    }

    const ModeViewItemRenderer = (mode) => {

        const lib = i18n(mode.keyLib)
        return (
            <div className="mode-view-custom-item-renderer">
                {mode?.icon } 
                <span className="selector-custom-item">
                    {lib}    
                </span>
          </div>
        )
    }

    const SelectorField = (mode) => {

        const lib = i18n(mode.keyLib)

        return (
          <div className="mode-view-selector-field">
            <div className="icon">
                {!!mode && mode.icon
                }
            </div>
            <div className="text">
                <TextBox 
                defaultValue = {lib}
                readOnly = {true}
                />
            </div>
          </div>
        );
      }
      


    return (
    
        <div className="tdb-mode-view-selector">
            <SelectBox 
                
                dataSource={MODES}
         //      displayExpr="keyLib"
               value={defaultMode}
                fieldRender={SelectorField}
                itemRender={ModeViewItemRenderer} 
                onValueChanged={(d) => triggerChange(d.value)}
                />

        </div>

        )
}


ModeViewSelector.propTypes = {
    defaultMode : PropTypes.oneOf(MODES),
    onChangeMode : PropTypes.func
}

export default ModeViewSelector