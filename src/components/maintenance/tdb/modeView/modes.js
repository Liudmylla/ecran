import {InboxIcon , MegaphoneIcon ,ToolsIcon} from '@primer/octicons-react'

export  const MODE_VIEW_DOSSIER = {code:'MVD', keyLib:'tdb.mode.view.dossier', icon : (<InboxIcon  />)}
export  const MODE_VIEW_SIGNALEMENT = {code:'MVS', keyLib:'tdb.mode.view.signalement', icon : (<MegaphoneIcon />)}
export  const MODE_VIEW_INTERVENTION = {code:'MVI', keyLib:'tdb.mode.view.intervention', icon : (<ToolsIcon />)}


export const MODES = [MODE_VIEW_DOSSIER, MODE_VIEW_SIGNALEMENT, MODE_VIEW_INTERVENTION]