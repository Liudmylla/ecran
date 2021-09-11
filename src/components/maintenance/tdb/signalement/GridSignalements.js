import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './GridSignalements.scss'
import DataGrid, { Column, MasterDetail, Editing, Grouping, SearchPanel, ColumnChooser, StateStoring } from 'devextreme-react/data-grid';
import MasterDetailSignalement from './MasterDetailSignalement';
import { useMaintenanceTdbContext } from '../../../../contexts/ContextMaintenance';
import DataSignalementMapper from './DataSignalementMapper';
import { useContextI18n } from '../../../../contexts/ContextI18n'
import EquipeCell from '../commons/grids/cell/equipe/EquipeCell';
import EquipeCellEditorTemplate from '../commons/grids/cell/equipe/EquipeCellEditorTemplate';
import { dateFormatWithTime } from '../commons/grids/formats';

import EtatCell from '../commons/grids/cell/etat/EtatCell';
import NbSubElementsCell from '../commons/grids/cell/nbSubElements/NbSubElementsCell';
import HeaderColEquipe from '../commons/grids/header/HeaderColEquipe';
import HeaderColSignalement from '../commons/grids/header/HeaderColSignalement';
import HeaderTextCenter from '../commons/grids/header/HeaderTextCenter';
import SignalementToolbarPreparing from '../commons/grids/toolbar/SignalementToolbarPreparing';
import { Template } from 'devextreme-react/core/template';
import SignalementToolbarRenderTotal from '../commons/grids/toolbar/SignalementToolbarRenderTotal';
import EtatCellEditorTemplate from '../commons/grids/cell/etat/EtatCellEditorTemplate';
import EquipeGroup from '../commons/grids/cell/equipe/EquipeGroup';
import EtatGroup from '../commons/grids/cell/etat/EtatGroup';
import SignalementActionCell from '../commons/grids/cell/action/SignalementActionCell';
import HeaderActionCell from '../commons/grids/header/HeaderActionCell';
import CellDateRender from '../commons/grids/cell/date/CellDateRender';
import DefaultCellRender from '../commons/grids/cell/default/DefaultCellRender';
import DossierCellRender from '../commons/grids/cell/dossier/DossierCellRender';

import CCInfosCellRender from '../commons/grids/cell/contrat-couche-infos/CCInfosCellRender';


