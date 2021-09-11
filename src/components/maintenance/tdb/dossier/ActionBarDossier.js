import React from 'react'
import PropTypes from 'prop-types'
import './ActionBarDossier.scss'
import { Button } from 'react-bootstrap'
import { PlusCircleIcon, WorkflowIcon } from '@primer/octicons-react'
import { useContextI18n } from '../../../../contexts/ContextI18n'
import notify from 'devextreme/ui/notify'


const ActionBarDossier = ({ data, index }) => {


    const dataDossier = data?.data
    

    // const { i18n } = useContextI18n()
    // const i18nPrefixe = "maintenance.tdb.dossier.action"
    // const captionConsulter = i18n(`${i18nPrefixe}.consulter`)
    // const captionSupprimer = i18n(`${i18nPrefixe}.supprimer`)
    //const captionCreer = i18n(`${i18nPrefixe}.creer.signalement`)

    if (!!dataDossier) {
        return (
            <>
                {/* <div className="action-bar-dossier">
                    <span className="work"><WorkflowIcon size={12} /></span>


                     <Button variant="dark" size="sm"  onClick={() => notify("ACTION : Création","success",1500)}>
                        <PlusCircleIcon size={16} /> {captionCreer}
                    </Button> 
                </div> */}

               
            </>
        )
    } else {
        return (<></>)
    }
}


ActionBarDossier.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number
}

export default ActionBarDossier