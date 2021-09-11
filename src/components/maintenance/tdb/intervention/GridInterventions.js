import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './GridInterventions.scss'
import DataGrid, { Column, ColumnChooser, Editing, Grouping, SearchPanel, StateStoring } from 'devextreme-react/data-grid';
import DataInterventionMapper from './DataInterventionMapper';
import { useMaintenanceTdbContext } from '../../../../contexts/ContextMaintenance';
import { useContextI18n } from '../../../../contexts/ContextI18n';
import DefaultCellRender from '../commons/grids/cell/default/DefaultCellRender';
import HeaderColSignalement from '../commons/grids/header/HeaderColSignalement';
import DossierCellRender from '../commons/grids/cell/dossier/DossierCellRender';
import InterventionToolbarPreparing from '../commons/grids/toolbar/InterventionToolbarPreparing';
import InterventionToolbarRenderTotal from '../commons/grids/toolbar/InterventionToolbarRenderTotal';
import { Template } from 'devextreme-react/core/template';
import DefaultInterventionCellRender from '../commons/grids/cell/intervention/DefaultInterventionCellRender';
import HeaderColEquipe from '../commons/grids/header/HeaderColEquipe';
import EquipeCell from '../commons/grids/cell/equipe/EquipeCell';
import EquipeGroup from '../commons/grids/cell/equipe/EquipeGroup';
import EtatCell from '../commons/grids/cell/etat/EtatCell';
import EtatGroup from '../commons/grids/cell/etat/EtatGroup';
import HeaderColIntervention from '../commons/grids/header/HeaderColIntervention';
import EquipeCellEditorTemplate from '../commons/grids/cell/equipe/EquipeCellEditorTemplate';
import CCInfosCellRender from '../commons/grids/cell/contrat-couche-infos/CCInfosCellRender';
import HeaderActionCell from '../commons/grids/header/HeaderActionCell';
import InterventionActionCell from '../commons/grids/cell/action/InterventionActionCell';
import EtatCellEditorTemplate from '../commons/grids/cell/etat/EtatCellEditorTemplate';
import { dateFormatWithTime } from '../commons/grids/formats';
import HeaderColTime from '../commons/grids/header/HeaderColTime';