const GridSignalements = ({ idDossier }) => {

    const refGrid = useRef(null)
    const [expanded,setExpanded] = useState(false)
    const [datas,setDatas] = useState(false)

    const { lstDossier, lstSignalement, lstIntervention, etats, equipes,
        signalementUpdatesBatchRequest, getContratCouche, urlApi } = useMaintenanceTdbContext()

    const { i18n, getJJMMAAAA_HHMM } = useContextI18n()
    const isRoot = idDossier === undefined

    useEffect(() => {
        
        let datas = []
        if(!!lstSignalement && !!lstIntervention && !!lstDossier){
            if (isRoot) {
                datas = lstSignalement
                    .map(j => { return DataSignalementMapper(j, lstIntervention, getContratCouche, lstDossier, getJJMMAAAA_HHMM) })
            } else {
                datas = lstSignalement
                    .filter(j => j.idParent === idDossier)
                    .map(j => { return DataSignalementMapper(j, lstIntervention, getContratCouche, undefined, getJJMMAAAA_HHMM) })
            }
        }
        setDatas(datas)

      }, [idDossier, isRoot, lstDossier, lstIntervention, lstSignalement, getContratCouche, getJJMMAAAA_HHMM])

    const onSaving = useCallback((e) => {
        e.cancel = true;

        if (e.changes.length) {
            e.promise = signalementUpdatesBatchRequest(e.changes, e.component);
        }
    }, [signalementUpdatesBatchRequest]);


    if (!!lstSignalement && !!lstIntervention && !!i18n) {

        const i18nPrefixe = "maintenance.tdb.signalement.grid"
        const captionLibelle = i18n(`${i18nPrefixe}.col.lib`)
        const captionDossierLib = i18n(`${i18nPrefixe}.col.dossier`)
        const captionEquipe = i18n(`${i18nPrefixe}.col.equipe`)
        const captionEtat = i18n(`${i18nPrefixe}.col.etat`)
        const captionCreation = i18n(`${i18nPrefixe}.col.creation`)
        const captionEcheance = i18n(`${i18nPrefixe}.col.echeance`)
        const captionType = i18n(`${i18nPrefixe}.col.type`)
        const captionInfosContratCouche = i18n(`${i18nPrefixe}.col.infos.cc`)
        const captionLot = i18n(`${i18nPrefixe}.col.lot`)
        const captionNbInterventions = i18n(`${i18nPrefixe}.col.interventions`)
        const captionAccesRapide = i18n(`${i18nPrefixe}.col.acces.rapide`)

        const cellClickCustom = (e) => {
            if (e.column.dataField === "NB_INTERVENTIONS" && (e.row?.data?.NB_INTERVENTIONS > 0)) {
              //  console.log(`click nb interv. = ${e.row.data.NB_INTERVENTIONS}`)
                if (e.row.isExpanded) {
                    //console.log(`click nb interv. = ${e.row.data.NB_INTERVENTIONS}`)
                    e.component.collapseRow(e.row.key)
                } else {
                    e.component.expandRow(e.row.key)
                }
            }
        }

       // const datas = getDatas()
        const collapseOrExpandAll = (collapse) => {

            const grid = refGrid?.current?.instance

            if(!!grid){
               // debugger
               console.log(`collapse ${collapse?'oui':'non'}`)
                setExpanded(!collapse)
                if(collapse){
                    grid.collapseAll(-1)
                }else{
                    grid.expandAll(-1)
                }
            }
        }
        
        const renderEquipeCell = (element) => {
            return <EquipeCell {...element} />
        }

        const renderEquipeCellEditor = (element) => {
            return <EquipeCellEditorTemplate {...element} />
        }

        const renderEtatCellEditor = (element) => {
            return <EtatCellEditorTemplate {...element} />
        }

        const renderSignalementActionCell = (element) => {
            return <SignalementActionCell {...element} />
        }

        const renderCCInfosCell = (element) => {
            return <CCInfosCellRender {...element} />
        }

        if (datas.length > 0) {

            return (
                <DataGrid className="grid-tdb-signalement"
                    ref={refGrid}
                    dataSource={datas}
                    keyExpr="ID"
                    showBorders={true}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    remoteOperations={true}
                    repaintChangesOnly={true}
                    onSaving={onSaving}
                    onCellClick={cellClickCustom} // ouvrir et fermer les sous-niveaux
                    onToolbarPreparing={(e)=>{SignalementToolbarPreparing(e, i18n, collapseOrExpandAll,expanded)}}
                >
                    <StateStoring enabled={true} type="localStorage" storageKey={`storagePrefGridSignalement_${isRoot?'root':'sub'}`} />
                    <SearchPanel visible={true} />
                    <ColumnChooser enabled={false}
                        mode="select"
                        title={i18n("maintenance.tdb.signalement.grid.column.chooser.title")}
                    /> 
                    <Editing
                        mode="batch"
                        allowUpdating={true}
                        allowDeleting={false}
                        allowAdding={false}
                    />
                    
                    {isRoot && <Grouping autoExpandAll={expanded} contextMenuEnabled={true} /> }

                    <Column dataField="ID" caption="id" visible={false} />
                    <Column dataField="ID_PARENT" caption="id_parent" visible={false} />

                    <Column caption={captionAccesRapide} allowGrouping={false} allowEditing={false}
                        headerCellRender={HeaderActionCell} width={30}
                        cellRender={(data) => renderSignalementActionCell(data)}  />

                    <Column dataField="LIB_PARENT" caption={captionDossierLib} visible={isRoot} allowEditing={false} 
                        cellRender={DossierCellRender}  allowGrouping={true}  />
                    
                    <Column dataField="LIBELLE" caption={captionLibelle}
                        cellRender={DefaultCellRender} 
                        headerCellRender={HeaderColSignalement} allowGrouping={false} />

                   
                    <Column dataField="EQUIPE" caption={captionEquipe} width={160}
                        headerCellRender={HeaderColEquipe}  allowGrouping={true} 
                        cellRender={renderEquipeCell} 
                        editCellRender={renderEquipeCellEditor}
                        groupCellRender={(data) => EquipeGroup(data, equipes, urlApi)}
                        alignment="center"
                    />
                    <Column dataField="ETAT" caption={captionEtat} width={160}
                        headerCellRender={HeaderTextCenter}  
                        allowGrouping={true} 
                        cellRender={(data) => EtatCell(data, etats)} 
                        editCellRender={renderEtatCellEditor}
                        groupCellRender={(data) => EtatGroup(data, etats, i18n)}
                        alignment="center"
                    />
                    <Column dataField="DATE_CREATION" format={dateFormatWithTime} cellRender={CellDateRender}
                        dataType="datetime" caption={captionCreation} allowEditing={false} allowGrouping={true} />
                    <Column dataField="NB_INTERVENTIONS" 
                        caption={captionNbInterventions} 
                        allowEditing={false} width={80} cellRender={NbSubElementsCell}   allowGrouping={true} />
                    <Column dataField="DATE_ECHEANCE" format={dateFormatWithTime} cellRender={CellDateRender}
                        dataType="datetime" caption={captionEcheance}   allowGrouping={true} />
                    <Column dataField="TYPE"  cellRender={DefaultCellRender}  caption={captionType}  allowEditing={false}  allowGrouping={true} />
                    <Column dataField="CC_INFOS"  cellRender={renderCCInfosCell}  caption={captionInfosContratCouche}  
                        allowEditing={false}  allowGrouping={false} width={50}
                        alignment="center" />
                    <Column dataField="LOT"  cellRender={DefaultCellRender}  caption={captionLot} 
                        allowEditing={false} width={40} allowGrouping={true} visible={isRoot} />

                    <Template 
                        name="totalSignalementToolbarCount" 
                        render={(e)=> SignalementToolbarRenderTotal(e,datas?.length ?? 0)} />

                    <MasterDetail 
                        enabled={true}
                        component={MasterDetailSignalement}
                        autoExpandAll={expanded}
                    />
                </DataGrid>
            )
        } else {
            return <></>
        }




    } else {
        return (<></>)
    }
}


GridSignalements.propTypes = {
    idDossier: PropTypes.number
}

export default GridSignalements