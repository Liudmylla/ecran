

const DossierToolbarPreparing = (e, i18n, collapseOrExpandAll,expanded) => {

    // item Total dossiers
    const totalNbDossiers = {
      location: 'before',
      template: 'totalDossierToolbarCount'
    }

    // item bouton collapse/expand details
    const buttonExpandOrCollapse = () => {

      const libelle = expanded?
        i18n(`maintenance.tdb.dossier.grid.collapse.all.button.lib`)
        :  i18n(`maintenance.tdb.dossier.grid.expand.all.button.lib`)

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

      // const libelle = expanded?
      //   i18n(`maintenance.tdb.dossier.grid.collapse.all.button.lib`)
      //   :  i18n(`maintenance.tdb.dossier.grid.expand.all.button.lib`)

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
    e.toolbarOptions.items.unshift( totalNbDossiers,  buttonExpandOrCollapse() );
    e.toolbarOptions.items.push(  buttonColumnChooser() );

}

export default DossierToolbarPreparing