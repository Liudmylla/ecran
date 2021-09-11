

const InterventionToolbarPreparing = (e, i18n, nbItems, isRoot) => {

  // console.log(e?.component?.totalCount())

  try {
    // item Total dossiers
    const totalInterv = {
      location: 'before',
      template: 'totalInterventionToolbarCount'
    }


    const buttonColumnChooser = () => {

      return {
        location: 'after',
        widget: 'dxButton',
        options: {
          // width: 50,
          // text: "Colonnes",
          icon: "columnchooser",
          onClick: () => { e?.component?.showColumnChooser({ mode: 'select' }) }
        }
      }
    }

    const bb = {
      location: 'before',
      text: `${nbItems} ${nbItems>1?'interventions':'intervention'}`,
      className:'inter-tt',
    //  template: 'totalInterventionToolbarCount'
    }

    // ajout des items à la toolbar
    if(isRoot){
      e.toolbarOptions.items.unshift(totalInterv);
    }else{
      e.toolbarOptions.items.unshift(bb);
    }
    
    
    e.toolbarOptions.items.push(buttonColumnChooser());
    

  } catch (e) {
    console.warn(e)
  }

}

export default InterventionToolbarPreparing