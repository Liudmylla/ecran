

const SignalementToolbarPreparing = (e, i18n, collapseOrExpandAll,expanded) => {

    // item Total signalements
    const total = {
      location: 'before',
      template: 'totalSignalementToolbarCount'
    }

    // item bouton collapse/expand details
    const buttonExpandOrCollapse = () => {

      const libelle = expanded?
        i18n(`maintenance.tdb.signalement.grid.collapse.all.button.lib`)
        :  i18n(`maintenance.tdb.signalement.grid.expand.all.button.lib`)

        const icon = expanded ? 'collapse':'expand'

        return {
          location: 'before',
          widget: 'dxButton',
          options: {
           // width: 210,
           // text: libelle,
            icon: icon,
            onClick: ()=> collapseOrExpandAll(expanded),
            title: libelle
          }
        }
    }



    const buttonColumnChooser = () => {


        return {
          location: 'after',
          widget: 'dxButton',
          options: {
           // width: 50,
           // text: "Colonnes",
            icon: "columnchooser",
            onClick: ()=> { e?.component?.showColumnChooser({mode:'select'})}
          }
        }
    }


    // ajout des items à la toolbar
    e.toolbarOptions.items.unshift( total,  buttonExpandOrCollapse() );
    e.toolbarOptions.items.push(  buttonColumnChooser() );

}

export default SignalementToolbarPreparing