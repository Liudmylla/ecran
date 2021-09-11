import React, { useCallback, useEffect, useRef, useState } from 'react'
//import PropTypes from 'prop-types'
import './GridDossier.scss'
import DataGrid, { Column, ColumnFixing, MasterDetail, SearchPanel, ColumnChooser, StateStoring, Editing } from 'devextreme-react/data-grid';
import { Template } from 'devextreme-react/core/template';
import MasterDetailDossier from './MasterDetailDossier';
import { useMaintenanceTdbContext } from '../../../../contexts/ContextMaintenance';
import DataDossierMapper from './DataDossierMapper';
import 'devextreme/dist/css/dx.light.css';
import { dateFormatWithTime } from '../commons/grids/formats';
import { useContextI18n } from '../../../../contexts/ContextI18n';
import DefaultCellRender from '../commons/grids/cell/default/DefaultCellRender';
import CellDateRender  from '../commons/grids/cell/date/CellDateRender'
import NbSubElementsCell from '../commons/grids/cell/nbSubElements/NbSubElementsCell'
import DossierToolbarPreparing from '../commons/grids/toolbar/DossierToolbarPreparing';
import DossierToolbarRenderTotal from '../commons/grids/toolbar/DossierToolbarRenderTotal';
import DossierCellRender from '../commons/grids/cell/dossier/DossierCellRender';
import HeaderActionCell from '../commons/grids/header/HeaderActionCell';
import DossierActionCell from '../commons/grids/cell/action/DossierActionCell';


const GridDossier = () => {

  const refGrid = useRef(null)
  const [expanded,setExpanded] = useState(false)
  const [datas,setDatas] = useState(false)


  const { lstDossier, dossierUpdatesBatchRequest, 
    lstSignalement, lstIntervention, getContratCouche } = useMaintenanceTdbContext()
  const { i18n } = useContextI18n()

  useEffect(() => {
        
    let datas = []
    if(!!lstSignalement && !!lstIntervention && !!lstDossier){
  
            datas = lstDossier.map(dossierJson => {
              return DataDossierMapper(dossierJson, lstSignalement, lstIntervention, getContratCouche, i18n)
            })
       
    }
    setDatas(datas)

  }, [getContratCouche, lstDossier, lstIntervention, lstSignalement, i18n])


  const onSaving = useCallback((e) => {
    e.cancel = true;

    if (e.changes.length) {
        e.promise = dossierUpdatesBatchRequest(e.changes, e.component);
    }
}, [dossierUpdatesBatchRequest]);


  if (!!lstDossier && !!lstSignalement && !!lstIntervention && !!i18n) {

    const i18nPrefixe = "maintenance.tdb.dossier.grid"

    const captionLibelle = i18n(`${i18nPrefixe}.col.lib`)
    const captionCreation = i18n(`${i18nPrefixe}.col.creation`)
    const captionModification = i18n(`${i18nPrefixe}.col.modification`)
    const captionInfos = i18n(`${i18nPrefixe}.col.infos`)
    const captionLot = i18n(`${i18nPrefixe}.col.lot`)
    const captionNbInterventions = i18n(`${i18nPrefixe}.col.interventions`)
    const captionNbSignalements = i18n(`${i18nPrefixe}.col.signalements`)
    const captionAccesRapide = i18n(`${i18nPrefixe}.col.acces.rapide`)

    const cellClickCustom = (e) => {

      if (e.column.dataField === "INFOS_INTERVENTIONS_SIGNALEMENTS" && (e.row?.data?.NB_SIGNALEMENTS > 0)) {
         // console.log(`click nb interv. = ${e.row.data.NB_INTERVENTIONS}`)

          if (e.row.isExpanded) {
              //console.log(`click nb interv. = ${e.row.data.NB_INTERVENTIONS}`)
              e.component.collapseRow(e.row.key)
          } else {
              e.component.expandRow(e.row.key)
          }
      }
  }

  
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


  const renderDossierActionCell = (element) => {
    return <DossierActionCell {...element} />
}


    return (
      <DataGrid id="grid-tdb-maintenance" className="grid-tdb-maintenance"
        ref={refGrid}
        dataSource={datas}
        keyExpr="ID"
        showBorders={true}
        showRowLines={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
        repaintChangesOnly={true}
        onSaving={onSaving}
        onCellClick={cellClickCustom} // ouvrir et fermer les sous-niveaux
        onToolbarPreparing={(e)=>{DossierToolbarPreparing(e, i18n, collapseOrExpandAll,expanded)}}
      >
        <StateStoring enabled={true} type="localStorage" storageKey="storagePrefGridDossier" />
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

        <Column dataField="ID" cellRender={DefaultCellRender} caption="id" visible={false} />
        <Column caption={captionAccesRapide} allowGrouping="false" allowEditing="false"
                        headerCellRender={HeaderActionCell} width={30}
                        cellRender={(data) => renderDossierActionCell(data)}  />
        <Column dataField="LIBELLE" cellRender={DossierCellRender} caption={captionLibelle}  allowEditing={true} />
        <Column dataField="NB_SIGNALEMENTS" cellRender={DefaultCellRender} 
          alignment="center" width={100} caption={captionNbSignalements} visible={false}  allowEditing={false} />
        <Column dataField="NB_INTERVENTIONS" cellRender={DefaultCellRender} 
          alignment="center" width={100} caption={captionNbInterventions} visible={false}  allowEditing={false}  />
        <Column dataField="INFOS_INTERVENTIONS_SIGNALEMENTS" 
          cellRender={NbSubElementsCell} 
          alignment="center" width={140} caption={captionInfos}  allowEditing={false} />
        <Column dataField="DATE_CREATION" cellRender={CellDateRender} format={dateFormatWithTime}
          alignment="center" width={135} dataType="date" caption={captionCreation}  allowEditing={false} />
        <Column dataField="DATE_MODIFICATION" cellRender={CellDateRender} format={dateFormatWithTime} 
          alignment="center" width={135} dataType="date" caption={captionModification} visible={false}  allowEditing={false} />
        <Column dataField="LOT"  cellRender={DefaultCellRender}  caption={captionLot} allowEditing={false}  allowGrouping="true" />

       <Template 
            name="totalDossierToolbarCount" 
            render={(e)=> DossierToolbarRenderTotal(e,datas.length)} /> 


        <MasterDetail
          enabled={true}
          component={MasterDetailDossier}
        />
      </DataGrid>
    )
  } else {
    return (<>No datas</>)
  }

}


GridDossier.propTypes = {
  // uuid: PropTypes.string.isRequired,
  // urlApi: PropTypes.string.isRequired,
}

export default GridDossier