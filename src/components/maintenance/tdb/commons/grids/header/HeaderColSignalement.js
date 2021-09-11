
import { MegaphoneIcon  } from '@primer/octicons-react';
import React from 'react';

const HeaderColSignalement = (data) => {

    return (

        <div title={data.column.caption}><MegaphoneIcon size={16} /></div>
    )

}

export default HeaderColSignalement