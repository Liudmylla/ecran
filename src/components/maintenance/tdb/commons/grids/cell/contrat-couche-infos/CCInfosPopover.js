import React  from 'react'
import { Popover } from 'devextreme-react/popover';
import './CCInfosPopover.scss'

const CCInfosPopover = ({visible,idCell,datas}) => {


    // console.log(datas)

    const renderAttribut = (attr, onglet) => {

        const uniqueKey = `${idCell}-${onglet.id}-${attr.id}`

        if(!!attr.value){
            return(
                <li key={uniqueKey} className="li-attr">
                    <span className="lib">{attr.libelle}</span>
                    <span className="value">{attr.value}</span>
                </li>
                )
        }
       
    }

    const renderOnglet = (onglet) => {

        const lstAttr = onglet.lstAttributs.map(attr => {
            return renderAttribut(attr, onglet)
        })
        
        const uniqueKey = `${idCell}-${onglet.id}`

        return (<li key={uniqueKey} className="li-onglet">
            <h4>{onglet.libelle}</h4>
            <ul>
                {lstAttr}
            </ul>
        </li>)
    }


    const renderLstOnglets = () => {

        return datas.lstOnglets.map(onglet => {
            return renderOnglet(onglet)
        })
    }

 

    return (
        <div className="cc-infos-popover">
            <Popover
            target={`#${idCell}`}
            position="bottom"
            width={300}
            visible={visible}
            className="cc-infos-popover"
            >
                {!!datas?.lstOnglets && (
                    <ul className="onglet-list">
                        {renderLstOnglets()}
                    </ul>
                )}
            </Popover>
        </div>
    )


}

export default CCInfosPopover