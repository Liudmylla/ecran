
import { ToolsIcon  } from '@primer/octicons-react';
import React from 'react';

const HeaderColIntervention = (data) => {

    return (

        <div title={data.column.caption}><ToolsIcon size={16} /> {data.column.caption}</div>
    )

}

export default HeaderColIntervention