const GridInterventions = ({ idSignalement }) => {

    const { lstDossier, lstSignalement, lstIntervention, getContratCouche, etats, equipes,
        interventionUpdatesBatchRequest, urlApi } = useMaintenanceTdbContext()

    const { i18n, getJJMMAAAA_HHMM } = useContextI18n()

    const [datas, setDatas] = useState(false)

    const isRoot = idSignalement === undefined

    useEffect(() => {

        let datas = []
        if (!!lstSignalement && !!lstIntervention && !!lstDossier) {

            if(typeof(getJJMMAAAA_HHMM) !== 'function') console.log('function i18n getJJMMAAAA_HHMM must be set !')

            if (isRoot) {
                datas = lstIntervention
                    .filter(i => !!i.idParent)
                    .map(interventionJson => { return DataInterventionMapper(interventionJson, lstDossier, lstSignalement, getContratCouche, getJJMMAAAA_HHMM) })
            } else {
                datas = lstIntervention
                    .filter(i => i.idParent === idSignalement)
                    .map(interventionJson => { return DataInterventionMapper(interventionJson, lstDossier, lstSignalement, getContratCouche, getJJMMAAAA_HHMM) })
            }
        }
        setDatas(datas)

    }, [getContratCouche, idSignalement, isRoot, lstDossier, lstIntervention, lstSignalement, getJJMMAAAA_HHMM])

    const onSaving = useCallback((e) => {
        e.cancel = true;

        if (e.changes.length) {
            e.promise = interventionUpdatesBatchRequest(e.changes, e.component);
        }
    }, [interventionUpdatesBatchRequest]);

    if (!!datas?.length && !!lstDossier && !!lstSignalement && !!lstIntervention && !!i18n) {


        const i18nPrefixe = "maintenance.tdb.intervention.grid"
        const captionLibelle = i18n(`${i18nPrefixe}.col.lib`)
        const captionDossierLib = i18n(`${i18nPrefixe}.col.dossier`)
        const captionSignalementLib = i18n(`${i18nPrefixe}.col.signalement`)
        const captionEquipe = i18n(`${i18nPrefixe}.col.equipe`)
        const captionEtat = i18n(`${i18nPrefixe}.col.etat`)
        const captionCreation = i18n(`${i18nPrefixe}.col.creation`)
        const captionPlannif1 = i18n(`${i18nPrefixe}.col.plannif.debut`)
        const captionPlannif2 = i18n(`${i18nPrefixe}.col.plannif.fin`)
        const captionType = i18n(`${i18nPrefixe}.col.type`)
        const captionInfosContratCouche = i18n(`${i18nPrefixe}.col.infos.cc`)
        const captionLot = i18n(`${i18nPrefixe}.col.lot`)
        const captionAccesRapide = i18n(`${i18nPrefixe}.col.acces.rapide`)
        

        const renderEquipeCell = (element) => {
            return <EquipeCell {...element} />
        }

        const renderEquipeCellEditor = (element) => {
            return <EquipeCellEditorTemplate {...element} />
        }

        const renderInterventionActionCell = (element) => {
            return <InterventionActionCell {...element} lstEtats={etats} />
        }


        const renderCCInfosCell = (element) => {
            return <CCInfosCellRender {...element} lstEtats={etats} />
        }

        const renderEtatCellEditor = (element) => {
            return <EtatCellEditorTemplate {...element} />
        }

        return (
            <DataGrid className="grid-tdb-intervention"
                dataSource={datas}
                keyExpr="ID"
                showBorders={true}
                allowColumnReordering={true}
                allowColumnResizing={true}
                remoteOperations={true}
                repaintChangesOnly={true}
                onSaving={onSaving}
                onToolbarPreparing={(e) => { InterventionToolbarPreparing(e, i18n, datas?.length, isRoot) }}
            >
                <StateStoring enabled={true} type="localStorage" storageKey={`storagePrefGridIntervention_${isRoot ? 'root' : 'sub'}`} />
                <SearchPanel visible={true} />
                <ColumnChooser enabled={false}
                    mode="select"
                    title={i18n("maintenance.tdb.intervention.grid.column.chooser.title")}
                />
                <Editing
                    mode="batch"
                    allowUpdating={true}
                    allowDeleting={false}
                    allowAdding={false}
                />

                {isRoot && <Grouping autoExpandAll={false} contextMenuEnabled={true} /> }


                <Column dataField="ID" caption="id" visible={false} allowEditing={false} />
                <Column dataField="ID_DOSSIER" caption="Dossier ID" visible={false} allowEditing={false} />
                
                <Column caption={captionAccesRapide} allowGrouping="false" allowEditing="false"
                        headerCellRender={HeaderActionCell} width={30}
                        cellRender={(data) => renderInterventionActionCell(data)}  
                        alignment="center"/>

                <Column dataField="LIB_DOSSIER" caption={captionDossierLib} visible={isRoot}
                    cellRender={DossierCellRender} allowEditing={false} allowGrouping={true} />
                <Column dataField="ID_PARENT" caption="id_parent" visible={false} allowEditing={false} allowGrouping={true} />
                <Column dataField="LIB_PARENT" caption={captionSignalementLib}
                    cellRender={DefaultCellRender}
                    headerCellRender={HeaderColSignalement}
                    visible={isRoot} allowEditing={false} allowGrouping={true} />

                <Column dataField="LOT_ID" cellRender={DefaultCellRender} caption={captionLot}
                    allowEditing={false} allowGrouping={true} visible={false} 
                />
                <Column dataField="LOT" cellRender={DefaultCellRender} caption={captionLot}
                    allowEditing={false} allowGrouping={true} visible={isRoot} 
                />
                <Column dataField="EQUIPE" caption={captionEquipe} width={160}
                    headerCellRender={HeaderColEquipe} allowGrouping={true}
                    cellRender={renderEquipeCell}
                    editCellRender={renderEquipeCellEditor}
                    groupCellRender={(data) => EquipeGroup(data, equipes,urlApi)}
                    alignment="center" visible={isRoot} allowEditing={true}
                />
                <Column dataField="LIBELLE" caption={captionLibelle}
                    headerCellRender={HeaderColIntervention}
                    cellRender={(e) => DefaultInterventionCellRender(e,etats)} allowEditing={true} />

                <Column dataField="TYPE" cellRender={(e) => DefaultInterventionCellRender(e,etats)} caption={captionType} 
                    allowEditing={false} allowGrouping={true} 
                />
                <Column dataField="CC_INFOS" cellRender={renderCCInfosCell} caption={captionInfosContratCouche}
                    allowEditing={false} allowGrouping={false} width={50}  
                    alignment="center"
                />
                
                <Column dataField="DATE_CREATION" dataType="date" caption={captionCreation} 
                    cellRender={(e) => DefaultInterventionCellRender(e,etats)} allowEditing={false} 
                    width={80}
                />
                <Column dataField="DATE_PLANIFICATION_DEBUT" dataType="datetime" caption={captionPlannif1} 
                     headerCellRender={HeaderColTime} 
                    cellRender={(e) => DefaultInterventionCellRender(e,etats)} allowEditing={true} 
                    width={80} format={dateFormatWithTime} />

                <Column dataField="DATE_PLANIFICATION_FIN" dataType="datetime" caption={captionPlannif2}
                    headerCellRender={HeaderColTime} 
                    cellRender={(e) => DefaultInterventionCellRender(e,etats)} allowEditing={true} 
                    width={80} format={dateFormatWithTime} />

                <Column dataField="ETAT" caption={captionEtat} 
                    allowEditing={true}
                    cellRender={(data) => EtatCell(data, etats, true)} 
                    editCellRender={renderEtatCellEditor}
                    groupCellRender={(data) => EtatGroup(data, etats, i18n)}
                    alignment="center"
                    allowGrouping={true} />

                {isRoot && ( // bride cette template à cause d'un bug du template wrapper de devextreme
                    <Template
                        name="totalInterventionToolbarCount"
                        render={(ei) => InterventionToolbarRenderTotal(ei, datas?.length)} />
                )}


            </DataGrid>
        )
    } else {
        return (<></>)
    }


}


GridInterventions.propTypes = {
    idSignalement: PropTypes.number,
}

export default GridInterventions